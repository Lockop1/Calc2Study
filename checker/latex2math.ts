/**
 * LaTeX → mathjs converter for the content checker (test-time only; never imported by src/).
 *
 * Content items carry a KaTeX `latex` string (what the student sees) and a mathjs `expr` (what the
 * checks evaluate). `latexToMath` turns the LaTeX into mathjs syntax so that the two can be
 * compared numerically. It reads the LaTeX the way it *renders*, so a typo in either string shows
 * up as a numeric mismatch instead of being silently "corrected" (e.g. `x^23` renders as x²·3).
 *
 * Pipeline: tokenize → check delimiter balance → split top-level list items (`,` `;` `\text{and}`
 * and `\quad` between complete items) → keep the right side of each item's last top-level `=` →
 * recursive-descent (Pratt) parse → print mathjs.
 *
 * Grammar, loosest to tightest:
 *   expression := term (('+' | '-') term)*
 *   term       := unary (('*' | '\cdot' | '\times' | '/') unary | <juxtaposition> atom)*
 *   unary      := ('-' | '+') unary | atom                       -- so -x^2 = -(x^2)
 *   atom       := primary ('^' argument)?
 *   primary    := number | letter | greek | \pi | differential (dx, d\theta)
 *               | ( … ) | [ … ] | \{ … \} | | … | | \frac{a}{b} | \sqrt[n]{a} | function | integral
 *   function   := name ('_' base)? ('^' power)? ( delimited group | |…| | bare argument )
 *   integral   := \int ('_' argument '^' argument)? expression differential
 *   argument   := { expression } | one token (a digit, letter, \pi, \theta, \frac…, \sqrt…)
 * A bare function argument is: an optional numeric coefficient, then either one \frac / \sqrt, or
 * one or more letters / Greek letters / \pi, each with an optional exponent (`\sin 2x` = sin(2x),
 * `\sin x \cos x` = sin(x)·cos(x)). It stops at operators, functions, differentials and closers.
 * `\left`, `\right`, `\big…` and spacing are ignored. A free-standing `{…}` (one that is not a TeX
 * argument) is invisible when rendered, so it is transparent: `2{x+1}` reads as 2x + 1.
 */

export class LatexParseError extends Error {
  constructor(
    message: string,
    public readonly position: number,
    public readonly latex: string,
  ) {
    super(`${message} (at position ${position} in ${JSON.stringify(latex)})`);
    this.name = 'LatexParseError';
  }
}

// ───────────────────────────── tokens ─────────────────────────────

type TokenKind =
  | 'num' // 12, 0.5, .5
  | 'letter' // one Latin letter (e is Euler's number; d starts a differential)
  | 'greek' // text = the mathjs name (theta, alpha, phi, …)
  | 'pi'
  | 'func' // text = the function name as written (sin, ln, log, arcsec, …)
  | 'cmd' // any other command; text = its name without the backslash (frac, sqrt, int, unsupported)
  | 'text' // an unsupported \text{…} / \operatorname{…} / \mathrm{…}; text = its source
  | 'op' // one character: + - * / ^ _ = , ; ' and anything else that is not handled
  | 'open' // ( [ \{ or a TeX group {
  | 'close' // ) ] \} or }
  | 'bar' // | \vert \lvert \rvert: opens or closes an absolute value, by context
  | 'sep' // \text{and}: separates top-level list items
  | 'quad' // \quad \qquad: separates two complete top-level items, otherwise whitespace
  | 'eof';

type Delim = 'paren' | 'bracket' | 'brace' | 'group';

interface Token {
  kind: TokenKind;
  text: string;
  /** Start and end (exclusive) of the token in the source. */
  pos: number;
  end: number;
  /** open/close only. */
  delim?: Delim;
  /** Delimiter nesting depth (set by checkBalance); 0 = top level. */
  depth?: number;
}

/** Commands that only affect spacing, style or delimiter size. */
const IGNORED_COMMANDS = new Set([
  ',', ';', ':', '!', '>', 'displaystyle', 'textstyle', 'scriptstyle', 'limits', 'nolimits',
  'big', 'Big', 'bigg', 'Bigg', 'bigl', 'bigr', 'Bigl', 'Bigr', 'biggl', 'biggr', 'Biggl', 'Biggr',
  'thinspace', 'medspace', 'thickspace', 'negthinspace', 'enspace',
]);

