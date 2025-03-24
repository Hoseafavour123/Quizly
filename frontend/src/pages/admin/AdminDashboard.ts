import { Card, CardContent, CardHeader, CardTitle } from 'flowbite-react'
import { FaChartLine, FaTrophy, FaClock, FaBrain } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Bar, Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const Dashboard = () => {
  const quizData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Quizzes Taken',
        data: [3, 5, 8, 10, 7, 12],
        backgroundColor: '#6366F1',
      },
    ],
  }

  const scoreData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Average Score',
        data: [85, 75, 65],
        backgroundColor: ['#22C55E', '#FACC15', '#EF4444'],
      },
    ],
  }

  return (
    <motion.div
      className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBrain /> Total Quizzes Taken
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">58</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-teal-400 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy /> Highest Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">98%</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaClock /> Avg. Time Per Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">7m 45s</p>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Quiz Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={quizData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={scoreData} />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Dashboard