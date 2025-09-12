// server.ts
import express from 'express';
import sendRoutes from './routes/sendRoutes';

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json({ limit: '50mb' }));

app.use(sendRoutes);

app.get('/', (req, res) => res.send('WhatsApp Web Service está corriendo'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
