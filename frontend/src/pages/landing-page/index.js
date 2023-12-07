// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import axios from 'axios'

const LandingPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [isLoading, setIsloading] = useState(false)
  const [services, setServices] = useState([])
  const [salonName, setSalonName] = useState('')
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedSubtitle, setSelectedSubtitle] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      if (!id) return

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      const params = new URLSearchParams()
      params.append('SalonID', id)

      setIsloading(true)
      try {
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/get_saloninfo.php',
          params,
          requestData
        )
        const data = await response.data
        setServices(data)
        if (data.length > 0 && data[0].SalonName) {
          setSalonName(data[0].SalonName)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
      }
    }

    fetchServices()
  }, [id])

  const makeAppointMent = async event => {
    event.preventDefault()
  }

  return (
    <Box className=''>
      <Card>
        <CardHeader
          title={isLoading ? 'Loading...' : salonName}
          titleTypographyProps={{ variant: 'h6', color: 'primary' }}
        />
      </Card>
      <Card sx={{ marginTop: 5 }}>
        <CardHeader title='Make appointment now' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />
        <form onSubmit={makeAppointMent}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  1. Appointment Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id={`form-layouts-separator-select-labe`}>Title</InputLabel>
                  <Select
                    label='Title'
                    id={`form-layouts-separator-select`}
                    labelId={`form-layouts-separator-select-label`}
                    value={selectedTitle}
                    onChange={e => setSelectedTitle(e.target.value)}
                  >
                    {services.map((item, index) => (
                      <MenuItem key={item.serviceId} value={item.Title}>
                        {item.Title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id={`form-layouts-separator-select-labe`}>SubTitle</InputLabel>
                  <Select
                    label='SubTitle'
                    id={`form-layouts-separator-select`}
                    labelId={`form-layouts-separator-select-label`}
                    value={selectedSubtitle}
                    onChange={e => setSelectedSubtitle(e.target.value)}
                  >
                    {services.map(item => (
                      <MenuItem key={item.serviceId} value={item.SubTitle}>
                        {item.SubTitle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
          </CardActions>
        </form>
      </Card>

      <FooterIllustrationsV1 />
    </Box>
  )
}
LandingPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LandingPage
