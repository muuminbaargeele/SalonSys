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
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { styled, useTheme } from '@mui/material/styles'

import axios from 'axios'
import toast from 'react-hot-toast'
import { getCurrentDate } from 'src/utils/GetCurrentDate'
import { API_BASE_URL } from 'src/lib/apiConfig'
import BookingModalForService from 'src/@core/components/modals/BookingModalForService'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 70,
  height: 70,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const LandingPage = () => {
  const router = useRouter()
  const { id } = router.query

  // ** State
  const [isLoading, setIsloading] = useState(false)
  const [services, setServices] = useState([])
  const [salonName, setSalonName] = useState('')
  const [imgSrc, setImgSrc] = useState('/images/avatars/default.jpg')

  // Hooks
  const theme = useTheme()

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
        const response = await axios.post(`${API_BASE_URL}/backend/api/get_saloninfo.php`, params, requestData)
        const data = await response.data

        setServices(data)
        if (data.length > 0 && data[0].SalonName) {
          setSalonName(data[0].SalonName)

          const salonImage =
            data.SalonImage !== ''
              ? `${API_BASE_URL}/backend/logo_images/${data[0].SalonImage}`
              : '/images/avatars/default.jpg'
          setImgSrc(salonImage)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
      }
    }

    fetchServices()
  }, [id])

  return (
    <Box className='' sx={{ marginBottom: 10, marginInline: 35, [theme.breakpoints.down('sm')]: { marginInline: 5 } }}>
      <Card sx={{ display: 'flex', alignItems: 'center', marginTop: 5, position: 'relative' }}>
        <ImgStyled
          src={imgSrc}
          alt='image'
          onError={() => {
            setImgSrc('/images/avatars/default.jpg')
          }}
        />
        <CardHeader
          sx={{ position: 'absolute', left: 70 }}
          title={isLoading ? 'Loading...' : salonName}
          titleTypographyProps={{ variant: 'h6', color: 'primary' }}
        />
      </Card>

      {/* Our services */}
      <OurServices services={services} />
      {/* Our services */}
    </Box>
  )
}
LandingPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LandingPage

const OurServices = ({ services }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState({
    ServiceID: '',
    ServiceTitle: '',
    ServiceSubTitle: '',
    ServicePrice: ''
  })
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    customerPhone: ''
  })

  const handleChange = prop => event => {
    setCustomerInfo(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = id => {
    setIsOpen(true)

    const findSelectedService = services.find(service => service.serviceId == id)
    setSelectedService({
      ServiceID: findSelectedService.serviceId,
      ServiceTitle: findSelectedService.Title,
      ServiceSubTitle: findSelectedService.SubTitle,
      ServicePrice: findSelectedService.Price
    })
  }

  const makeAppointMent = async event => {
    event.preventDefault()

    if (!customerInfo.customerName || !customerInfo.customerPhone) return toast.error('Please fill all inputfields.')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currentDate = getCurrentDate()

    const params = new URLSearchParams()
    params.append('CustomerName', customerInfo.customerName)
    params.append('CustomerPhone', customerInfo.customerPhone)
    params.append('CreateDT', currentDate)
    params.append('ServiceID', selectedService.ServiceID)
    params.append('selectedTitle', selectedService.ServiceTitle)
    params.append('selectedSubtitle', selectedService.ServiceSubTitle)
    params.append('Price', selectedService.ServicePrice)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/booking.php`, params, requestData)
      const data = await response.data
      if (data == 'Success') {
        toast.success(`Booked ${data}fully.`)
        setCustomerInfo({
          customerName: '',
          customerPhone: ''
        })
        closeModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container spacing={6} sx={{ marginTop: 5 }}>
      <Grid item xs={12} sx={{ paddingBottom: 1 }}>
        <Typography variant='h5' color='primary'>
          Our services
        </Typography>
      </Grid>

      {Array.isArray(services) &&
        services.length > 0 &&
        services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {!service.SalonImage || !service.Price || !service.SubTitle || !service.Price ? (
              <Typography variant='h6'>Sorry no services yet 😶😶</Typography>
            ) : (
              <Card>
                <CardMedia
                  sx={{ height: 300 }}
                  component='img'
                  alt={service.Title}
                  src={
                    service.ServiceImage !== ''
                      ? `${API_BASE_URL}/backend/service_images/${service.ServiceImage}`
                      : '/images/avatars/default.jpg'
                  }
                  onError={e => {
                    e.target.onerror = null // Remove the event listener to avoid recursion
                    e.target.src = '/images/avatars/default.jpg'
                  }}
                />

                <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
                  <Typography variant='h6' sx={{ marginBottom: 2 }}>
                    {service.Title}
                  </Typography>
                  <Typography sx={{ marginBottom: 2 }}>${service.Price}</Typography>
                  <Typography variant='body2'>{service.SubTitle}</Typography>
                </CardContent>
                <Button
                  variant='contained'
                  sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                  onClick={() => openModal(service.serviceId)}
                >
                  Select
                </Button>
              </Card>
            )}
          </Grid>
        ))}

      {/* Booking modal */}
      <BookingModalForService
        isOpen={isOpen}
        closeModal={closeModal}
        selectedService={selectedService}
        makeAppointMent={makeAppointMent}
        handleChange={handleChange}
        customerInfo={customerInfo}
      />
    </Grid>
  )
}
