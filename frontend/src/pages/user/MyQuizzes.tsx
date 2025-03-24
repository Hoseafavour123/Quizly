import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const quizzes = [
  {
    id: 1,
    title: 'JavaScript Basics',
    category: 'Programming',
    score: 85,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'React Fundamentals',
    category: 'Frontend Development',
    score: 92,
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Data Structures',
    category: 'Computer Science',
    score: 76,
    status: 'In Progress',
  },
  {
    id: 4,
    title: 'AI & Machine Learning',
    category: 'Artificial Intelligence',
    score: null,
    status: 'Not Started',
  },
]

const MyQuizzes = () => {
  const [search, setSearch] = useState('')

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 text-white bg-[#0D0D12] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-pink-600 bg-clip-text text-transparent">
        My Quizzes
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search quizzes..."
          className="w-full bg-neutral-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Quizzes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            whileHover={{ scale: 1.05 }}
            className="bg-neutral-900 p-5 rounded-lg shadow-lg hover:shadow-indigo-500/50 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-400 mb-2">Category: {quiz.category}</p>
            <div className="flex items-center justify-between">
              {quiz.score !== null ? (
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">Score: {quiz.score}%</span>
                </div>
              ) : (
                <span className="text-gray-400">{quiz.status}</span>
              )}
              <Link
                to={`/quiz/${quiz.id}`}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                {quiz.status === 'Completed' ? 'Retake' : 'Start'}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MyQuizzes