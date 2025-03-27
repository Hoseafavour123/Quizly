import { Request, Response } from 'express'
import PaymentService from '../services/payment.service'

// Initialize PaymentService instance
const paymentInstance = new PaymentService()

export const startPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await paymentInstance.startPayment(req.body)
    res.status(201).json({ status: 'Success', data: response })
  } catch (error: any) {
    res.status(500).json({ status: 'Failed', message: error.message })
  }
}

export const createPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await paymentInstance.createPayment(req.query.reference as string)
    res.status(201).json({ status: 'Success', data: response })
  } catch (error: any) {
    res.status(500).json({ status: 'Failed', message: error.message })
  }
}

export const getPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await paymentInstance.paymentReceipt(req.body.reference)
    res.status(201).json({ status: 'Success', data: response })
  } catch (error: any) {
    res.status(500).json({ status: 'Failed', message: error.message })
  }
}
