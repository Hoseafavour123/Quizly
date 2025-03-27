import Payment from '../models/payment.model'
import _ from 'lodash'
import {initializePayment, verifyPayment, PaymentForm} from '../utils/payments/payment'
import appAssert from '../utils/appAssert'

interface PaymentData {
  amount: number
  email: string
  full_name: string
}

interface VerifyPaymentResponse {
  status: boolean
  message: string
  data?: {
    reference: string
    amount: number
    status: 'pending' | 'success' | 'failed'
    customer: { email: string }
    metadata: { full_name: string }
  }
}

class PaymentService {
  async startPayment(data: PaymentData): Promise<any> {
    try {
      const form: PaymentForm = {
          amount: data.amount * 100, // Convert to kobo (smallest unit for Paystack)
          email: data.email,
          metadata: { full_name: data.full_name },
          callback_url: 'http://localhost:4004/payment/verify'
      }
      form.metadata = { full_name: form.metadata?.full_name || '' }
      form.amount *= 100 // Convert to kobo (smallest unit for Paystack)

      const response = await initializePayment(form)
      return response
    } catch (error: any) {
      error.source = 'Start Payment Service'
      throw error
    }
  }

  async createPayment(reference: string): Promise<any> {
    appAssert(reference, 400, 'No reference provided!')
    
    try {
      const response: VerifyPaymentResponse = await verifyPayment(reference)

      if (!response.status || !response.data) {
        throw new Error('Payment verification failed')
      }

      const { reference: paymentReference, amount, status } = response.data
      const { email } = response.data.customer
      const full_name = response.data.metadata.full_name

      const newPayment = new Payment({
        reference: paymentReference,
        amount,
        email,
        full_name,
        status,
      })
      await newPayment.save()

      return newPayment
    } catch (error: any) {
      error.source = 'Create Payment Service'
      throw error
    }
  }

  async paymentReceipt(reference: string): Promise<any> {
    try {
      const transaction = await Payment.findOne({ reference })
      return transaction
    } catch (error: any) {
      error.source = 'Payment Receipt'
      throw error
    }
  }
}

export default PaymentService
