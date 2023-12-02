// ** MUI Imports
import Card from '@mui/material/Card'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsRegister'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'src/context/AuthContext'

const Register = () => {
  const { isLogin, username } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    } else {
      console.log(username)
    }
  }, [router])

  return (
    <Card>
      <FormLayoutsSeparator></FormLayoutsSeparator>
    </Card>
  )
}

export default Register
