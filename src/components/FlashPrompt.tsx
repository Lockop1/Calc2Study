/** The question card of a flash item, with the kind-specific framing from lib/framing.ts. */
import type { FlashItem } from '@content/types';
import { framePrompt, kindLabel, topicShort } from '../lib/framing';
import { Tex } from './Math';
import { RichText } from './RichText';

export function FlashPrompt({ item, label }: { item: FlashItem; label?: string }) {
  const parts = framePrompt(item);
  return (
    <section className="q-card" aria-label="Question">
      <p className="q-kind">
        {label ? `${label} · ` : ''}
        {topicShort(item.topic)} · {kindLabel(item.kind)}
      </p>
      {parts.context ? <RichText className="q-context" text={parts.context} /> : null}
      {parts.lead ? <RichText className="q-lead" text={parts.lead} /> : null}
      {parts.text ? <RichText className="q-text" text={parts.text} /> : null}
      {parts.latex ? <Tex className="q-math" latex={parts.latex} displayMode /> : null}
    </section>
  );
}