const GREEK = new Map<string, string>([
  ['alpha', 'alpha'], ['beta', 'beta'], ['gamma', 'gamma'], ['delta', 'delta'],
  ['theta', 'theta'], ['vartheta', 'theta'], ['lambda', 'lambda'], ['mu', 'mu'], ['rho', 'rho'],
  ['sigma', 'sigma'], ['tau', 'tau'], ['phi', 'phi'], ['varphi', 'phi'], ['psi', 'psi'], ['omega', 'omega'],
]);

/** Function commands KaTeX defines. */
const FUNCTION_COMMANDS = new Set([
  'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'arcsin', 'arccos', 'arctan',
  'sinh', 'cosh', 'tanh', 'ln', 'log', 'exp',
]);
/** Function names accepted inside \operatorname{…}, \text{…} and \mathrm{…}. */
const NAMED_FUNCTIONS = new Set([...FUNCTION_COMMANDS, 'arcsec', 'arccsc', 'arccot']);
/** LaTeX name → mathjs name where they differ (\log without a base is natural, as in the course). */
const MATHJS_NAMES = new Map([['ln', 'log']]);
/** `\sin^{-1}` means the inverse function, never the reciprocal. */
const INVERSES = new Map([
  ['sin', 'arcsin'], ['cos', 'arccos'], ['tan', 'arctan'], ['sec', 'arcsec'], ['csc', 'arccsc'], ['cot', 'arccot'],
  ['sinh', 'asinh'], ['cosh', 'acosh'], ['tanh', 'atanh'],
]);
const FRACS = new Set(['frac', 'dfrac', 'tfrac']);
const RELATIONS = new Set([
  'to', 'le', 'leq', 'ge', 'geq', 'lt', 'gt', 'ne', 'neq', 'approx', 'equiv', 'sim', 'in',
  'Rightarrow', 'Leftarrow', 'implies', 'iff', 'rightarrow', 'leftarrow', 'mapsto',
]);

function unsupportedCommand(name: string): string {
  if (name === 'arcsec' || name === 'arccsc' || name === 'arccot') {
    return `\\${name} is not a KaTeX command; write \\operatorname{${name}}`;
  }
  if (name === 'infty') return '\\infty is not supported (improper integrals and limits cannot be checked numerically)';
  if (name === 'pm' || name === 'mp') return `\\${name} is not supported; write the two cases as a list`;
  if (RELATIONS.has(name)) return `relation \\${name} is not supported`;
  if (['lim', 'sum', 'prod', 'ldots', 'cdots', 'dots', '%', 'prime'].includes(name)) return `\\${name} is not supported`;
  return `unsupported command \\${name}`;
}

/** Reads the `{…}` argument of \text, \operatorname or \mathrm starting at `from` (raw text). */
function readBraced(latex: string, from: number, cmd: string, cmdPos: number): { content: string; next: number } {
  let i = from;
  while (i < latex.length && /\s/.test(latex[i])) i++;
  if (latex[i] !== '{') throw new LatexParseError(`\\${cmd} must be followed by {…}`, i, latex);
  let depth = 0;
  for (let j = i; j < latex.length; j++) {
    const ch = latex[j];
    if (ch === '\\') j++;
    else if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) return { content: latex.slice(i + 1, j), next: j + 1 };
  }
  throw new LatexParseError(`unclosed \\${cmd}{`, cmdPos, latex);
}

