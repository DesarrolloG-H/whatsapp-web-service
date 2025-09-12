# WhatsApp Web Service

Este proyecto es un servicio web que utiliza **Node.js** y **Express** para interactuar con **WhatsApp Web** a través de la librería `whatsapp-web.js`. El servicio permite enviar mensajes, imágenes y archivos a través de WhatsApp de manera programática.

## Requisitos

- Node.js (v16 o superior)
- NPM (o Yarn)
- PM2 (para gestionar el servicio en producción)
- Docker (opcional, si deseas usar contenedores)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>

   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## EJECUCION

1. Transpilar Tyspescript a javascript

   - npm run build

2. Iniciarlizar servicio con pm2

   - pm2 start dist/server.js --name "whatsapp-web-service"

3. Reiniciar servicio

   - pm2 restart whatsapp-web-service
