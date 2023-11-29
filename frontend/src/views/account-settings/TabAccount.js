// ** React Imports
import { useState } from 'react'

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

  // ** Hooks
  const router = useRouter()
  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
  }

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ pointerEvents: 'none' }}
              fullWidth
              label='Name'
              placeholder='Mohamed Omer'
              defaultValue='Mohamed Omer'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ pointerEvents: 'none' }}
              fullWidth
              label='Username'
              defaultValue='mohamed_omer'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ pointerEvents: 'none' }}
              fullWidth
              label='Role'
              defaultValue='MainAdmin'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ pointerEvents: 'none' }}
              fullWidth
              label='Status'
              placeholder='Active'
              defaultValue='Active'
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={() => handleDropdownClose('/login')} >
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
