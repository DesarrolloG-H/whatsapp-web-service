// services/sendFileMessage.ts
import { MessageMedia } from 'whatsapp-web.js';
import { sendMessage } from './messageService';

export const sendFileMessage = async (number: string, base64: string, mimeType: string, filename: string, mentions: string[] = [], caption?: string) => {
  const media = new MessageMedia(mimeType, base64, filename);
  await sendMessage(number, media, mentions, caption);
};
