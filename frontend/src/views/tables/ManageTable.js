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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
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

import FetchOverviewTableData from 'src/hooks/FetchOverviewTableData'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import FetchSalonMangeData from 'src/hooks/FetchSalonMangeData'
import toast from 'react-hot-toast'
import axios from 'axios'

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

let columns = []

const ManageTable = props => {
  const { hidden, toggleNavVisibility } = props

  const [modalIsOpen, setIsOpen] = useState(false)
  const [selectedSalon, setSelectSalon] = useState({
    SalonName: '',
    Address: '',
    Name: '',
    Phone: '',
    CreateDT: '',
    Amount: '',
    Remaining: '',
    ModalStatus: '',
    LastActivation: '',
    AdID: '',
    SalonID: '',
    SalonLink: '',
    CustomerLink: ''
  })
  const [inputValue, setInputValue] = useState('')

  const openModal = id => {
    setIsOpen(true)

    const findSelectedSalon = mainManageDT.find(salonAdmin => salonAdmin.AdID == id)

    setSelectSalon({
      SalonName: findSelectedSalon.SalonName,
      Address: findSelectedSalon.Address,
      Name: findSelectedSalon.Name,
      Phone: findSelectedSalon.Phone,
      CreateDT: findSelectedSalon.CreateDT,
      Amount: findSelectedSalon.Amount,
      Remaining: findSelectedSalon.Remaining,
      ModalStatus: findSelectedSalon.Status,
      LastActivation: findSelectedSalon.LastActivation,
      AdID: findSelectedSalon.AdID,
      SalonID: findSelectedSalon.SalonID,
      SalonLink: findSelectedSalon.SalonLink,
      CustomerLink: findSelectedSalon.CustomerLink
    })
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const { fetchOverviewTable } = FetchOverviewTableData()
  const { values } = FetchLoggedUserInfo()
  const { salonManageData, mainManageDT, setMainManageDT, fetchSalonManageData } = FetchSalonMangeData()

  if (values.role == 'MainAdmin') {
    // Main admin
    columns = [
      { id: 'id', label: '#', minWidth: 50 },
      { id: 'salonname', label: 'Salon Name', minWidth: 100 },
      { id: 'address', label: 'Address', minWidth: 100 },
      {
        id: 'ownername',
        label: 'owner name',
        minWidth: 100
      },
      {
        id: 'phone',
        label: 'phone no.',
        minWidth: 100
      },
      {
        id: 'CreateDT',
        label: 'Create Date',
        minWidth: 100
      },
      {
        id: 'Amount',
        label: 'Amount',
        minWidth: 100
      },
      {
        id: 'remaining',
        label: 'remaining',
        minWidth: 100
      },
      {
        id: 'state',
        label: 'Status',
        minWidth: 100
      },
      { id: 'actions', label: 'Actions', minWidth: 100 }
    ]
  } else if (values.role == 'SalonAdmin') {
    // Salon admin
    columns = [
      { id: 'id', label: '#', minWidth: 50 },
      { id: 'salonname', label: ' Name', minWidth: 100 },
      {
        id: 'phone',
        label: 'phone no.',
        minWidth: 100
      },
      {
        id: 'CreateDT',
        label: 'Create Date',
        minWidth: 100
      },

      {
        id: 'state',
        label: 'Username',
        minWidth: 100
      },
      { id: 'actions', label: 'Role', minWidth: 100 },
      { id: 'actions2', label: 'Shift', minWidth: 100 },
      { id: 'actions3', label: 'actions', minWidth: 100 }
    ]
  } else {
    columns = []
  }

  useEffect(() => {
    fetchOverviewTable()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleModalChange = prop => event => {
    setSelectSalon(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const updateSalonInfo = async event => {
    event.preventDefault()

    if (
      !selectedSalon.SalonName ||
      !selectedSalon.Address ||
      !selectedSalon.Name ||
      !selectedSalon.Phone ||
      !selectedSalon.Amount ||
      !selectedSalon.ModalStatus ||
      !selectedSalon.LastActivation
    )
      return toast.error('Fill all inputfields.')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currUsername = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('AdID', selectedSalon.AdID)
    params.append('SalonID', selectedSalon.SalonID)
    params.append('SalonName', selectedSalon.SalonName)
    params.append('Address', selectedSalon.Address)
    params.append('Name', selectedSalon.Name)
    params.append('Phone', selectedSalon.Phone)
    params.append('Amount', selectedSalon.Amount)
    params.append('Status', selectedSalon.ModalStatus)
    params.append('LastActivation', selectedSalon.LastActivation)
    params.append('Username', currUsername)

    try {
      const response = await axios.post(
        'https://salonsys.000webhostapp.com/backend/api/update_manage.php',
        params,
        requestData
      )
      const data = await response.data
      if (data) {
        fetchSalonManageData()
        closeModal()
        data == 'Success' ? toast.success(data) : toast.error(data)
        setSelectSalon({
          SalonName: '',
          Address: '',
          Name: '',
          Phone: '',
          Amount: '',
          Status: ''
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSalon = async id => {
    const confirmToDelete = confirm('Are sure to delete, this will every where even database?')
    if (!confirmToDelete) return

    const currUsername = window.localStorage.getItem('username')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('SalonID', id)

    try {
      const response = await axios.post(
        'https://salonsys.000webhostapp.com/backend/api/delete_salonadmin.php',
        params,
        requestData
      )
      const data = await response.data
      if (data == 'Success') {
        toast.success(data)
        closeModal()
        fetchSalonManageData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = event => {
    const searchValue = event.target.value
    setInputValue(searchValue)

    const filteredResults = mainManageDT.filter(el =>
      Object.values(el).some(
        value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )

    if (inputValue === '' || inputValue.length == 1) {
      fetchSalonManageData()
    } else {
      if (filteredResults.length <= 0) {
        fetchSalonManageData()
        toast.error('Not found')
      }
      setMainManageDT(filteredResults)
    }
  }

  const copyToClipboard = inputId => {
    const inputElement = document.getElementById(inputId)

    if (inputElement) {
      inputElement.select()
      document.execCommand('copy')
      toast.success(`${inputId} copied to clipboard!`)
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CardActions>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <CardHeader title='Manage' titleTypographyProps={{ variant: 'h6' }} />
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
              {columns.map((column, index) => (
                <TableCell key={`${column.id} + ${index}`} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.role == 'MainAdmin'
              ? // Main admin
                mainManageDT.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map((column, index) => {
                        const value = row[column.id]

                        if (column.id === 'state') {
                          const textColor = row.Status === '1' ? 'green' : 'red'

                          return (
                            <React.Fragment key={`${index}-${column.id}`}>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.AdID}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.SalonName}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Address}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Name}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Phone}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.CreateDT}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {`$${row.Amount}`}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                <span style={{ color: row.Remaining >= 0 ? null : 'red', fontWeight: 600 }}>
                                  {row.Remaining >= 0 ? row.Remaining : 'Expaired'}
                                </span>
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                <span style={{ color: textColor, fontWeight: 600 }}>
                                  <span>{row.Status === '1' ? 'Active' : 'Inactive'}</span>
                                </span>
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                <AccountEdit
                                  sx={{ cursor: 'pointer' }}
                                  size={3}
                                  onClick={() => {
                                    openModal(row.AdID)
                                  }}
                                />
                              </TableCell>
                            </React.Fragment>
                          )
                        }
                      })}
                    </TableRow>
                  )
                })
              : values.role == 'SalonAdmin'
              ? // Salon admin
                salonManageData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map((column, index) => {
                        if (column.id === 'state') {
                          return (
                            <React.Fragment key={`${index}-${column.id}`}>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.AdID}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Name}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Phone}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.CreateDT}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Username}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Role}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                {row.Shift}
                              </TableCell>
                              <TableCell key={`${index}-${column.id}`} align={column.align}>
                                actions
                              </TableCell>
                            </React.Fragment>
                          )
                        }
                      })}
                    </TableRow>
                  )
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={values.role == 'MainAdmin' ? mainManageDT.length : salonManageData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ThemeProvider theme={theme}>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
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
    </Paper>
  )
}

export default ManageTable
