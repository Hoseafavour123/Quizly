import mongoose from 'mongoose'

export interface QuizDocument extends mongoose.Document {
    title: string
    description: string
    duration: number
    questions: [
        {
        image: string
        text: string
        options: [string]
        correctAnswer: string
        }
    ]
}

const quizSchema = new mongoose.Schema<QuizDocument>({
  title: String,
  description: String,
  duration: Number,
  questions: [
    {
      image: String,
      text: String,
      options: [String],
      correctAnswer: String,
    },
  ],
},{
    timestamps: true
})

const QuizModel = mongoose.model<QuizDocument>('Quiz', quizSchema)
export default QuizModel