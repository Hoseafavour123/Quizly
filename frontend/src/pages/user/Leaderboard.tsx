import { useQuery } from 'react-query'

interface User {
  id: string;
  name: string;
  avatar: string;
  score: number;
}
import { motion, AnimatePresence } from 'framer-motion'
import * as apiUser from '../../apiClient'
import ConfettiEffect from './ConfettiEffect'
import { FaShareAlt } from 'react-icons/fa'
import { useState } from 'react';
import Filters from './Filters';

export default function Leaderboard() {
     const [filter, setFilter] = useState('weekly')
     
    const { data: users, isLoading } = useQuery('leaderboard', apiUser.getLeaderboardData)
  return (
    <>
      <Filters filter={filter} setFilter={setFilter} />
      <div className="w-full max-w-3xl bg-gray-800 p-4 rounded-lg mt-4">
        {isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <AnimatePresence>
            {users &&
              users.map((user, index) => (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="flex items-center justify-between p-3 mb-2 bg-gray-700 rounded-lg relative"
                >
                  {index === 0 && <ConfettiEffect />}{' '}
                  {/* Celebration for 1st place */}
                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-lg font-bold ${
                        index === 0 ? 'text-yellow-400' : 'text-blue-400'
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="hover:underline cursor-pointer">
                      {user.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="font-semibold text-yellow-400">
                      {user.score} pts
                    </p>
                    <FaShareAlt className="text-gray-400 hover:text-white cursor-pointer" />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </div>
    </>
  )
}
