// services/whatsappService.ts
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import path from 'path';

let client: Client | null = null;
let isReady = false;
let hasAuthOnce = false;

export const initWhatsApp = () => {
  if (client) return client;

  client = new Client({
    authStrategy: new LocalAuth({
      clientId: 'hitss',
      dataPath: path.join(process.cwd(), 'session'),
    }),
    takeoverOnConflict: true,
    takeoverTimeoutMs: 5000,
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  });

  client.on('qr', (qr) => {
    if (hasAuthOnce) {
      console.warn('QR ignorado (sesión previa detectada)');
      return;
    }
    console.log('Generando QR...');
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('WhatsApp está listo');
    isReady = true;
    hasAuthOnce = true;
  });

  client.on('auth_failure', (msg) => {
    console.error('Error de autenticación:', msg);
    hasAuthOnce = false;
    isReady = false;
  });

  client.on('disconnected', reason => {
    console.error('WhatsApp desconectado:', reason);
    isReady = false;

    if (reason === 'LOGOUT') {
      console.warn('WhatsApp forzó LOGOUT. Requiere intervención manual.');
      hasAuthOnce = false;
    }
  });

  client.initialize();
  return client;
};

export const getClient = () => client;
export const isClientReady = () => isReady;
