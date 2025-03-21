import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import authUserRoutes from './routes/authUser.route';
import authAdminRoutes from './routes/authAdmin.route';
import userRoutes from './routes/user.route'
import adminRoutes from './routes/admin.route'
import QuizRoutes from './routes/quiz.route'
import sessionRoutes from './routes/session.route';
import connectDB from './config/db';
import cookieParser from 'cookie-parser'
import { authenticate } from './middleware/authenticate';
import morgan from 'morgan';
import cloudinary from 'cloudinary'

dotenv.config();

const app = express();
const port = 4004;

app.use(
  cors({
    origin: process.env.APP_ORIGIN as string,
    credentials: true,
  })
)

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', authUserRoutes)
app.use('/auth/admin', authAdminRoutes)

app.use('/user', authenticate, userRoutes)
app.use('/admin/user', authenticate, adminRoutes)
app.use('/sessions', authenticate, sessionRoutes)


app.use('/quiz', authenticate, QuizRoutes)

app.use(errorHandler);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await connectDB();
});