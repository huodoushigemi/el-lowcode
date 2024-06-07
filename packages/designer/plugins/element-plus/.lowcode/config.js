export default [
  ...Object.values(import.meta.glob('./config/*', { eager: true, import: 'default' })),
  (await import('../date-time/config')).default,
  (await import('../descriptions/config')).default,
  (await import('../form/config')).default,
]