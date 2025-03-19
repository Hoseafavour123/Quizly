import { Router } from "express";
import { createQuiz, deleteQuiz, getAllQuizzes } from "../controller/admin.quiz.controller";
import { uploadMiddleware } from "../middleware/uploadMiddleware";

const router = Router()

router.post("/", uploadMiddleware, createQuiz)
router.delete("/:id", deleteQuiz)
router.get('/', getAllQuizzes)
export default router