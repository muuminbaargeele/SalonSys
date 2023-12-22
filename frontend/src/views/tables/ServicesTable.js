// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'

import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AccountEdit from 'mdi-material-ui/AccountEdit'
import {
  Box,
  CardActions,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'

import Typography from '@mui/material/Typography'

import Modal from 'react-modal'

import FetchServicesData from 'src/hooks/FetchServices'
import toast from 'react-hot-toast'
import axios from 'axios'
import { API_BASE_URL } from 'src/lib/apiConfig'

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

let columns = [
  { id: 'serviceId', label: '#', minWidth: 50 },
  { id: 'Title', label: 'Title', minWidth: 100 },
  {
    id: 'SubTitle',
    label: 'Sub Title',
    minWidth: 100
  },
  {
    id: 'CreateDT',
    label: 'Create Date',
    minWidth: 100
  },

  {
    id: 'Price',
    label: 'Price',
    minWidth: 100
  },
  { id: 'actions3', label: 'actions', minWidth: 100 }
]

const ManageTable = props => {
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isServiceModalOpen, setIsServiceModal] = useState(false)
  const [selectedService, setSelectedService] = useState({
    ServiceID: '',
    ServiceTitle: '',
    ServiceSubTitle: '',
    ServiceCreateDT: '',
    ServicePrice: ''
  })
  const [inputValue, setInputValue] = useState('')

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { fetchServicesData, services, setServices } = FetchServicesData()

  const closeModal = () => {
    setIsServiceModal(false)
  }

  const openModal = id => {
    setIsServiceModal(true)

    const findSelectedService = services.find(service => service.serviceId == id)
    setSelectedService({
      ServiceID: findSelectedService.serviceId,
      ServiceTitle: findSelectedService.Title,
      ServiceSubTitle: findSelectedService.SubTitle,
      ServiceCreateDT: findSelectedService.CreateDT,
      ServicePrice: findSelectedService.Price
    })
  }

  useEffect(() => {
    fetchServicesData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleServiceModalChange = prop => event => {
    setSelectedService(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const updateServiceInfo = async event => {
    event.preventDefault()

    if (!selectedService.ServiceTitle || !selectedService.ServiceSubTitle || !selectedService.ServicePrice)
      return toast.error('Fill all inputfields.')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currUsername = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('ServiceId', selectedService.ServiceID)
    params.append('Title', selectedService.ServiceTitle)
    params.append('SubTitle', selectedService.ServiceSubTitle)
    params.append('Price', selectedService.ServicePrice)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/update_services.php`, params, requestData)
      const data = await response.data
      if (data) {
        fetchServicesData()
        closeModal()
        data == 'Success' ? toast.success(data) : toast.error(data)
        setSelectedService({
          ServiceTitle: '',
          ServiceSubTitle: '',
          ServicePrice: '',
          ServiceCreateDT: '',
          ServiceID: ''
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteService = async id => {
    console.log('id', id)
    const confirmToDelete = confirm('Are sure to delete, this will be deleted every where even database?')
    if (!confirmToDelete) return

    const currUsername = window.localStorage.getItem('username')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('ServiceId', id)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/delete_service.php`, params, requestData)
      const data = await response.data
      if (data == 'Success') {
        toast.success(data)
        closeModal()
        fetchServicesData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = event => {
    const searchValue = event.target.value
    setInputValue(searchValue)

    const filteredResults = services.filter(el =>
      Object.values(el).some(
        value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )

    if (inputValue === '' || inputValue.length == 1) {
      fetchServicesData()
    } else {
      if (filteredResults.length <= 0) {
        fetchServicesData()
        toast.error('Not found')
      }
      setServices(filteredResults)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CardActions>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader title='Manage Services' titleTypographyProps={{ variant: 'h6' }} />
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {hidden ? (
              <IconButton
                color='inherit'
                onClick={toggleNavVisibility}
                sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
              >
                <Menu />
              </IconButton>
            ) : null}
            <TextField
              onChange={handleSearch}
              value={inputValue}
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>
      </CardActions>
      <Divider sx={{ margin: 0 }} />
      <TableContainer sx={{ maxHeight: 530 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align='left' sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align='left'>
                        {column.id === 'actions3' ? (
                          <>
                            {value}
                            <AccountEdit sx={{ cursor: 'pointer' }} size={3} onClick={() => openModal(row.serviceId)} />
                          </>
                        ) : (
                          value
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Service manage modal */}
      <ThemeProvider theme={theme}>
        <Modal
          isOpen={isServiceModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='servive Modal'
        >
          <CardContent>
            <form onSubmit={updateServiceInfo}>
              <Grid container spacing={4} sx={{ width: 900 }}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: 'black' }}>Upadte Service</Typography>
                    <Button onClick={closeModal}>Close</Button>
                  </Box>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Title'
                    value={selectedService.ServiceTitle}
                    onChange={handleServiceModalChange('ServiceTitle')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='SubTitle'
                    value={selectedService.ServiceSubTitle}
                    onChange={handleServiceModalChange('ServiceSubTitle')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={{ pointerEvents: 'none' }}
                    fullWidth
                    label='Create Date'
                    value={selectedService.ServiceCreateDT}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Price'
                    value={selectedService.ServicePrice}
                    onChange={handleServiceModalChange('ServicePrice')}
                  />
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
                      deleteService(selectedService.ServiceID)
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
      {/* Service manage modal */}
    </Paper>
  )
}

export default ManageTable
