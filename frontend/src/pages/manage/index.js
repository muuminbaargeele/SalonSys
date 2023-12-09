// ** MUI Imports
import Card from '@mui/material/Card'
import ManageTable from 'src/views/tables/ManageTable'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuth } from 'src/context/AuthContext'

const Manage = () => {
  const { isLogin } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')

      return null;
    }
  }, [router, isLogin])

  return (
    <Card>
      <ManageTable></ManageTable>
    </Card>
  )
}

export default Manage
