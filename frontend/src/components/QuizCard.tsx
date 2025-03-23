import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import DeleteQuizButton from './buttons/DeleteQuiz'
import { useModal } from '../context/ModalContext'
import { useMutation } from 'react-query'
import * as apiAdmin from '../apiAdmin'
import { useAppContext } from '../context/AppContext'

interface QuizCardProps {
  quiz: any
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  const mutation = useMutation(apiAdmin.goLive, {
    onSuccess: () => {
      showToast({ message: 'Quiz is live', type: 'SUCCESS' })
      navigate('/admin/live-quiz')
      console.log('Quiz is live')
    },
    onError:(err: Error) => {
      showToast({ message: err.message, type: 'ERROR' })
      console.log(err.message)
    }
  })
  const { showModal } = useModal()
  const openModal = () => {
    showModal({
      title: 'Go Live',
      content: 'Are you sure you want to go live?',
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => {
        mutation.mutate(quiz._id)
      },
    })
  }
  return (
    <>
      <div className="p-3 rounded-md border border-gray-200 shadow-md bg-white">
        <div className="flex items-center justify-center bg-indigo-500 h-[200px] w-full">
          <div className="rounded-full animate-pulse w-14 h-14 bg-black flex items-center justify-center">
            <div className="p-6 text-white rounded-full">
              <button onClick={openModal}> Go live </button>
            </div>
          </div>
        </div>
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

          <DeleteQuizButton quizId={`${quiz._id}`} />
        </div>
      </div>
    </>
  )
}

export default QuizCard
