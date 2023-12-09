// ** MUI Imports
import Card from '@mui/material/Card'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'src/context/AuthContext'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import FormLayoutsService from 'src/views/form-layouts/FormLayoutService'

const Register = () => {
  const { isLogin } = useAuth()

  const { values } = FetchLoggedUserInfo()

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    } else {
      if (values.role == 'MainAdmin') {
        router.push('/pages/error')
      }
    }
  }, [router, values, isLogin])

  return (
    <Card>
      <FormLayoutsService />
    </Card>
  )
}

export default Register
