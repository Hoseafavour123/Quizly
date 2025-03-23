import Quiz from '../models/quiz.model'
import { v2 as cloudinary } from 'cloudinary'
import { quizSchema } from './quiz.schema'
import catchErrors from '../utils/catchErrors'
import appAssert from '../utils/appAssert'
import { getSocket } from "../sockets/socket";

// Get single quiz
export const getQuiz = catchErrors(async (req, res) => {
  const { id } = req.params
  const quiz = await Quiz.findById(id)
  appAssert(quiz, 404, 'Quiz not found')
  return res.json(quiz)
})

// Get all quizzes
export const getAllQuizzes = catchErrors(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = 5

  const totalQuizzes = await Quiz.countDocuments()
  const quizzes = await Quiz.find()
    .sort({ createdAt: -1 }) // Latest first
    .skip((page - 1) * limit)
    .limit(limit)

  res.json({
    quizzes,
    currentPage: page,
    totalPages: Math.ceil(totalQuizzes / limit),
    totalQuizzes,
  })
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

// Update a Quiz
export const updateQuiz = catchErrors(async (req, res) => {
  const { id } = req.params
  const parsedData = quizSchema.safeParse(req.body)

  if (!parsedData.success) {
    console.log(parsedData.error.errors)
    return res
      .status(400)
      .json({ message: 'Invalid input', errors: parsedData.error.errors })
  }

  const { title, description, duration, questions } = parsedData.data
  const files = (req.files as Express.Multer.File[]) || []

  const quiz = await Quiz.findById(id)
  appAssert(quiz, 404, 'Quiz not found')

  const uploadToCloudinary = async (file: Express.Multer.File) => {
    try {
      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'quiz_images' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result?.secure_url as string)
          }
        )
        uploadStream.end(file.buffer) // Send file buffer to Cloudinary
      })
    } catch (error) {
      console.error('Cloudinary Upload Error:', error)
      throw new Error('Image upload failed')
    }
  }

  const processedQuestions = await Promise.all(
    questions.map(async (q, index) => {
      let imageUrl = q.image || null // Preserve old image if no new one

      // Check if a new image was uploaded for this question
      const file = files.find(
        (f) => f.fieldname === `questions[${index}][image]`
      )

      if (file) {
        try {
          imageUrl = await uploadToCloudinary(file) // Upload new image
        } catch (error) {
          console.error(`Image upload failed for question ${index}:`, error)
          return res
            .status(500)
            .json({ message: `Image upload failed for question ${index}` })
        }
      }

      console.log(q)

      return {
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer.toUpperCase(),
        image: imageUrl, // Store Cloudinary URL
      }
    })
  )

  // // Process questions (handle new images, retain old ones)
  // const processedQuestions = await Promise.all(
  //   questions.map(async (q, index) => {
  //     let imageUrl = q.image // Keep old image if no new one is uploaded

  //     if (files[index]) {
  //       // Upload new image to Cloudinary
  //       const result = await cloudinary.uploader.upload(files[index].path)
  //       imageUrl = result.secure_url

  //       // Delete old image from Cloudinary if it exists
  //       if (q.image) {
  //         const publicId = q.image.split('/').pop()?.split('.')[0]
  //         await cloudinary.uploader.destroy(publicId as string)
  //       }
  //     }

  //     return {
  //       text: q.text,
  //       options: q.options,
  //       correctAnswer: q.correctAnswer.toUpperCase(),
  //       image: imageUrl,
  //     }
  //   })
  // )

  // Update quiz in DB
  await Quiz.findByIdAndUpdate(id, {
    title,
    description,
    duration,
    questions: processedQuestions,
  })

  return res.status(200).json({ message: 'Quiz updated successfully!' })
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

  return res.status(200).json({ message: 'Quiz deleted successfully!' })
})




export const goLive = catchErrors(async (req, res) => {
   const { id } = req.params
   const quiz = await Quiz.findById(id)

   if (!quiz) return res.status(404).json({ message: 'Quiz not found' })

   const liveQuiz = await Quiz.findOne({ status: 'live' })
   if (liveQuiz)
     return res.status(400).json({ message: 'A quiz is already live' })

   quiz.status = 'live'
   quiz.startTime = new Date()
   await quiz.save()

   const io = getSocket() // ✅ Get the io instance
   io.emit('quiz-live', quiz) // Notify users in real-time

   setTimeout(async () => {
     quiz.status = 'closed'
     await quiz.save()
     io.emit('quiz-ended', { quizId: quiz._id })
   }, quiz.duration * 60 * 1000) // Auto-close after duration

   return res.json({ message: 'Quiz is live!' })
})



export const getLiveQuiz = catchErrors(async (req, res) => {
  const liveQuiz = await Quiz.findOne({ status: 'live' })

 if (!liveQuiz) return res.status(400).json({ message: 'No live quiz' })
  return res.json(liveQuiz)
})
