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
  const { isLogin, username } = useAuth()

  const { values } = FetchLoggedUserInfo()
  console.log('role:', values.role)

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    } else {
      if (values.role == 'SalonUser') {
        router.push('/pages/error')
      }
      console.log(values.role)
    }
  }, [router, values])

  return (
    <Card>
      <FormLayoutsSeparator></FormLayoutsSeparator>
    </Card>
  )
}

export default Register
