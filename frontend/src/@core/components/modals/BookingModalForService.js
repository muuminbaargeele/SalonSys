// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** React Imports
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Modal from 'react-modal'
import { createTheme, ThemeProvider } from '@mui/material'

import { TextField } from '@mui/material'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999999999,
    width: '90%',
    maxWidth: '1000px'
  },
  overlay: {
    zIndex: 9999999998,
    backgroundColor: `rgb(0 0 0 / 0.25)`
  }
}

const primaryColor = '#1976D2'
const lightModeColor = primaryColor

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightModeColor
    }
  }
})
const BookingModalForService = ({
  isOpen,
  closeModal,
  selectedService,
  makeAppointMent,
  handleChange,
  customerInfo
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Main Modal'>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <CardHeader title='Make appointment now' titleTypographyProps={{ variant: 'h6' }} />
            <Button onClick={closeModal}>Close</Button>
          </Box>
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
                  <TextField
                    fullWidth
                    type='text'
                    label='Name'
                    placeholder='name...'
                    value={customerInfo.customerName}
                    onChange={handleChange('customerName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='tel'
                    label='Phone No.'
                    placeholder='061xxxxxxx'
                    value={customerInfo.customerPhone}
                    onChange={handleChange('customerPhone')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Category'
                    value={selectedService.ServiceTitle}
                    style={{ pointerEvents: 'none' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Service'
                    value={selectedService.ServiceSubTitle}
                    style={{ pointerEvents: 'none' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Service price'
                    value={`$${selectedService.ServicePrice}`}
                    style={{ pointerEvents: 'none' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                Submit
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    </ThemeProvider>
  )
}

export default BookingModalForService
