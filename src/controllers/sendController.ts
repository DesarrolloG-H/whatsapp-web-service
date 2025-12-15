// controllers/sendController.ts
import { Request, Response } from 'express';
import { sendTextMessage } from '../services/sendTextMessage';
import { sendImageMessage } from '../services/sendImageMessage';
import { sendFileMessage } from '../services/sendFileMessage';
import { getClient, isClientReady } from '../services/whatsappService';

// Función para obtener detalles de los grupos
export const getGroupsDetails = async (req: Request, res: Response) => {
  try {
    if (!isClientReady()) {
      return res.status(503).json({
        status: 'error',
        message: 'WhatsApp aún no está listo',
      });
    }

    const client = getClient();
    if (!client) {
      throw new Error('Cliente no inicializado');
    }

    // Delay obligatorio en Windows
    await new Promise(resolve => setTimeout(resolve, 3000));

    const chats = await client.getChats();
    const groupChats = chats.filter(chat => chat.isGroup);

    return res.status(200).json({
      status: 'success',
      groupDetails: groupChats.map(chat => ({
        groupId: chat.id._serialized,
        groupName: chat.name,
      })),
    });
  } catch (error: any) {
    console.error('Error obteniendo grupos:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Lógica para enviar mensajes a contactos o grupos
export const sendMessageHandler = async (req: Request, res: Response) => {
  const { number, groupId, message, type, base64, caption, filename, mentions } = req.body;

  try {
    // Validación correcta y consistente
    if (!isClientReady()) {
      return res.status(503).json({
        status: 'error',
        message: 'WhatsApp aún no está listo',
      });
    }

    const client = getClient();
    if (!client) {
      throw new Error('Cliente no inicializado');
    }

    const destination = groupId
      ? `${groupId}@g.us`
      : `${number}@c.us`;

    // TEXTO
    if (type === 'text') {
      await sendTextMessage(destination, message, mentions);
      return res.status(200).json({
        status: 'success',
        message: 'Mensaje enviado correctamente',
      });
    }

    // IMAGEN
    if (type === 'image' && base64) {
      const cleanBase64 = base64.split(',')[1];
      if (!cleanBase64) {
        return res.status(400).json({
          status: 'error',
          message: 'Base64 no válido',
        });
      }

      await sendImageMessage(destination, cleanBase64, mentions, caption);
      return res.status(200).json({
        status: 'success',
        message: 'Imagen enviada correctamente',
      });
    }

    // ARCHIVO
    if (type === 'file' && base64) {
      const cleanBase64 = base64.split(',')[1];
      if (!cleanBase64) {
        return res.status(400).json({
          status: 'error',
          message: 'Base64 no válido',
        });
      }

      let mimeType = base64.split(';')[0].split(':')[1];

      if (mimeType === '@file/csv') mimeType = 'text/csv';
      if (mimeType === '@file/pdf') mimeType = 'application/pdf';

      const fileName =
        filename ||
        (mimeType === 'text/csv' ? 'file.csv' : 'file.pdf');

      await sendFileMessage(
        destination,
        cleanBase64,
        mimeType,
        fileName,
        mentions,
        caption
      );

      return res.status(200).json({
        status: 'success',
        message: 'Archivo enviado correctamente',
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Tipo de mensaje no válido',
    });
  } catch (error: any) {
    console.error('Error enviando mensaje:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

