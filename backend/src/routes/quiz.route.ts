import { Router } from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getLiveQuiz, getQuiz,  goLive,  updateQuiz } from "../controller/quiz.controller";
import { uploadMiddleware } from "../middleware/uploadMiddleware";

const router = Router()



router.get('/get-live-quiz', getLiveQuiz)
router.post("/", uploadMiddleware, createQuiz)
router.delete("/:id", deleteQuiz)

router.get('/', getAllQuizzes)
router.get('/:id', getQuiz)
router.put('/:id', uploadMiddleware, updateQuiz)
router.put('/go-live/:id', goLive)
export default router