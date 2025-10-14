import { Request, Response } from 'express'
import { getHealthStatus } from '../services/health.service'

export const healthCheckController = (req: Request, res: Response) => {
  const status = getHealthStatus()
  res.json(status)
}
