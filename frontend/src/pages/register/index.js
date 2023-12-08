// ** MUI Imports
import Card from '@mui/material/Card'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsRegister'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'src/context/AuthContext'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'

const Register = () => {
  const { isLogin } = useAuth()

  const { values } = FetchLoggedUserInfo()

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    } else {
      if (values.role == 'SalonUser') {
        router.push('/pages/error')
      }
    }
  }, [router, values])

  return (
    <Card>
      <FormLayoutsSeparator></FormLayoutsSeparator>
    </Card>
  )
}

export default Register
