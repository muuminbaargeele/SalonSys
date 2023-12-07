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
