// services/sendTextMessage.ts
import { sendMessage } from './sender.services';

export const sendTextMessage = async (number: string, message: string, mentions: string[] = []) => {
  await sendMessage(number, message, mentions);
};
