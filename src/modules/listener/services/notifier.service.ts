import { Queue } from 'bullmq'
import { redisConnection } from '../../../core/redisClient'

const inQueue = new Queue('messages_in', { connection: redisConnection })

export const enqueueMessage = async (payload: any) => {
  try {
    console.log('🟡 Intentando encolar:', payload.keyword)
    await inQueue.add('newMessage', payload)
    console.log('✅ Encolado en Redis correctamente')
  } catch (err) {
    console.error('❌ Error encolando en Redis:', err)
  }
}
