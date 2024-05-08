import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)
import { API_BASE_URL } from 'src/lib/apiConfig'

export const AuthContextProvider = ({ children }) => {
  const initialIsLoggedIn = typeof window !== 'undefined' && window.localStorage.getItem('isLogin') === 'true'

  const [isLogin, setIsLogin] = useState(initialIsLoggedIn)
  const [role, setRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const login = async (username, password) => {
    const params = new URLSearchParams()
    params.append('Username', username)
    params.append('Password', password)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    setIsLoading(true)
    try {
      const response = await axios.post(`../../../backend/api/login.php`, params, requestData)
      const data = await response.data
      if (data[0] == 'Success') {
        window.localStorage.setItem('username', username)
        localStorage.setItem('isLogin', 'true')
        setIsLogin(true)
        setRole(data[1])
        router.push('/')
      } else {
        window.localStorage.setItem('username', '')
        localStorage.setItem('isLogin', 'false')
        setIsLogin(false)
        setRole('')
        toast.error(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const values = { isLogin, login, role, setIsLogin, isLoading }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }
  return context
}
