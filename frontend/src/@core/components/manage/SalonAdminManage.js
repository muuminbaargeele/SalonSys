// ** React Imports
import React from 'react'

// ** MUI Imports
import TableCell from '@mui/material/TableCell'
import AccountEdit from 'mdi-material-ui/AccountEdit'

const SalonAdminManage = ({ row, columns, index, openSalonManageModal }) => {
  return (
    <TableRow hover role='checkbox' tabIndex={-1} key={`${index}-${row.id}`}>
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
