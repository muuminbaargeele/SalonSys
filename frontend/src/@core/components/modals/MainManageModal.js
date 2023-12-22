// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Divider from '@mui/material/Divider'

import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Box, Grid, TextField, ThemeProvider, createTheme } from '@mui/material'

import Typography from '@mui/material/Typography'

import Modal from 'react-modal'
import toast from 'react-hot-toast'

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

const MainManageModal = ({ isOpen, closeModal, selectedSalon, handleModalChange, updateSalonInfo, deleteSalon }) => {
  const copyToClipboard = inputId => {
    const inputElement = document.getElementById(inputId)

    if (inputElement) {
      inputElement.select()
      document.execCommand('copy')
      toast.success(`${inputId} copied to clipboard!`)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Main Modal'>
        <CardContent>
          <form onSubmit={updateSalonInfo}>
            <Grid container spacing={3} sx={{ width: 900 }}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'black' }}>Upadte Salon</Typography>
                  <Button onClick={closeModal}>Close</Button>
                </Box>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='SalonName'
                  value={selectedSalon.SalonName}
                  onChange={handleModalChange('SalonName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Address'
                  value={selectedSalon.Address}
                  onChange={handleModalChange('Address')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='OwnerName'
                  value={selectedSalon.Name}
                  onChange={handleModalChange('Name')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone No'
                  value={selectedSalon.Phone}
                  onChange={handleModalChange('Phone')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='SalonLinkInput'
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Salon Link'
                  value={selectedSalon.SalonLink}
                />
                <Button onClick={() => copyToClipboard('SalonLinkInput')}>Copy Salon Link</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='CustomerLinkInput'
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Customer Link'
                  value={selectedSalon.CustomerLink}
                />
                <Button onClick={() => copyToClipboard('CustomerLinkInput')}>Copy Customer Link</Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='CreateDate'
                  value={selectedSalon.CreateDT}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Amount'
                  value={selectedSalon.Amount}
                  onChange={handleModalChange('Amount')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Remaining'
                  value={selectedSalon.Remaining < 0 ? 'Expaired' : selectedSalon.Remaining}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
                  <Select
                    label='Status'
                    value={selectedSalon.ModalStatus}
                    onChange={handleModalChange('ModalStatus')}
                    style={{ zIndex: 9999999999 }}
                    MenuProps={{ style: { zIndex: 9999999999 } }}
                  >
                    <MenuItem value='0'>Inactive</MenuItem>
                    <MenuItem value='1'>Active</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
                <Button
                  type='button'
                  variant='outlined'
                  color='error'
                  onClick={() => {
                    deleteSalon(selectedSalon.SalonID)
                  }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Modal>
    </ThemeProvider>
  )
}

export default MainManageModal
