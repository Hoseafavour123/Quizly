import { z } from 'zod'

export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().optional(),
  duration: z.string().regex(/^\d+$/, 'Duration must be a number'),
  questions: z
    .array(
      z.object({
        text: z.string().min(5, 'Question must be at least 5 characters'),
        options: z
          .array(z.string().min(1))
          .min(2, 'At least two options are required')
          .max(4, 'A maximum of 4 options are allowed'),
        correctAnswer: z
          .string()
          .length(1, 'Correct answer must be a single letter'),
      })
    )
    .min(1, 'At least one question is required'),
})