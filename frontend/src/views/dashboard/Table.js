// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { CardActions, CardHeader, Divider, InputAdornment, TextField } from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FetchOverviewTableData from 'src/hooks/FetchOverviewTableData'

const DashboardTable = props => {
  const { hidden, hiddenSm } = props

  const [inputValue, setInputValue] = useState('')

  const { values } = FetchLoggedUserInfo()
  const { fetchOverviewTable, rowsData, setRowsData } = FetchOverviewTableData()

  useEffect(() => {
    fetchOverviewTable()
  }, [])

  const handleSearch = event => {
    const searchValue = event.target.value
    setInputValue(searchValue)

    const filteredResults = rowsData.filter(el =>
      Object.values(el).some(
        value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )

    if (inputValue === '' || inputValue.length == 1) {
      fetchOverviewTable()
    } else {
      if (filteredResults.length <= 0) {
        fetchOverviewTable()
        toast.error('Not found')
      }
      setRowsData(filteredResults)
    }
  }

  return (
    <Card>
      <CardActions sx={{ height: 60 }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <CardHeader
            title={values.role == 'MainAdmin' ? 'Salons' : 'Customers'}
            titleTypographyProps={{ variant: 'h6' }}
          />

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
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              {values.role == 'MainAdmin' ? (
                // Main Admin
                <MainAdminDashoardTableHead />
              ) : (
                // Salon Admin
                <SalonAdminDashbardTableHead />
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData &&
              Array.isArray(rowsData) &&
              rowsData.length > 0 &&
              rowsData?.map((row, index) => (
                <TableRow
                  hover
                  key={`${row.id}-${index}`}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  {values.role == 'MainAdmin' ? (
                    <MainAdminDashoardTable row={row} />
                  ) : (
                    <SalonAdminDashbardTable row={row} />
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable

const MainAdminDashoardTable = ({ row }) => {
  return (
    <>
      <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.SalonName}</Typography>
        </Box>
      </TableCell>
      <TableCell>{row.Name}</TableCell>
      <TableCell>{row.Address}</TableCell>
      <TableCell>{row.Phone}</TableCell>
      <TableCell>
        <Chip
          label={row.Status == 1 ? 'Active' : 'In Active'}
          color={row.Status == 1 ? 'success' : 'error'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      </TableCell>
      <TableCell>{`${row.Remaining} days`}</TableCell>
    </>
  )
}

const MainAdminDashoardTableHead = () => {
  return (
    <>
      <TableCell>Salon Name</TableCell>
      <TableCell>Owner Name</TableCell>
      <TableCell>Address</TableCell>
      <TableCell>Phone</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Remaining</TableCell>
    </>
  )
}

const SalonAdminDashbardTable = ({ row }) => {
  return (
    <>
      <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.CustomerName}</Typography>
        </Box>
      </TableCell>
      <TableCell>{row.CustomerPhone}</TableCell>
      <TableCell>{row.Title}</TableCell>
      <TableCell>{row.SubTitle}</TableCell>
      <TableCell>{row.Price}</TableCell>
      <TableCell>{row.QueNO}</TableCell>
      <TableCell>{!row.ArrivalTime ? 'Not started' : row.ArrivalTime}</TableCell>
      <TableCell>
        <Chip
          label={row.Status == 0 ? 'Not Started' : row.Status == 1 ? 'In Progress' : 'Done'}
          color={row.Status == 0 ? 'secondary' : row.Status == 1 ? 'info' : 'success'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      </TableCell>
    </>
  )
}

const SalonAdminDashbardTableHead = () => {
  return (
    <>
      <TableCell>Name</TableCell>
      <TableCell>Phone</TableCell>
      <TableCell>Title</TableCell>
      <TableCell>SubTitle</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Que No.</TableCell>
      <TableCell>ArrivalTime</TableCell>
      <TableCell>Status</TableCell>
    </>
  )
}
