import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'destino-barber-web-ggmto0nw',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_pfgBpwUofPC1cx6o32LdISe5KMbfDLdF',
  authRequired: false,
  auth: { mode: 'managed' },
})
