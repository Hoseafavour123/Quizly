import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRegister from './pages/user/authentication/Register'
import UserLogin from './pages/user/authentication/Login'
import VerifyUserEmail from './pages/user/authentication/VerifyEmail'
import VerifyEmailMessage from './pages/user/authentication/VerifyMessage'
import ForgotPassword from './pages/user/authentication/ForgotPassword'
import ResetPassword from './pages/user/authentication/ResetPassword'
import UserContainer from './components/user/UserContainer'
import { AuthProvider } from './context/AuthContext'
import UserHome from './pages/user/Home'
import UserProfile from './pages/user/UserProfile'
import UserEdit from './pages/user/UserProfileEdit'
import MainUserLayout from './components/user/MainLayout'


import AdminRegister from './pages/admin/authentication/Register'
import AdminLogin from './pages/admin/authentication/Login'
import ForgotAdminPassword from './pages/admin/authentication/ForgotPassword'
import ResetAdminPassword from './pages/admin/authentication/ResetPassword'
import VerifyAdminEmail from './pages/admin/authentication/VerifyEmail'
import VerifyAdminEmailMessage from './pages/admin/authentication/VerifyMessage'
import AdminHome from './pages/admin/AdminHome'
import { AdminAuthProvider } from './context/AdminAuthContext'
import AdminContainer from './components/admin/AdminContainer'
import MainAdminLayout from './components/admin/MainLayout'
import AdminProfile from './pages/admin/AdminProfile'
import AdminEdit from './pages/admin/AdminEdit'
import AdminQuizBuilder from './pages/admin/QuizBuilder'
import AdminQuizList from './pages/admin/AllQuizzes'
import UpdateQuiz from './pages/admin/UpdateQuiz'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <UserContainer />
            </AuthProvider>
          }
        >
          <Route element={<MainUserLayout />}>
            <Route index element={<UserHome />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/edit" element={<UserEdit />} />
          </Route>
        </Route>
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/verify-message" element={<VerifyEmailMessage />} />
        <Route path="/email/verify/:code" element={<VerifyUserEmail />} />

        {/* Admin Routes */}

        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminContainer />
            </AdminAuthProvider>
          }
        >
          <Route element={<MainAdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/profile/edit" element={<AdminEdit />} />
            <Route path="/admin/quiz-builder" element={<AdminQuizBuilder />} />
            <Route path='/admin/quiz-builder/:quizId' element={<UpdateQuiz />} />
            <Route path="/admin/all-quizzes" element={<AdminQuizList />} />
          </Route>
        </Route>

        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/password/forgot"
          element={<ForgotAdminPassword />}
        />
        <Route path="/admin/password/reset" element={<ResetAdminPassword />} />
        <Route
          path="/admin/verify-message"
          element={<VerifyAdminEmailMessage />}
        />
        <Route
          path="/admin/email/verify/:code"
          element={<VerifyAdminEmail />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
