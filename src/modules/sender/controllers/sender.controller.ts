// controllers/sendController.ts
import { Request, Response } from 'express';
import { sendTextMessage } from '../services/sendTextMessage';
import { sendImageMessage } from '../services/sendImageMessage';
import { sendFileMessage } from '../services/sendFileMessage';
import { client } from '../../../core/whatsappClient';

// Función para obtener detalles de los grupos
export const getGroupsDetails = async (req: Request, res: Response) => {
  try {
    // Verificar que el cliente esté listo
    if (!client.info || !client.info.wid) {
      return res.status(500).json({
        status: 'error',
        message: 'Cliente de WhatsApp aún no listo',
      });
    }

    // Obtener todos los chats
    const chats = await client.getChats();

    // Filtrar solo los chats que son grupos
    const groupChats = chats.filter(chat => chat.isGroup);  // Filtrar chats de tipo "grupo"

    if (groupChats.length > 0) {
      // Devolver detalles de los grupos encontrados
      const groupDetails = groupChats.map(chat => ({
        groupId: chat.id._serialized,  // ID del grupo en el formato <group-id>@g.us
        groupName: chat.name,  // Nombre del grupo
        isGroup: chat.isGroup,
      }));

      return res.status(200).json({
        status: 'success',
        message: 'Detalles de los grupos obtenidos correctamente',
        groupDetails,  // Lista de grupos con sus detalles
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'No se encontraron grupos en tu cuenta de WhatsApp',
      });
    }
  } catch (error: any) {
    console.error('Error obteniendo detalles de los grupos:', error);
    return res.status(500).json({
      status: 'error',
      message: `Error al obtener detalles de los grupos: ${error.message}`,
    });
  }
};

// Lógica para enviar mensajes a contactos o grupos
export const sendMessageHandler = async (req: Request, res: Response) => {
  const { number, groupId, message, type, base64, caption, filename,mentions } = req.body;

  try {
    // Verificar que el cliente esté listo
    if (!client.info || !client.info.wid) {
      console.log('Cliente no listo:', client.info);
      return res.status(500).json({
        status: 'error',
        message: 'Cliente de WhatsApp aún no listo',
      });
    }

    // Verificar el destino
    const destination = groupId ? `${groupId}@g.us` : `${number}@c.us`;

    // Enviar mensaje de texto
    if (type === 'text') {
      await sendTextMessage(destination, message, mentions);
      return res.status(200).json({
        status: 'success',
        message: 'Mensaje enviado correctamente',
      });
    }

    // Enviar imagen (Base64)
    if (type === 'image' && base64) {
      const cleanBase64 = base64.split(',')[1]; // Limpiar Base64
      if (!cleanBase64) {
        return res.status(400).json({
          status: 'error',
          message: 'Base64 no válido o incompleto',
        });
      }
      await sendImageMessage(destination, cleanBase64,mentions, caption);
      return res.status(200).json({
        status: 'success',
        message: 'Imagen enviada correctamente',
      });
    }

    // Enviar archivo (PDF, CSV, Excel, etc.)
    if (type === 'file' && base64) {
      const cleanBase64 = base64.split(',')[1]; // Limpiar Base64
      if (!cleanBase64) {
        return res.status(400).json({
          status: 'error',
          message: 'Base64 no válido o incompleto',
        });
      }

      let mimeType = base64.split(';')[0].split(':')[1];  // Detectar tipo MIME

      // Asegurarnos de que el tipo MIME es correcto para CSV, PDF, etc.
      if (mimeType === '@file/csv') {
        mimeType = 'text/csv';
      } else if (mimeType === '@file/pdf') {
        mimeType = 'application/pdf';
      }

      const fileName = filename || (mimeType === 'text/csv' ? 'file.csv' : 'file.pdf');
      await sendFileMessage(destination, cleanBase64, mimeType, fileName, mentions, caption);
      return res.status(200).json({
        status: 'success',
        message: 'Archivo enviado correctamente',
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Tipo de mensaje no válido o falta Base64',
    });
  } catch (error: any) {
    console.error('Error enviando mensaje:', error);
    return res.status(500).json({
      status: 'error',
      message: `Error al enviar el mensaje: ${error.message}`,
    });
  }
};