function tokenize(latex: string): Token[] {
  const tokens: Token[] = [];
  const push = (kind: TokenKind, text: string, pos: number, end: number, delim?: Delim): void => {
    tokens.push(delim ? { kind, text, pos, end, delim } : { kind, text, pos, end });
  };
  let i = 0;
  while (i < latex.length) {
    const start = i;
    const c = latex[i];
    if (/\s/.test(c) || c === '~') {
      i++;
      continue;
    }
    const num = /^(?:\d+(?:\.\d+)?|\.\d+)/.exec(latex.slice(i));
    if (num) {
      i += num[0].length;
      push('num', num[0], start, i);
      continue;
    }
    if (/[A-Za-z]/.test(c)) {
      i++;
      push('letter', c, start, i);
      continue;
    }
    if (c !== '\\') {
      i++;
      switch (c) {
        case '(': push('open', '(', start, i, 'paren'); break;
        case ')': push('close', ')', start, i, 'paren'); break;
        case '[': push('open', '[', start, i, 'bracket'); break;
        case ']': push('close', ']', start, i, 'bracket'); break;
        case '{': push('open', '{', start, i, 'group'); break;
        case '}': push('close', '}', start, i, 'group'); break;
        case '|': push('bar', '|', start, i); break;
        default: push('op', c, start, i);
      }
      continue;
    }
    // A command: \name (letters) or a control symbol \, \{ \% …
    const name = /^\\([A-Za-z]+|[\s\S])?/.exec(latex.slice(i))?.[1];
    if (name === undefined) throw new LatexParseError('lone backslash at the end of the input', i, latex);
    i += 1 + name.length;
    const end = i;
    if (/^\s$/.test(name) || IGNORED_COMMANDS.has(name)) continue;
    if (name === 'left' || name === 'right') {
      // The delimiter that follows is an ordinary token; the invisible delimiter "." is dropped.
      const dot = /^\s*\./.exec(latex.slice(i));
      if (dot) i += dot[0].length;
      continue;
    }
    if (name === 'quad' || name === 'qquad') push('quad', name, start, end);
    else if (name === '{' || name === 'lbrace') push('open', '\\{', start, end, 'brace');
    else if (name === '}' || name === 'rbrace') push('close', '\\}', start, end, 'brace');
    else if (name === 'vert' || name === 'lvert' || name === 'rvert') push('bar', '|', start, end);
    else if (name === 'cdot' || name === 'times') push('op', '*', start, end);
    else if (name === 'pi') push('pi', 'pi', start, end);
    else if (GREEK.has(name)) push('greek', GREEK.get(name)!, start, end);
    else if (FUNCTION_COMMANDS.has(name)) push('func', name, start, end);
    else if (name === 'text' || name === 'operatorname' || name === 'mathrm') {
      const { content, next } = readBraced(latex, i, name, start);
      i = next;
      const word = content.trim();
      if (NAMED_FUNCTIONS.has(word)) push('func', word, start, i);
      else if (name === 'text' && word === 'and') push('sep', 'and', start, i);
      else if (name === 'mathrm' && /^d?[A-Za-z]$/.test(word)) {
        // \mathrm{e} is Euler's number, \mathrm{d}x (or \mathrm{dx}) a differential
        for (const ch of word) push('letter', ch, start, i);
      } else push('text', latex.slice(start, i), start, i);
    } else push('cmd', name, start, end);
  }
  return tokens;
}

// ───────────────────────────── syntax tree & printer ─────────────────────────────

type Node =
  | { kind: 'num'; value: string }
  | { kind: 'sym'; name: string } // variables and the constants pi, e
  | { kind: 'diff'; name: string } // differential d<name>
  | { kind: 'neg'; arg: Node }
  | { kind: 'add' | 'sub' | 'mul' | 'div' | 'pow'; left: Node; right: Node }
  | { kind: 'frac'; num: Node; den: Node }
  | { kind: 'call'; name: string; args: Node[] };

const call = (name: string, args: Node[]): Node => ({ kind: 'call', name, args });

/** `e^{…}` is exp(…); everything else is an ordinary power. */
function makePow(base: Node, exponent: Node): Node {
  if (base.kind === 'sym' && base.name === 'e') return call('exp', [exponent]);
  return { kind: 'pow', left: base, right: exponent };
}

function isDifferential(n: Node): boolean {
  return n.kind === 'diff' || (n.kind === 'pow' && n.left.kind === 'diff');
}

/** mathjs binding strength: + - (1) < * / (2) < unary minus (3) < ^ (4) < atoms (5). */
function precedence(n: Node): number {
  switch (n.kind) {
    case 'add':
    case 'sub':
      return 1;
    case 'mul':
    case 'div':
      return 2;
    case 'neg':
      return 3;
    case 'pow':
      return 4;
    default:
      return 5; // num, sym, diff, call, frac (a frac prints its own parentheses)
  }
}

function wrap(n: Node, min: number): string {
  return precedence(n) < min ? `(${print(n)})` : print(n);
}

/** Right operand of a binary operator: a leading unary minus is parenthesized for readability. */
function wrapRight(n: Node, min: number): string {
  return precedence(n) < min || n.kind === 'neg' ? `(${print(n)})` : print(n);
}

