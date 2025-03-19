import React from 'react'
import { useAdminAuthContext } from '../../context/AdminAuthContext'

const AdminHome: React.FC = () => {
  const { admin } = useAdminAuthContext()
  return (
    <div>
      <h1>
        Welcome Admin{' '}
        <span className="text-indigo-600 font-montserrat">
          {' '}
          {admin?.name}
        </span>{' '}
        to the Admin Home Page
      </h1>
    </div>
  )
}

export default AdminHome
