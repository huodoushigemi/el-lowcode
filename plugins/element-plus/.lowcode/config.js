import DateTime from '../date-time/config'
import Form from '../form/config'

export default [
  ...Object.values(import.meta.glob('./config/*', { eager: true, import: 'default' })),
  DateTime,
  Form,
]