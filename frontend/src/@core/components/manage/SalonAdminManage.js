// ** React Imports
import React from 'react'

// ** MUI Imports
import TableCell from '@mui/material/TableCell'
import AccountEdit from 'mdi-material-ui/AccountEdit'
import TableRow from '@mui/material/TableRow'

const SalonAdminManage = ({ row, columns, index, openSalonManageModal }) => {
  return (
    <TableRow hover role='checkbox' tabIndex={-1} key={row.SalonID}>
      {columns.map((column, index) => {
        if (column.id === 'state') {
          return (
            <React.Fragment key={row.SalonID}>
              <TableCell align={column.align}>{row.AdID}</TableCell>
              <TableCell align={column.align}>{row.Name}</TableCell>
              <TableCell align={column.align}>{row.Phone}</TableCell>
              <TableCell align={column.align}>{row.CreateDT}</TableCell>
              <TableCell align={column.align}>{row.Username}</TableCell>
              <TableCell align={column.align}>{row.Role}</TableCell>
              <TableCell align={column.align}>{row.Shift}</TableCell>
              <TableCell align={column.align}>
                <AccountEdit sx={{ cursor: 'pointer' }} size={3} onClick={() => openSalonManageModal(row.AdID)} />
              </TableCell>
            </React.Fragment>
          )
        }
      })}
    </TableRow>
  )
}

export default SalonAdminManage
