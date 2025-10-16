import { findMatchingRule } from '../config/rules'
import { enqueueMessage } from './notifier.service'
import { Client, Message } from 'whatsapp-web.js'

export const registerListeners = (client: Client) => {
  client.on('message', async (msg: Message) => {
    try {
      if (msg.fromMe) return
      if (!msg.from.includes('@g.us')) return

      const text = msg.body.trim()
      const match = findMatchingRule(msg.from, text)
      if (!match) return

      console.log(`🎯 Coincidencia detectada en ${msg.from}`)
      console.log(`🧩 Tipo: ${match.type}, SEC: ${match.sec}, LINEA: ${match.linea}`)

      await enqueueMessage({
        group: msg.from,
        author: msg.author || msg.from,
        body: msg.body,
        timestamp: new Date().toISOString(),
        match
      })
    } catch (err) {
      console.error('❌ Error en listener:', err)
    }
  })
}
