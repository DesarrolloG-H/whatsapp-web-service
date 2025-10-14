import express from 'express'
import {senderRoutes} from '../modules/sender'
// import listenerRoutes from '../modules/listener'
import {healthRoutes} from '../modules/health'

const app = express()

// Middlewares globales
app.use(express.json({ limit: '50mb' }))

// Rutas base
app.use('/api/sender', senderRoutes)
// app.use('/api/listener', listenerRoutes)
app.use('api/health', healthRoutes)
// Endpoint raíz
app.get('/', (_, res) => {
  res.send('🚀 WhatsApp Web Service está corriendo')
})

export default app
