// services/messageService.ts
import { MessageMedia } from 'whatsapp-web.js';
import { getClient, isClientReady } from './whatsappService';

export const sendMessage = async (
  chatId: string,
  message: string | MessageMedia,
  mentions: string[] = [],
  caption?: string
) => {
  if (!isClientReady()) {
    throw new Error('WhatsApp aún no está listo');
  }

  const client = getClient();
  if (!client) {
    throw new Error('Cliente no inicializado');
  }

  const messageOptions: any = {};

  if (caption) {
    messageOptions.caption = caption;
  }

  if (mentions.length > 0) {
    messageOptions.mentions = mentions.map(m => `${m}@c.us`);
  }

  await client.sendMessage(chatId, message, messageOptions);
};
