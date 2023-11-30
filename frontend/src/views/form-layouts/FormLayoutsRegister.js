// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import axios from 'axios'

const FormLayoutsSeparator = () => {
  const [values, setValues] = useState({
    ownerName: '',
    phone: '',
    role: '',
    amount: '',
    password: '',
    username: '',
    salonName: '',
    address: ''
  })

  const BASE_URL = 'https://salonsys.000webhostapp.com/backend/api'

  // Handle Change
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = async event => {
    event.preventDefault()

    // const currentDate = Date.()
    // console.log(currentDate)

    const params = new URLSearchParams()
    params.append('OwnerName', values.ownerName)
    params.append('Username', values.username)
    params.append('Phone', values.phone)
    params.append('Role', values.role)
    params.append('Amount', values.amount)
    params.append('Password', values.password)
    params.append('SalonName', values.salonName)
    params.append('Address', values.address)
    // params.append('Date')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post(`${BASE_URL}`, params, requestData)
      const data = await response.data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Register New User' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. User Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Owner Name'
                placeholder='cali'
                value={values.ownerName}
                onChange={handleChange('ownerName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Username'
                placeholder='cali'
                value={values.username}
                onChange={handleChange('username')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Phone No.'
                placeholder='061xxxxxxx'
                value={values.phone}
                onChange={handleChange('phone')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
                <Select
                  label='Role'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                  value={values.role}
                  onChange={handleChange('role')}
                >
                  <MenuItem value='SalonAdmin'>SalonAdmin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                fullWidth
                label='Amount'
                placeholder='00.00'
                value={values.amount}
                onChange={handleChange('amount')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-separator-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  onChange={handleChange('password')}
                  id='form-layouts-separator-password'
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
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Salon Info
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Salon Name'
                placeholder='UbaxSalon'
                value={values.salonName}
                onChange={handleChange('salonName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Address'
                placeholder='Taleex'
                value={values.address}
                onChange={handleChange('address')}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
