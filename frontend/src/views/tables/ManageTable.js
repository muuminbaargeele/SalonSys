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
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import Pencil from 'mdi-material-ui/Pencil'

const columns = [
  { id: 'id', label: '#', minWidth: 50 },
  { id: 'salonname', label: 'Salon Name', minWidth: 100 },
  { id: 'address', label: 'Address', minWidth: 100 },
  {
    id: 'ownername',
    label: 'owner name',
    minWidth: 100,
  },
  {
    id: 'phone',
    label: 'phone no.',
    minWidth: 100,
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 100,
  },
  {
    id: 'state',
    label: 'State',
    minWidth: 100,
  },
  { id: 'actions', label: 'Actions', minWidth: 100 },
]
function createData(id, salonname, address, ownername, phone, role, state) {
  const handleRowClick = id => {
    // Do whatever you want with the selected ID (e.g., print it)
    console.log(`Selected Row ID: ${id}`);
  };
  return { id, salonname, address, ownername, phone, role, state, actions: <IconButton onClick={() => handleRowClick(id)} aria-label='expand row' size='small'><Pencil /></IconButton> }
}

const rows = [
  createData(1, 'Ubax Beauty', 'Taleex', "Cali Jaamac", "0612762726", "SalonAdmin", "1"),
  createData(2, 'Ubax Beauty', 'Taleex', "Cali Jaamac", "0612762726", "SalonAdmin", "0"),
]

const ManageTable = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CardHeader title='Manage' titleTypographyProps={{ variant: 'h6' }} />
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
                      const textColor = row.state === '1' ? 'green' : 'red';

                      return (
                        <TableCell key={column.id} align={column.align}>
                          <span style={{ color: textColor, fontWeight: 600 }}>
                            {row.state === '1' ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
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
