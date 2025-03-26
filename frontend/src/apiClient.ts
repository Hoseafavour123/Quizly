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

export type StatsType = {
  highestScore: number
  totalQuizzesTaken: number
  userRank: number
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
  const response = await fetch(`${API_BASE_URL}/auth/email/verify/${code}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody)
  }
}

export const sendForgotPasswordEmail = async (
  email: ForgotPasswordFormData
) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/forgot`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  })
  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const resetPassword = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/password/reset`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: formData.get('code'),
      password: formData.get('password'),
    }),
  })

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

export const getLiveQuiz = async () => {
  console.log('fetchig live quiz...')
  const response = await fetch(`${API_BASE_URL}/quiz/get-live-quiz`, {
    credentials: 'include',
  })
  if (!response.ok) {
    let errorMessage = 'Failed to fetch live quiz'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}

export const submitQuiz = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    let errorMessage = 'Failed to submit'

    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
}

export const getStats = async (userId: string): Promise<StatsType> => {
  const response = await fetch(`${API_BASE_URL}/quiz/get-stats/${userId}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    let errorMessage = 'Failed to fetch live quiz'
    try {
      const errorData = await response.json()
      errorMessage = errorData.message || errorMessage
    } catch (error) {
      console.error('Error parsing response:', error)
    }

    throw new Error(errorMessage)
  }
  return response.json()
}

export const getLeaderboardData = async () => {
  return [
    {
      id: 1,
      name: 'Alice',
      avatar: 'https://i.pravatar.cc/50?img=1',
      score: 980,
    },
    {
      id: 2,
      name: 'Bob',
      avatar: 'https://i.pravatar.cc/50?img=2',
      score: 920,
    },
    {
      id: 3,
      name: 'Charlie',
      avatar: 'https://i.pravatar.cc/50?img=3',
      score: 870,
    },
    {
      id: 4,
      name: 'David',
      avatar: 'https://i.pravatar.cc/50?img=4',
      score: 840,
    },
  ]
}
