import React from 'react'
import { useAuthContext } from '../../context/AuthContext'

const Home: React.FC = () => {
  const { user } = useAuthContext()
  return (
    <div>
      <h1>
        Welcome{' '}
        <span className="text-indigo-600 font-montserrat">
          {' '}
          {user?.firstName}
        </span>{' '}
        to the Home Page
      </h1>
    </div>
  )
}

export default Home
