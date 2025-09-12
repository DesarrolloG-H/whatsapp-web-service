// services/sendTextMessage.ts
import { sendMessage } from './messageService';

export const sendTextMessage = async (number: string, message: string, mentions: string[] = []) => {
  await sendMessage(number, message, mentions);
};
