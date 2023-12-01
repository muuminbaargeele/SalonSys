// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'

import { useAuth } from 'src/context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

// ** Icons Imports

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [values, setValues] = useState({
    name: '',
    username: '',
    role: '',
    status: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const { setIsLogin } = useAuth()

  // ** Hooks
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const logout = () => {
    localStorage.clear()
    setIsLogin(false)
    router.push('/login')
  }

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const params = new URLSearchParams()
      const currUsername = localStorage.getItem('username')
      params.append('Username', currUsername)

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      setIsLoading(true)
      try {
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/get_admins.php',
          params,
          requestData
        )
        const data = await response.data[0]
        setValues({
          name: data.Name || '',
          username: data.Username || '',
          role: data.Role || '',
          status: data.Status || ''
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLoggedUser()
  }, [])

  const updateMainAdminNameAndUsername = async event => {
    event.preventDefault()

    if (!values.name || !values.username) return toast.error('Please fill inputFields.')

    const params = new URLSearchParams()
    params.append('Name', values.name)
    params.append('Username', values.username)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post('', params, requestData)
      const data = await response.data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CardContent>
      <form onSubmit={updateMainAdminNameAndUsername}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              type='text'
              placeholder='Mohamed Omer'
              value={isLoading ? 'Loading...' : values.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Username'
              type='text'
              placeholder='mohamed'
              value={isLoading ? 'Loading...' : values.username}
              onChange={handleChange('username')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ pointerEvents: 'none' }}
              fullWidth
              label='Role'
              value={isLoading ? 'Loading...' : values.role}
              onChange={handleChange('role')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ pointerEvents: 'none' }}
              fullWidth
              label='Status'
              placeholder='Active'
              value={isLoading ? 'Loading...' : 'Active'}
              onChange={handleChange('status')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }} onClick={() => {}}>
              Save Changes
            </Button>
            <Button variant='outlined' color='secondary' onClick={logout}>
              <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem' }} />
              Logout
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
