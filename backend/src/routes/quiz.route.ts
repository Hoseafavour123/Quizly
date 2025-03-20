import { Router } from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuiz, updateQuiz } from "../controller/quiz.controller";
import { uploadMiddleware } from "../middleware/uploadMiddleware";

const router = Router()

router.post("/", uploadMiddleware, createQuiz)
router.delete("/:id", deleteQuiz)
router.get('/', getAllQuizzes)
router.get('/:id', getQuiz)
router.put('/:id', uploadMiddleware, updateQuiz)
export default router