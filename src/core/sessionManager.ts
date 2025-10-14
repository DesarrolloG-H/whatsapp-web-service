import fs from 'fs'
import path from 'path'

const SESSION_DIR = path.join(process.cwd(), 'session')
const SESSION_FILE = path.join(SESSION_DIR, 'session.json')

/**
 * 🧩 Inicializa el entorno de sesión
 * Crea la carpeta si no existe
 */
export const initSessionDirectory = () => {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true })
    console.log(`Carpeta de sesión creada en: ${SESSION_DIR}`)
  }
}

/**
 * 💾 Verifica si existe una sesión activa
 */
export const checkExistingSession = (): boolean => {
  return fs.existsSync(SESSION_FILE)
}

/**
 * 📥 Carga una sesión desde el archivo
 */
export const loadSession = (): any | null => {
  if (checkExistingSession()) {
    try {
      const data = fs.readFileSync(SESSION_FILE, 'utf-8')
      const session = JSON.parse(data)
      console.log('Sesión cargada correctamente.')
      return session
    } catch (error) {
      console.error('Error al leer la sesión:', error)
      return null
    }
  }
  console.log('No existe una sesión previa.')
  return null
}

/**
 * 💾 Guarda manualmente la sesión
 * (opcional si no usas LocalAuth)
 */
export const saveSession = (session: any) => {
  try {
    fs.writeFileSync(SESSION_FILE, JSON.stringify(session))
    console.log('Sesión guardada correctamente.')
  } catch (error) {
    console.error('Error al guardar la sesión:', error)
  }
}

/**
 * 🧹 Elimina la sesión guardada
 */
export const clearSession = () => {
  if (checkExistingSession()) {
    fs.unlinkSync(SESSION_FILE)
    console.log('Sesión eliminada correctamente.')
  } else {
    console.log('No hay sesión para eliminar.')
  }
}

/**
 * 🔄 Reinicia la sesión completamente (borrar y forzar nuevo QR)
 */
export const resetSession = () => {
  console.log('Reiniciando sesión de WhatsApp...')
  clearSession()
  console.log('Escanea el nuevo QR cuando el cliente se inicialice nuevamente.')
}
