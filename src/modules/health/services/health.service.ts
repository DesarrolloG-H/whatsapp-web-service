export const getHealthStatus = () => {
  return {
    status: 'OK',
    message: '🚀 WhatsApp Web Service operativo',
    timestamp: new Date().toISOString(),
  }
}
