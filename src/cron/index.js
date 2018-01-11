import cron from 'node-cron'

export const updateTask = cron.schedule(
  '*/2 * * * * *',
  () => {
    console.log('fuck')
  },
  false
)
