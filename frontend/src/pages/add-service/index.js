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
  const { isLogin, username } = useAuth()

  const { values } = FetchLoggedUserInfo()
  console.log('role:', values.role)

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
    } else {
      if (values.role == 'MainAdmin') {
        router.push('/pages/error')
      }
      console.log(values.role)
    }
  }, [router, values])

  return (
    <Card>
      <FormLayoutsService />
    </Card>
  )
}

export default Register