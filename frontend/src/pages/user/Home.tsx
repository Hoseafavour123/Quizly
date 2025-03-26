import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import Dashboard from './Dashboard1'

const Home: React.FC = () => {
  const { user } = useAuthContext()
  return (
    <div>
      <h1>
        <Dashboard/>
      </h1>
    </div>
  )
}

export default Home
