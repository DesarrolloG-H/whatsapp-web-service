import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import path from 'path'
import {
  initSessionDirectory,
  clearSession,
  checkExistingSession,
} from './sessionManager'
import { registerListeners } from '../modules/listener/services/listener.service'

initSessionDirectory() //Crea carpeta si no existe

export const client = new Client({
  authStrategy: new LocalAuth({
    clientId: 'hitss',
    dataPath: path.join(process.cwd(), 'session'),
  }),
  puppeteer: {   headless: false,
  args: ['--no-sandbox', '--disable-setuid-sandbox'], },
})

// EVENTOS
client.on('qr', (qr) => {
  console.log('Escanea este QR para iniciar sesión:')
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Cliente WhatsApp listo y autenticado.')
  registerListeners(client)
})

client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg)
  clearSession() // Limpia la sesión corrupta automáticamente
})

client.on('disconnected', (reason) => {
  console.warn('Cliente desconectado:', reason)
})

client.initialize()
