import mongoose, { Document, Schema } from 'mongoose'

// Define the Payment Interface
interface IPayment extends Document {
  full_name: string
  email: string
  amount: number
  reference: string
  status: 'pending' | 'success' | 'failed'
}

// Create Schema
const PaymentSchema = new Schema<IPayment>(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    reference: {
      type: String,
      required: true,
      unique: true, // Ensures uniqueness
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
)

// Export the Model
const Payment = mongoose.model<IPayment>('Payment', PaymentSchema)

export default Payment
