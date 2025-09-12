import { client } from './whatsappService';
import { MessageMedia } from 'whatsapp-web.js';

export const sendMessage = async (
  chatId: string,
  message: string | MessageMedia,
  mentions: string[] = [],
  caption?: string
) => {
  if (!client.info || !client.info.wid) {
    throw new Error('Cliente de WhatsApp aún no está listo');
  }

  const messageOptions: any = {};
  
  if (caption) messageOptions.caption = caption;

  if (mentions.length > 0) {
    messageOptions.mentions = mentions.map(m => `${m}@c.us`);
  }
  
  await client.sendMessage(chatId, message, messageOptions);
};
