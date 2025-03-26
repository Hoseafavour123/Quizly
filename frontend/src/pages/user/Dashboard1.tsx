import { motion } from 'framer-motion'
import { Card} from 'flowbite-react'
import { FaChartBar, FaClipboardList, FaClock } from 'react-icons/fa'
import * as apiUser from '../../apiClient'
import { useQuery } from 'react-query'
import { useAuthContext } from '../../context/AuthContext'
import Loader1 from '../../components/Loader1'

const Dashboard = () => {

   const { user } = useAuthContext() // Get logged-in user
   const userId = user?._id

   const { data, isLoading, error } = useQuery(
     ['userStats', userId],
     () => user ? apiUser.getStats(user._id) : Promise.reject('User is undefined'),
     {
       enabled: !!userId, // Prevent query if userId is missing
       onSuccess(data) {
         console.log(data)
       },
     }
   )


  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-4xl font-extrabold text-white">Quiz Dashboard</h1>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
            <FaChartBar className="text-yellow-400 text-5xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">
                Total Quizzes Taken
              </h2>
              <p className="text-2xl font-bold text-white">{data?.totalQuizzesTaken}</p>
            </div>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
            <FaClipboardList className="text-green-400 text-5xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">
                Highest Score
              </h2>
              <p className="text-2xl font-bold text-white">{data?.highestScore}%</p>
            </div>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="p-6 flex items-center bg-gray-800 shadow-lg rounded-lg">
            <FaClock className="text-blue-400 text-5xl mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-300">
              Rank
              </h2>
              <p className="text-2xl font-bold text-white">{data?.userRank}</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
        <ul className="space-y-3">
          {[
            "Completed 'Astronomy Basics' Quiz",
            "Scored 85% on 'Black Hole Mysteries'",
            "Started 'Quantum Mechanics' Quiz",
          ].map((activity, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gray-700 rounded-md text-gray-300 font-semibold"
            >
              {activity}
            </motion.li>
          ))}
        </ul>
      </motion.div> */}

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Quiz Master', 'Fast Learner', '100% Accuracy'].map(
            (achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gray-700 rounded-md text-gray-300 font-semibold flex items-center"
              >
                <FaTrophy className="text-yellow-400 text-3xl mr-3" />
                {achievement}
              </motion.div>
            )
          )}
        </div>
      </motion.div> */}
    </div>
  )
}

export default Dashboard