function print(n: Node): string {
  switch (n.kind) {
    case 'num':
      return n.value.startsWith('.') ? `0${n.value}` : n.value;
    case 'sym':
      return n.name;
    case 'diff':
      return `d${n.name}`;
    case 'call':
      return `${n.name}(${n.args.map(print).join(', ')})`;
    case 'frac':
      return `(${wrap(n.num, 2)}/${wrap(n.den, 4)})`;
    case 'neg':
      return `-${wrap(n.arg, 4)}`;
    case 'pow':
      return `${wrap(n.left, 5)}^${wrap(n.right, 5)}`;
    case 'add':
      return `${print(n.left)} + ${wrapRight(n.right, 2)}`;
    case 'sub':
      return `${print(n.left)} - ${wrapRight(n.right, 2)}`;
    case 'mul':
      return `${wrap(n.left, 2)}*${wrapRight(n.right, 2)}`;
    case 'div':
      return `${wrap(n.left, 2)}/${wrapRight(n.right, 3)}`;
  }
}

// ───────────────────────────── structure: balance, lists, equations ─────────────────────────────

const CLOSER: Record<Delim, string> = { paren: ')', bracket: ']', brace: '\\}', group: '}' };

const isOp = (t: Token, text: string): boolean => t.kind === 'op' && t.text === text;

/** Checks that ( ) [ ] \{ \} { } are balanced and records each token's nesting depth. */
function checkBalance(tokens: Token[], latex: string): void {
  const stack: Token[] = [];
  for (const t of tokens) {
    if (t.kind === 'close') {
      const open = stack.pop();
      if (!open) throw new LatexParseError(`unbalanced '${t.text}' has no matching opening delimiter`, t.pos, latex);
      if (open.delim !== t.delim) {
        throw new LatexParseError(`'${open.text}' at position ${open.pos} is closed by '${t.text}'`, t.pos, latex);
      }
    }
    t.depth = stack.length;
    if (t.kind === 'open') stack.push(t);
  }
  const unclosed = stack.pop();
  if (unclosed) throw new LatexParseError(`unbalanced '${unclosed.text}' is never closed`, unclosed.pos, latex);
}

/** Splits at top-level `,` `;` `\text{and}`, then at `\quad` where it separates complete items. */
function splitItems(tokens: Token[], latex: string): Token[][] {
  const pieces: Token[][] = [[]];
  const separators: Token[] = [];
  for (const t of tokens) {
    const current = pieces[pieces.length - 1];
    const isSeparator = t.depth === 0 && (t.kind === 'sep' || isOp(t, ',') || isOp(t, ';'));
    if (!isSeparator) {
      current.push(t);
    } else if (!(t.kind === 'sep' && pieces.length > 1 && current.every((q) => q.kind === 'quad'))) {
      // (", and" counts as one separator)
      separators.push(t);
      pieces.push([]);
    }
  }
  return pieces.flatMap((piece, k) => {
    const trimmed = trimQuads(piece);
    if (trimmed.length === 0) {
      if (separators.length === 0) throw new LatexParseError('empty expression', 0, latex);
      const sep = separators[Math.min(k, separators.length - 1)];
      throw new LatexParseError(`empty list item next to '${latex.slice(sep.pos, sep.end)}'`, sep.pos, latex);
    }
    return splitOnQuads(trimmed, latex);
  });
}

function trimQuads(tokens: Token[]): Token[] {
  let a = 0;
  let b = tokens.length;
  while (a < b && tokens[a].kind === 'quad') a++;
  while (b > a && tokens[b - 1].kind === 'quad') b--;
  return tokens.slice(a, b);
}

/**
 * `\quad` separates list items only where both sides are complete items (`u = x^2 \quad du = 2x\,dx`);
 * anywhere else it is whitespace (`2x\quad dx`). A lone differential is not a complete item.
 */
function splitOnQuads(tokens: Token[], latex: string): Token[][] {
  const pieces: Token[][] = [[]];
  for (const t of tokens) {
    if (t.kind === 'quad' && t.depth === 0) pieces.push([]);
    else pieces[pieces.length - 1].push(t);
  }
  if (pieces.length === 1) return [tokens];
  return partitionIntoItems(pieces, 0, latex, new Map()) ?? [tokens];
}

/** Groups pieces[from…] into consecutive complete items, shortest first; null if impossible. */
function partitionIntoItems(
  pieces: Token[][],
  from: number,
  latex: string,
  memo: Map<number, Token[][] | null>,
): Token[][] | null {
  const known = memo.get(from);
  if (known !== undefined) return known;
  let result: Token[][] | null = null;
  for (let to = from + 1; to <= pieces.length && !result; to++) {
    const group = pieces.slice(from, to).flat(); // the \quad between pieces of one group is whitespace
    if (!isCompleteItem(group, latex)) continue;
    const rest = to === pieces.length ? [] : partitionIntoItems(pieces, to, latex, memo);
    if (rest) result = [group, ...rest];
  }
  memo.set(from, result);
  return result;
}

