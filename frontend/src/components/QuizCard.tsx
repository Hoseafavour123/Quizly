import { Link } from 'react-router-dom'
import {FaEdit, FaTrash } from 'react-icons/fa'
import DeleteQuizButton from './buttons/DeleteQuiz'

interface QuizCardProps {
  quiz: any
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <>
      <div className="p-3 rounded-md border border-gray-200 shadow-md bg-white">
        <Link to={'/'}>
          <div className="flex items-center justify-center bg-indigo-500 h-[200px] w-full">
            <div className="rounded-full animate-pulse w-14 h-14 bg-black flex items-center justify-center">
              <div className="p-6 text-white rounded-full">Go live</div>
            </div>
          </div>
        </Link>
        <p className="font-bold text-xl mt-2">{quiz.title}</p>
        <p className="text-gray-400">{quiz.questions.length} Questions</p>
        <p className="text-gray-400">{quiz.duration} Minutes</p>
        <div className="flex justify-end">
          <Link
            to={`/admin/quiz-builder/${quiz._id}`}
            className="text-blue-500 mr-2"
          >
            <FaEdit className="text-blue-500" />
          </Link>
       
            <DeleteQuizButton quizId={`${quiz._id}`}/>
        </div>
      </div>
    </>
  )
}

export default QuizCard
