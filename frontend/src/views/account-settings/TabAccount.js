// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'

import { useAuth } from 'src/context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import { API_BASE_URL } from 'src/lib/apiConfig'

// ** Icons Imports

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const TabAccount = () => {
  const { values, setValues, isLoading, fetchLoggedUser } = FetchLoggedUserInfo()

  // ** State
  const [imgSrc, setImgSrc] = useState(values.SalonImage ? values.SalonImage : '/images/avatars/default.jpg')

  useEffect(() => {
    if (values.SalonImage) {
      setImgSrc(values.SalonImage)
    } else {
      setImgSrc('/images/avatars/default.jpg')
    }
  }, [values.SalonImage])

  const { setIsLogin } = useAuth()

  // ** Hooks
  const router = useRouter()

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
        uploadImage()
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const logout = () => {
    localStorage.clear()
    setIsLogin(false)
    router.push('/login')
  }

  const updateLoggedUserInfo = async event => {
    event.preventDefault()

    if (values.role == 'MainAdmin') {
      if (!values.name || !values.username) return toast.error('Please fill inputFields.')
    } else if (values.role == 'SalonAdmin') {
      if (!values.name || !values.username || !values.phone || !values.salonAddress)
        return toast.error('Please fill inputFields.')
    } else {
      if (!values.name || !values.username || !values.phone) return toast.error('Please fill inputFields.')
    }

    const currUsername = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    if (values.role == 'MainAdmin') {
      params.append('Name', values.name)
      params.append('NewUsername', values.username)
    } else if (values.role == 'SalonAdmin') {
      params.append('Name', values.name)
      params.append('NewUsername', values.username)
      params.append('Phone', values.phone)
      params.append('Address', values.salonAddress)
    } else {
      params.append('Name', values.name)
      params.append('NewUsername', values.username)
      params.append('Phone', values.phone)
      params.append('Address', values.salonAddress)
    }

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/update_admins.php`, params, requestData)
      const data = await response.data
      if (data == 'Success') {
        toast.success(data)
      } else {
        toast.error(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()
    const fileInput = document.getElementById('account-settings-upload-image')

    if (fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0])
      formData.append('Username', values.username)
    }

    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/upload_logo_img.php`, formData, requestData)
      if (response) {
        fetchLoggedUser()
        console.log('called ')
        toast.success('Uploaded successfully')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CardContent>
      <form onSubmit={updateLoggedUserInfo}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src='/images/avatars/1.png' alt='Profile Pic' />
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
          {values.role == 'SalonAdmin' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Phone'
                value={isLoading ? 'Loading...' : values.phone}
                onChange={handleChange('phone')}
              />
            </Grid>
          )}
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
            <Divider sx={{ marginBottom: 0 }} />
          </Grid>

          {values.role == 'MainAdmin' ? null : (
            <>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Salon Info
                </Typography>
              </Grid>

              {/* For upload image  */}
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ImgStyled
                    src={imgSrc}
                    alt='image'
                    onError={() => {
                      setImgSrc('/images/avatars/default.jpg')
                    }}
                  />
                  <Box>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        onChange={onChange}
                        accept='image/png, image/jpeg'
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>
                    <Typography variant='body2' sx={{ marginTop: 5 }}>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              {/* For upload image */}

              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Salon Name'
                  value={isLoading ? 'Loading...' : values.salonName}
                  onChange={handleChange('salonName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: values.role == 'SalonUser' ? 'none' : 'auto' }}
                  fullWidth
                  label='Salon Address'
                  value={isLoading ? 'Loading...' : values.salonAddress}
                  onChange={handleChange('salonAddress')}
                />
              </Grid>
            </>
          )}

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
