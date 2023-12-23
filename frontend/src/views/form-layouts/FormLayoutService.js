// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import toast from 'react-hot-toast'

import axios from 'axios'
import { API_BASE_URL } from 'src/lib/apiConfig'

import { getCurrentDate } from 'src/utils/GetCurrentDate'
import { Box } from '@mui/material'

const FormLayoutsSeparator = () => {
  const [values, setValues] = useState({
    Title: '',
    SubTitle: '',
    Price: ''
  })

  const [imgSrc, setImgSrc] = useState('')

  // Handle Change
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  // for service image
  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleAddService = async event => {
    event.preventDefault()

    const formData = new FormData()
    let fileInput = document.getElementById('account-settings-upload-image')
    if (fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0])
    }

    if (!values.Title || !values.SubTitle || !values.Price || !formData) return toast.error('Fill all inputfields.')

    const currUsername = window.localStorage.getItem('username')
    const currentDate = getCurrentDate()

    formData.append('Username', currUsername)
    formData.append('Title', values.Title)
    formData.append('SubTitle', values.SubTitle)
    formData.append('Price', values.Price)
    formData.append('CreateDT', currentDate)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/upload_service.php`, formData)
      const data = await response.data
      console.log(data)
      if (data == 'Success') {
        toast.success(data)
        setValues({
          Title: '',
          SubTitle: '',
          Price: ''
        })
        fileInput.value = ''
      } else {
        toast.error(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader title='Add New Service' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleAddService}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Category'
                placeholder='Category'
                value={values.Title}
                onChange={handleChange('Title')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Service'
                placeholder='Service'
                value={values.SubTitle}
                onChange={handleChange('SubTitle')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Price'
                placeholder='Price'
                type='Number'
                value={values.Price}
                onChange={handleChange('Price')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid rgba(128, 128, 128, 0.5)',
                  borderRadius: 6,
                  height: '100%',
                  padding: '0 14px'
                }}
              >
                <input
                  style={{
                    width: '100%' // Make the input fill the entire width of the parent div
                  }}
                  type='file'
                  onChange={onChange}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-image'
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Add
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
