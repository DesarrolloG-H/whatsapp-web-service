import app from './app'
import './whatsappClient'
import { redisConnection } from './redisClient'

const PORT = process.env.PORT || 3000

redisConnection.ping().then((res) => console.log('🟢 Conexión Redis:', res))
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})
