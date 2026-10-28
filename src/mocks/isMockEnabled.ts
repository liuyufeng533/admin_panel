export const isMockEnabled =
  import.meta.env.DEV ||
  import.meta.env.VITE_ENABLE_MOCK === 'true'