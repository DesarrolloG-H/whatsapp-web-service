// services/whatsappService.ts
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal'; 
import path from 'path';

export const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "hitss", // nombre de la sesión
    dataPath: path.join(process.cwd(), 'session') // Ruta para almacenar la sesión
  }),  // Para persistir sesión entre reinicios
});

client.on('qr', (qr) => {
  console.log('Generando QR...');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('WhatsApp está listo');
});

client.on('auth_failure', (msg) => {
  console.log('Error de autenticación:', msg);
});

client.initialize();
