import cron from 'node-cron'
import { fetchUpdateAll } from 'src/controllers'

export const updateTask = cron.schedule(
  '* * * * *',
  () => {
    fetchUpdateAll()
  },
  false
)
