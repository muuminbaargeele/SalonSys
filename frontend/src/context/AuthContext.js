import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

const BASE_URL = 'https://salonsys.000webhostapp.com/backend/api'

export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState('')

  const router = useRouter()

  const login = async (username, password) => {
    const params = new URLSearchParams()
    params.append('Username', username)
    params.append('Password', password)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const response = await axios.post(`${BASE_URL}/login.php`, params, requestData)
    const data = await response.data
    if (data[0] == 'Success') {
      setIsLogin(true)
      setRole(data[1])
      router.push('/')
    } else {
      toast.error(data)
    }
    try {
    } catch (error) {
      console.log(error)
    }
  }

  const values = { isLogin, login }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }
  return context
}
