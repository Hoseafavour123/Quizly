import { ForgotPasswordFormData } from './pages/user/authentication/ForgotPassword'
import { LoginFormData } from './pages/user/authentication/Login'
import { RegisterFormData } from './pages/user/authentication/Register'

type UserReturnType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  imageInfo: { imageUrl: string; imageId: string }
  createdAt: Date
  updatedAt: Date
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
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

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
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

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

export const verifyEmail = async (code: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/email/verify/${code}`,
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
    `${API_BASE_URL}/auth/password/forgot`,
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

export const resetPassword = async (formData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/password/reset`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: formData.get('code'),
        password: formData.get('password'),
      }),
    }
  )

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const getUser = async (): Promise<UserReturnType> => {
  const response = await fetch(`${API_BASE_URL}/user`, {
    credentials: 'include',
  })
  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }
  return body
}

export const updateUser = async (
  formData: FormData
): Promise<UserReturnType> => {
  const response = await fetch(`${API_BASE_URL}/user/update`, {
    credentials: 'include',
    method: 'PUT',
    body: formData,
  })

  const body = await response.json()
  if (!response.ok) {
    throw new Error(body.message)
  }

  return body
}
