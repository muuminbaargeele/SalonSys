// ** React Imports
import { useState } from 'react'

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

// ** Icons Imports
import Switch from '@mui/material/Switch'
import { Box, CardActions, Grid, IconButton, InputAdornment, TextField, useMediaQuery } from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'

const columns = [
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
    id: 'role',
    label: 'Role',
    minWidth: 100
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 100
  },
  { id: 'actions', label: 'Actions', minWidth: 100 }
]
function createData(id, salonname, address, ownername, phone, role, state) {
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
    role,
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
  createData(1, 'Ubax Beauty', 'Taleex', 'Cali Jaamac', '0612762726', 'SalonAdmin', '1'),
  createData(2, 'Ubax Beauty', 'Taleex', 'Cali Jaamac', '0612762726', 'SalonAdmin', '0'),
  createData(3, 'Ubax Beauty', 'Taleex', 'Cali Jaamac', '0612762726', 'SalonAdmin', '0')
]

const ManageTable = props => {
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id]

                    if (column.id === 'state') {
                      // Apply different colors based on the "state" value
                      const textColor = row.state === '1' ? 'green' : 'red'

                      return (
                        <TableCell key={column.id} align={column.align}>
                          <span style={{ color: textColor, fontWeight: 600 }}>
                            {row.state === '1' ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ManageTable
