import { Router } from "express";
import { createQuiz, deleteQuiz } from "../controller/quiz.controller";
import { uploadMiddleware } from "../middleware/uploadMiddleware";

const router = Router()

router.post("/", uploadMiddleware, createQuiz)
router.delete("/:id", deleteQuiz)

export default router