function isCompleteItem(tokens: Token[], latex: string): boolean {
  try {
    const node = parseItem(tokens, latex);
    return node.kind !== 'diff' || tokens.some((t) => t.depth === 0 && isOp(t, '='));
  } catch (err) {
    if (err instanceof LatexParseError) return false;
    throw err;
  }
}

/** Parses the part after the item's last top-level `=` (the left side is never parsed). */
function parseItem(tokens: Token[], latex: string): Node {
  let start = 0;
  tokens.forEach((t, k) => {
    if (t.depth === 0 && isOp(t, '=')) start = k + 1;
  });
  const rhs = tokens.slice(start).filter((t) => t.kind !== 'quad');
  const endPos = tokens.length > 0 ? tokens[tokens.length - 1].end : latex.length;
  if (rhs.length === 0) throw new LatexParseError(start > 0 ? "nothing after '='" : 'empty expression', endPos, latex);
  return new Parser(rhs, endPos, latex).parse();
}

// ───────────────────────────── parser ─────────────────────────────

interface Ctx {
  /** Inside an integrand: a differential ends the integrand instead of being multiplied in. */
  stopAtDifferential: boolean;
  /** Inside a bare |…|: a bar right after a complete operand closes the absolute value. */
  insideBar: boolean;
}
const PLAIN: Ctx = { stopAtDifferential: false, insideBar: false };

class Parser {
  private readonly tokens: Token[];
  private i = 0;

  constructor(
    tokens: Token[],
    endPos: number,
    private readonly latex: string,
  ) {
    this.tokens = [...tokens, { kind: 'eof', text: '', pos: endPos, end: endPos }];
  }

  parse(): Node {
    const node = this.parseExpression(PLAIN);
    const t = this.peek();
    if (t.kind !== 'eof') throw this.unexpected(t, 'an operator or the end of the input');
    return node;
  }

  // ── token access ──

  /** The next token as TeX sees it: used where TeX expects an argument, so `{…}` is an argument. */
  private rawPeek(offset = 0): Token {
    return this.tokens[Math.min(this.i + offset, this.tokens.length - 1)];
  }

  /** The next token in expression position, where a free-standing `{…}` is dissolved (it renders invisibly). */
  private peek(): Token {
    this.dissolveGroupAt(this.i);
    return this.tokens[this.i];
  }

  private next(): Token {
    const t = this.tokens[this.i];
    if (t.kind !== 'eof') this.i++;
    return t;
  }

  private dissolveGroupAt(k: number): void {
    while (this.tokens[k]?.kind === 'open' && this.tokens[k].delim === 'group') {
      let depth = 0;
      let close = k;
      for (; close < this.tokens.length; close++) {
        const t = this.tokens[close];
        if (t.kind === 'open') depth++;
        else if (t.kind === 'close' && --depth === 0) break;
      }
      this.tokens.splice(close, 1);
      this.tokens.splice(k, 1);
    }
  }

  private error(message: string, pos: number): LatexParseError {
    return new LatexParseError(message, pos, this.latex);
  }

  private unexpected(t: Token, expected?: string): LatexParseError {
    if (isOp(t, '=')) return this.error("'=' is only allowed at the top level", t.pos);
    const what = t.kind === 'eof' ? 'end of input' : `'${this.latex.slice(t.pos, t.end)}'`;
    return this.error(`unexpected ${what}${expected ? `; expected ${expected}` : ''}`, t.pos);
  }

  private expectClose(open: Token): void {
    const t = this.rawPeek();
    if (t.kind === 'close' && t.delim === open.delim) {
      this.next();
      return;
    }
    throw this.unexpected(t, `'${CLOSER[open.delim!]}' to close the '${open.text}' at position ${open.pos}`);
  }

  // ── expressions ──

  private parseExpression(ctx: Ctx): Node {
    let left = this.parseTerm(ctx);
    for (;;) {
      const t = this.peek();
      if (!isOp(t, '+') && !isOp(t, '-')) return left;
      this.next();
      left = { kind: t.text === '+' ? 'add' : 'sub', left, right: this.parseTerm(ctx) };
    }
  }

