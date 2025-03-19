import Quiz from '../models/quiz.model'
import { v2 as cloudinary } from 'cloudinary'
import { quizSchema } from './quiz.schema'
import catchErrors from '../utils/catchErrors'




// Get all quizzes

export const getAllQuizzes = catchErrors(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;

    const totalQuizzes = await Quiz.countDocuments();
    const quizzes = await Quiz.find()
      .sort({ createdAt: -1 }) // Latest first
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      quizzes,
      currentPage: page,
      totalPages: Math.ceil(totalQuizzes / limit),
      totalQuizzes,
    });
  })

// Create a Quiz
export const createQuiz = catchErrors(async (req, res) => {
  const parsedData = quizSchema.safeParse(req.body)
  if (!parsedData.success) {
    console.log(parsedData.error.errors)
    return res
      .status(400)
      .json({ message: 'Invalid input', errors: parsedData.error.errors })
  }

  const { title, description, duration, questions } = parsedData.data
  const files = (req.files as Express.Multer.File[]) || []

  // Function to upload an image buffer to Cloudinary
  const uploadToCloudinary = (file: Express.Multer.File) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'quiz_images' },
        (error, result) => {
          if (error) return reject(error)
          resolve(result?.secure_url)
        }
      )
      uploadStream.end(file.buffer) // Send buffer to Cloudinary
    })
  }

  // Upload images & create processed questions
  const processedQuestions = await Promise.all(
    questions.map(async (q, index) => {
      let imageUrl = null

      if (files[index]) {
        try {
          imageUrl = (await uploadToCloudinary(files[index])) as string
        } catch (error) {
          console.error('Cloudinary Upload Error:', error)
          return res.status(500).json({ message: 'Image upload failed' })
        }
      }

      return {
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer.toUpperCase(),
        image: imageUrl, // Store Cloudinary URL
      }
    })
  )

  const newQuiz = new Quiz({
    title,
    description,
    duration,
    questions: processedQuestions,
  })

  await newQuiz.save()
  res.status(201).json({ message: 'Quiz created successfully!' })
})

// Delete a quiz with Cloudinary cleanup
export const deleteQuiz = catchErrors(async (req, res) => {
  const { id } = req.params
  const quiz = await Quiz.findById(id)
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' })

  // Delete images from Cloudinary
  const deleteImagePromises = quiz.questions
    .filter((q) => q.image)
    .map((q) => {
      const publicId = (q.image as string).split('/').pop()?.split('.')[0] // Extract Cloudinary ID
      return cloudinary.uploader.destroy(publicId as string)
    })

  await Promise.all(deleteImagePromises)
  await Quiz.findByIdAndDelete(id)

  res.status(200).json({ message: 'Quiz deleted successfully!' })
})
