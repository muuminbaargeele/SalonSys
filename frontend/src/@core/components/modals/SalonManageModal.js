// ** React Imports
import React from 'react'

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999999999
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

const SalonManageModal = ({
  isSalonManageModalOpen,
  closeSalonManageModal,
  handleSalonEmployerModalChange,
  updateSalonEmployerInfo,
  deleteSalonEmployer,
  selectedSalonEmployer
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal
        isOpen={isSalonManageModalOpen}
        onRequestClose={closeSalonManageModal}
        style={customStyles}
        contentLabel='Salon Modal'
      >
        <CardContent>
          <form onSubmit={updateSalonEmployerInfo}>
            <Grid container spacing={4} sx={{ width: 900 }}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ color: 'black' }}>Upadte Salon User</Typography>
                  <Button onClick={closeSalonManageModal}>Close</Button>
                </Box>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Name'
                  value={selectedSalonEmployer.EmployerName}
                  onChange={handleSalonEmployerModalChange('EmployerName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Phone No'
                  value={selectedSalonEmployer.EmployerPhone}
                  onChange={handleSalonEmployerModalChange('EmployerPhone')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Create Date'
                  value={selectedSalonEmployer.EmployerCreateDT}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Username'
                  style={{ pointerEvents: 'none' }}
                  value={selectedSalonEmployer.EmployerUserName}
                  onChange={handleSalonEmployerModalChange('EmployerUserName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Role'
                  value={selectedSalonEmployer.EmployerRole}
                  onChange={handleSalonEmployerModalChange('EmployerRole')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Shift</InputLabel>
                  <Select
                    label='Shift'
                    value={selectedSalonEmployer.EmployerShift}
                    onChange={handleSalonEmployerModalChange('EmployerShift')}
                    style={{ zIndex: 9999999999 }}
                    MenuProps={{ style: { zIndex: 9999999999 } }}
                  >
                    <MenuItem value='Day Shift'>Day Shift</MenuItem>
                    <MenuItem value='Night Shift'>Night Shift</MenuItem>
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
                    deleteSalonEmployer(selectedSalonEmployer.EmployerID)
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

export default SalonManageModal