  private parseTerm(ctx: Ctx): Node {
    let left = this.parseUnary();
    for (;;) {
      const t = this.peek();
      if (isOp(t, '*') || isOp(t, '/')) {
        this.next();
        left = { kind: t.text === '*' ? 'mul' : 'div', left, right: this.parseUnary() };
      } else if (this.startsImplicitFactor(t, ctx)) {
        if (left.kind === 'num' && t.kind === 'num') {
          throw this.error('two numbers in a row are ambiguous; use \\cdot', t.pos);
        }
        left = { kind: 'mul', left, right: this.parseAtom() };
      } else {
        return left;
      }
    }
  }

  /** Can `t` start the next factor of a juxtaposition (`2x`, `x\sin x`, `(x+1)(x-1)`)? */
  private startsImplicitFactor(t: Token, ctx: Ctx): boolean {
    switch (t.kind) {
      case 'letter':
        return !(ctx.stopAtDifferential && this.differentialAt(this.i) !== null);
      case 'num':
      case 'greek':
      case 'pi':
      case 'func':
      case 'cmd': // unsupported commands get their specific error from parseAtom
      case 'text':
      case 'sep':
      case 'open':
        return true;
      case 'bar': // after a complete operand a bar closes the innermost |…|, if there is one
        return !ctx.insideBar;
      default:
        return false;
    }
  }

  private parseUnary(): Node {
    const t = this.peek();
    if (isOp(t, '-')) {
      this.next();
      return { kind: 'neg', arg: this.parseUnary() };
    }
    if (isOp(t, '+')) {
      this.next();
      return this.parseUnary();
    }
    return this.parseAtom();
  }

  private parseAtom(): Node {
    const t = this.peek();
    switch (t.kind) {
      case 'num':
        this.next();
        return this.withPower({ kind: 'num', value: t.text });
      case 'letter':
        if (t.text === 'd') return this.withPower(this.parseDifferential());
        this.next();
        return this.withPower({ kind: 'sym', name: t.text });
      case 'greek':
      case 'pi':
        this.next();
        return this.withPower({ kind: 'sym', name: t.text });
      case 'open': {
        this.next();
        const inner = this.parseExpression(PLAIN);
        this.expectClose(t);
        return this.withPower(inner);
      }
      case 'bar':
        return this.withPower(this.parseAbs());
      case 'func':
        return this.parseFunction();
      case 'cmd':
        return this.parseCommand(t);
      case 'text':
        return this.fail(`${t.text} is not supported`, t.pos);
      case 'sep':
        return this.fail('\\text{and} can only separate top-level list items', t.pos);
      default:
        if (isOp(t, "'")) return this.fail("primes (') are not supported", t.pos);
        throw this.unexpected(t, 'an expression');
    }
  }

  private fail(message: string, pos: number): never {
    throw this.error(message, pos);
  }

  /** Optional `^argument` after an atom; subscripts and primes are rejected. */
  private withPower(base: Node): Node {
    let node = base;
    if (isOp(this.peek(), '^')) {
      this.next();
      node = makePow(base, this.parseArgument('an exponent'));
      if (isOp(this.peek(), '^')) this.fail('double superscript; use braces', this.peek().pos);
    }
    this.rejectSuffix();
    return node;
  }

  private rejectSuffix(): void {
    const t = this.peek();
    if (isOp(t, '_')) this.fail('subscripts are not supported (only \\log_b and integral bounds)', t.pos);
    if (isOp(t, "'")) this.fail("primes (') are not supported", t.pos);
  }

  /** A TeX argument: a `{…}` group or a single token (`x^23` is x²·3, `\frac12` is ½). */
  private parseArgument(what: string): Node {
    const t = this.rawPeek();
    if (t.kind === 'open' && t.delim === 'group') {
      this.next();
      const inner = this.parseExpression(PLAIN);
      this.expectClose(t);
      return inner;
    }
    switch (t.kind) {
      case 'num':
        return this.takeDigit();
      case 'letter':
        if (t.text === 'd') break;
        this.next();
        return { kind: 'sym', name: t.text };
      case 'greek':
      case 'pi':
        this.next();
        return { kind: 'sym', name: t.text };
      case 'cmd':
        if (FRACS.has(t.text)) return this.parseFrac();
        if (t.text === 'sqrt') return this.parseSqrt();
        break;
      default:
        if (isOp(t, '-')) this.fail(`${what} with a sign needs braces, e.g. ^{-x}`, t.pos);
    }
    throw this.unexpected(t, what);
  }

