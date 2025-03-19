import { ForgotPasswordFormData } from './pages/admin/authentication/ForgotPassword'
import { LoginFormData } from './pages/admin/authentication/Login'
import { RegisterFormData } from './pages/admin/authentication/Register'



type AdminReturnType = {
  _id: string
  name:string
  email: string
  imageInfo: {imageUrl: string, imageId: string}
  createdAt: Date
  updatedAt: Date
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const registerAdmin = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...formData}),
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}


export const loginAdmin = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }

  return body
}

export const logoutAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/admin/logout`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

export const verifyAdminEmail = async (code: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/admin/email/verify/${code}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody)
  }
}


export const sendForgotPasswordEmail = async (
  email: ForgotPasswordFormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/admin/password/forgot`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    }
  )
  const responseBody = await response.json()
  
  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const resetAdminPassword = async (
  formData: FormData
) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/admin/password/reset`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code:formData.get('code'), password:formData.get('password')}),
    }
  )

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getAdmin = async (): Promise<AdminReturnType> => {
  const response = await fetch(`${API_BASE_URL}/admin/user`, {
    credentials: 'include',
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const updatedAdmin = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/admin/user/update`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}



// QUIZ SECTION

export const createQuiz = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/quiz`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
}