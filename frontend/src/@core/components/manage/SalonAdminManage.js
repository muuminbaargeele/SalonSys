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
