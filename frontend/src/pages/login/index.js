// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import { useAuth } from 'src/context/AuthContext'
import axios from 'axios'
import { API_BASE_URL } from 'src/lib/apiConfig'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  // ** State
  const [isLoadingLoggedUser, setIsloadingLoggedUser] = useState(false)
  const [loggedName, setLoggedName] = useState(false)

  const [values, setValues] = useState({
    password: '',
    username: '',
    showPassword: false
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const { id } = router.query

  const { login, isLoading, isLogin, username } = useAuth()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = event => {
    event.preventDefault()
    login(values.username, values.password)
  }

  useEffect(() => {
    if (isLogin) {
      router.push('/')

      return null
    }
  }, [router, isLogin])

  useEffect(() => {
    const fetchLoggedUserByID = async () => {
      if (!id) return

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      const params = new URLSearchParams()
      params.append('SalonID', id)

      setIsloadingLoggedUser(true)
      try {
        const response = await axios.post(`../../../../backend/api/get_saloninfo.php`, params, requestData)
        const data = await response.data
        if (data.length > 0 && data[0].SalonName) {
          setLoggedName(data[0].SalonName)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsloadingLoggedUser(false)
      }
    }

    fetchLoggedUserByID()
  }, [id])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {isLoadingLoggedUser ? 'Loading...' : loggedName ? loggedName : 'SAFARITECH'}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textTransform: 'capitalize' }}>
              Welcome to {isLoadingLoggedUser ? 'Loading...' : loggedName ? loggedName : 'SAFARITECH'}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              id='username'
              label='Username'
              onChange={handleChange('username')}
              value={values.username}
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            ></Box>
            <Button type='submit' fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }}>
              {isLoading ? 'Processing...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
