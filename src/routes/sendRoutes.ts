// routes/sendRoutes.ts
import { Router } from 'express';
import { sendMessageHandler, getGroupsDetails } from '../controllers/sendController';  // Controlador para obtener ID de grupo

const router = Router();

// Endpoint para enviar mensajes a contactos o grupos
router.post('/send-message', sendMessageHandler);

// Endpoint para obtener los detalles de los grupos
router.get('/get-groups-details', getGroupsDetails);



export default router;
