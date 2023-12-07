// ** React Imports
import React from 'react'

// ** MUI Imports
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import AccountEdit from 'mdi-material-ui/AccountEdit'

const MainAdminManage = ({ row, columns, index, openModal }) => {
  return (
    <TableRow hover role='checkbox' tabIndex={-1} key={`${index}-${row.id}`}>
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
}

export default MainAdminManage
