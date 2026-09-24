/**
 * Service-worker registration (vite-plugin-pwa / Workbox). The worker precaches the whole app —
 * JS, CSS, HTML, KaTeX fonts, icons — so it keeps working in airplane mode. In dev this is a no-op.
 */
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisterError(error: unknown) {
    if (import.meta.env.DEV) console.warn('Service worker registration failed', error);
  },
});