  /** An unbraced numeric argument is one digit; the rest of the number stays in the input. */
  private takeDigit(): Node {
    const t = this.next();
    if (t.text.length > 1) {
      if (t.text[0] === '.') this.fail(`unbraced argument '${t.text}'; use braces`, t.pos);
      this.tokens.splice(this.i, 0, { kind: 'num', text: t.text.slice(1), pos: t.pos + 1, end: t.end });
    }
    return { kind: 'num', value: t.text[0] };
  }

  // ── differentials and absolute values ──

  /** The variable of the differential starting at token k (`dx` → x, `d\theta` → theta), or null. */
  private differentialAt(k: number): string | null {
    const d = this.tokens[k];
    if (d?.kind !== 'letter' || d.text !== 'd') return null;
    this.dissolveGroupAt(k + 1);
    const v = this.tokens[k + 1];
    if (v?.kind === 'greek') return v.text;
    if (v?.kind === 'letter' && v.text !== 'd' && v.text !== 'e') return v.text;
    return null;
  }

  private parseDifferential(): Node {
    const d = this.peek();
    const name = this.differentialAt(this.i);
    if (name === null) {
      this.fail("the letter d must be followed by a variable (a differential such as dx or d\\theta)", d.pos);
    }
    this.next();
    this.next();
    return { kind: 'diff', name };
  }

  private parseAbs(): Node {
    const open = this.next();
    const inner = this.parseExpression({ stopAtDifferential: false, insideBar: true });
    const close = this.peek();
    if (close.kind !== 'bar') throw this.unexpected(close, `'|' to close the '|' at position ${open.pos}`);
    this.next();
    return call('abs', [inner]);
  }

  // ── commands ──

  private parseCommand(t: Token): Node {
    if (FRACS.has(t.text)) return this.withPower(this.parseFrac());
    if (t.text === 'sqrt') return this.withPower(this.parseSqrt());
    if (t.text === 'int') return this.parseIntegral();
    return this.fail(unsupportedCommand(t.text), t.pos);
  }

  private parseFrac(): Node {
    const cmd = this.next();
    const first = this.rawPeek();
    const lead = first.kind === 'open' && first.delim === 'group' ? this.rawPeek(1) : first;
    const derivative = (): LatexParseError =>
      this.error('derivative operator not supported (Leibniz notation \\frac{d}{dx}, \\frac{dy}{dx})', cmd.pos);
    let num: Node;
    try {
      num = this.parseArgument('a numerator');
    } catch (err) {
      if (lead.kind === 'letter' && lead.text === 'd') throw derivative();
      throw err;
    }
    const den = this.parseArgument('a denominator');
    if (isDifferential(num) && isDifferential(den)) throw derivative();
    return { kind: 'frac', num, den };
  }

  private parseSqrt(): Node {
    this.next();
    const t = this.rawPeek();
    let index: Node | undefined;
    if (t.kind === 'open' && t.delim === 'bracket') {
      this.next();
      index = this.parseExpression(PLAIN);
      this.expectClose(t);
    }
    const radicand = this.parseArgument('the argument of \\sqrt');
    return index ? call('nthRoot', [radicand, index]) : call('sqrt', [radicand]);
  }

  /** `\int_a^b f\,dx` → integral(f, x, a, b); `\int f\,dx` → indefinite(f, x). */
  private parseIntegral(): Node {
    const int = this.next();
    let lower: Node | undefined;
    let upper: Node | undefined;
    for (;;) {
      const t = this.peek();
      if (isOp(t, '_') && !lower) {
        this.next();
        lower = this.parseArgument('a lower bound');
      } else if (isOp(t, '^') && !upper) {
        this.next();
        upper = this.parseArgument('an upper bound');
      } else break;
    }
    if (!lower !== !upper) this.fail('a definite integral needs both a lower and an upper bound', int.pos);
    this.peek();
    const integrand: Node =
      this.differentialAt(this.i) !== null
        ? { kind: 'num', value: '1' }
        : this.parseExpression({ stopAtDifferential: true, insideBar: false });
    const v = this.differentialAt(this.i);
    if (v === null) {
      this.fail(
        `the \\int at position ${int.pos} has no differential (dx, du, d\\theta, …) at the level of its integrand`,
        this.peek().pos,
      );
    }
    this.next();
    this.next();
    const variable: Node = { kind: 'sym', name: v };
    return lower && upper ? call('integral', [integrand, variable, lower, upper]) : call('indefinite', [integrand, variable]);
  }

