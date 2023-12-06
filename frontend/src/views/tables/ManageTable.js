// ** React Imports
import { useEffect, useState } from 'react'

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
import { styled } from '@mui/material/styles'

// ** Icons Imports
import Switch from '@mui/material/Switch'
import AccountEdit from 'mdi-material-ui/AccountEdit'
import { Box, CardActions, Grid, IconButton, InputAdornment, TextField, useMediaQuery } from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'

import Typography from '@mui/material/Typography'

import Modal from 'react-modal'

import FetchOverviewTableData from 'src/hooks/FetchOverviewTableData'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import FetchSalonMangeData from 'src/hooks/FetchSalonMangeData'

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

let columns = []

function createData(id, salonname, address, ownername, phone, CreateDT, Amount, remaining, state) {
  const handleRowClick = id => {
    // Do whatever you want with the selected ID (e.g., print it)
    console.log(`Selected Row ID: ${id}`)
  }

  return {
    id,
    salonname,
    address,
    ownername,
    phone,
    CreateDT,
    Amount,
    remaining,
    state,
    actions: (
      <Switch
        checked={state === '1'}
        onChange={() => {
          handleRowClick(id)
        }}
        color='primary'
      />
    )
  }
}

const rows = [
  createData(1, 'Ubax Beauty', 'Taleex', 'Cali Jaamac', '0612762726', '28/10/2023', '15$', '17 Days', '1'),
  createData(2, 'Ubax Beauty', 'Taleex', 'Cali Jaamac', '0612762726', '28/10/2023', '15$', 'Expaired', '0'),
  createData(3, 'Ubax Beauty', 'Taleex', 'Cali Jaamac', '0612762726', '28/10/2023', '15$', '17 Days', '0')
]

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
    Status: ''
  })

  const openModal = id => {
    setIsOpen(true)

    const findSelectedSalon = mainManageDT.find(salon => salon.SalonID == id)
    setSelectSalon({
      SalonName: findSelectedSalon.SalonName,
      Address: findSelectedSalon.Address,
      Name: findSelectedSalon.Name,
      Phone: findSelectedSalon.Phone,
      CreateDT: findSelectedSalon.CreateDT,
      Amount: findSelectedSalon.Amount,
      Remaining: findSelectedSalon.Remaining,
      Status: findSelectedSalon.Status
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
  const { salonManageData, mainManageDT } = FetchSalonMangeData()

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
      { id: 'actions', label: 'Shift', minWidth: 100 },
      { id: 'actions', label: 'actions', minWidth: 100 }
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
              onChange={() => {}}
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
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.role == 'MainAdmin'
              ? // Main admin
                mainManageDT.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id]

                        if (column.id === 'state') {
                          // Apply different colors based on the "state" value
                          const textColor = row.Status === '1' ? 'green' : 'red'

                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {row.AdID}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.SalonName}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Address}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Name}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Phone}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.CreateDT}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {`$${row.Amount}`}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                <span style={{ color: row.Remaining >= 0 ? null : 'red', fontWeight: 600 }}>
                                  {row.Remaining >= 0 ? row.Remaining : 'Expaired'}
                                </span>
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                <span style={{ color: textColor, fontWeight: 600 }}>
                                  <span>{row.Status === '1' ? 'Active' : 'Inactive'}</span>
                                </span>
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                <AccountEdit
                                  sx={{ cursor: 'pointer' }}
                                  size={3}
                                  onClick={() => {
                                    openModal(row.SalonID)
                                  }}
                                />
                              </TableCell>
                            </>
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
                      {columns.map(column => {
                        const value = row[column.id]

                        if (column.id === 'state') {
                          // Apply different colors based on the "state" value
                          const textColor = row.state === '1' ? 'danger' : 'red'

                          return (
                            <>
                              <TableCell key={column.id} align={column.align}>
                                {row.AdID}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Name}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Phone}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.CreateDT}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Username}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Role}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                {row.Shift}
                              </TableCell>
                              <TableCell key={column.id} align={column.align}>
                                actions
                              </TableCell>
                            </>
                          )
                        }

                        if (column.id === 'remaining') {
                          const expaired = row.remaining === 'Expaired'
                          // Apply different colors based on the "state" value
                          const textColor = expaired && 'red'
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
        <CardContent>
          <form>
            <Grid container spacing={7} sx={{ width: 900 }}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography>Upadte Salon</Typography>
                  <Button onClick={closeModal}>Close</Button>
                </Box>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='SalonName' value={selectedSalon.SalonName} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Address' value={selectedSalon.Address} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='OwnerName' value={selectedSalon.Name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Phone No' value={selectedSalon.Phone} />
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
                <TextField fullWidth label='Amount' value={selectedSalon.Amount} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={{ pointerEvents: 'none' }}
                  fullWidth
                  label='Remaining'
                  value={selectedSalon.Remaining}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='Status' value={selectedSalon.Status} />
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
                <Button type='reset' variant='outlined' color='error'>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Modal>
    </Paper>
  )
}

export default ManageTable
