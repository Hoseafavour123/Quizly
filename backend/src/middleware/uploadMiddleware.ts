import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
  destination: 'uploads/', // Ensure this folder exists
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
  },
})

const storage2 = multer.memoryStorage()

const upload = multer({ storage })
const upload2 = multer({ storage: storage2 })

export const uploadMiddleware = upload2.any()