  // ── functions ──

  private parseFunction(): Node {
    const fn = this.next();
    const source = this.latex.slice(fn.pos, fn.end);
    let base: Node | undefined;
    let power: Node | undefined;
    for (;;) {
      const t = this.peek();
      if (isOp(t, '_') && fn.text === 'log' && !base) {
        this.next();
        base = this.parseArgument('a logarithm base');
      } else if (isOp(t, '^') && !power) {
        this.next();
        power = this.parseArgument('an exponent');
      } else break;
    }
    this.rejectSuffix();
    let name = MATHJS_NAMES.get(fn.text) ?? fn.text;
    if (power && power.kind === 'neg' && power.arg.kind === 'num' && Number(power.arg.value) === 1) {
      const inverse = INVERSES.get(fn.text);
      if (!inverse || base) this.fail(`${source}^{-1} is ambiguous (inverse or reciprocal?)`, fn.pos);
      name = inverse;
      power = undefined;
    }
    const t = this.peek();
    let arg: Node;
    let delimited = true;
    if (t.kind === 'open') {
      this.next();
      arg = this.parseExpression(PLAIN);
      this.expectClose(t);
    } else if (t.kind === 'bar') {
      arg = this.parseAbs();
    } else {
      arg = this.parseBareArgument(fn, source);
      delimited = false;
    }
    let node: Node;
    if (!base) node = call(name, [arg]);
    else if (base.kind === 'num' && Number(base.value) === 10) node = call('log10', [arg]);
    else node = call('log', [arg, base]);
    if (power) {
      node = makePow(node, power);
      if (isOp(this.peek(), '^')) this.fail('double superscript on a function; use parentheses', this.peek().pos);
      this.rejectSuffix();
      return node;
    }
    return delimited ? this.withPower(node) : node; // \sin(x)^2 = (sin x)^2
  }

  /**
   * An undelimited argument: [number] then one \frac / \sqrt, or letters / Greek / \pi with optional
   * exponents. `\sin 2x` → sin(2x), `\sin x \cos x` → sin(x)cos(x), `\ln 5 \cdot 2x` → ln(5)·2x.
   */
  private parseBareArgument(fn: Token, source: string): Node {
    const factors: Node[] = [];
    let t = this.peek();
    if (t.kind === 'num') {
      this.next();
      factors.push(this.withPower({ kind: 'num', value: t.text }));
      t = this.peek();
    }
    if (t.kind === 'cmd' && (FRACS.has(t.text) || t.text === 'sqrt')) {
      factors.push(this.parseCommand(t));
    } else {
      for (; isSimpleAtom(t); t = this.peek()) {
        // `\cos x\, e^{\sin x}` reads as cos(x)·e^{sin x}: an exponential (e^…) after at least one
        // atom ends the bare argument, just like a function name would.
        if (factors.length > 0 && t.kind === 'letter' && t.text === 'e' && isOp(this.rawPeek(1), '^')) break;
        factors.push(this.parseAtom());
      }
    }
    if (factors.length > 0) return factors.reduce((left, right) => ({ kind: 'mul', left, right }));
    if (t.kind === 'func') return this.parseFunction(); // \ln \ln x, \sin \cos x
    return this.fail(`${source} needs an argument`, fn.pos);
  }
}

function isSimpleAtom(t: Token): boolean {
  return (t.kind === 'letter' && t.text !== 'd') || t.kind === 'greek' || t.kind === 'pi';
}

// ───────────────────────────── API ─────────────────────────────

/** Converts KaTeX math to a mathjs expression; throws LatexParseError on unsupported input. */
export function latexToMath(latex: string): string {
  try {
    const tokens = tokenize(latex);
    checkBalance(tokens, latex);
    const nodes = splitItems(tokens, latex).map((item) => parseItem(item, latex));
    return nodes.length === 1 ? print(nodes[0]) : `[${nodes.map(print).join(', ')}]`;
  } catch (err) {
    if (err instanceof LatexParseError) throw err;
    throw new LatexParseError(`internal converter error: ${(err as Error).message}`, 0, latex);
  }
}

export function tryLatexToMath(latex: string): { ok: true; expr: string } | { ok: false; error: LatexParseError } {
  try {
    return { ok: true, expr: latexToMath(latex) };
  } catch (err) {
    return { ok: false, error: err as LatexParseError };
  }
}
