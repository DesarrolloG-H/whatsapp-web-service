// services/sendImageMessage.ts
import { MessageMedia } from 'whatsapp-web.js';
import { sendMessage } from './sender.services';

export const sendImageMessage = async (number: string, base64: string, mentions: string[] = [], caption?: string) => {
  const mimeType = 'image/jpeg';  // Asumimos que es siempre una imagen JPEG
  const media = new MessageMedia(mimeType, base64, 'image.jpg');
  await sendMessage(number, media, mentions, caption);
};
