// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import { CardActions, CardHeader, Divider, InputAdornment, InputLabel, TextField } from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FetchOverviewTableData from 'src/hooks/FetchOverviewTableData'
import axios from 'axios'

const DashboardTable = props => {
  const { hidden, hiddenSm } = props

  const [inputValue, setInputValue] = useState('')
  const [actionValues, setActionValues] = useState({});


  const { values } = FetchLoggedUserInfo()

  const { fetchOverviewTable, rowsData, setRowsData } = FetchOverviewTableData()

  const updateRequest = async (reqid, status) => {
    const currUsername = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('ReqId', reqid)
    params.append('Status', status)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post(
        'https://salonsys.000webhostapp.com/backend/api/update_requests.php',
        params,
        requestData
      )
      const data = await response.data
      if (data == 'Success') {
        toast.success(data)
        fetchOverviewTable()
      } else {
        toast.error(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleActionChange = (event, id) => {
    const selectedValue = event.target.value;

    // Log the selected value for the clicked row
    console.log(`Row ID: ${id}, Selected Value: ${selectedValue}`);
    updateRequest(id, selectedValue)



    // Update the state for the specific row
    setActionValues((prevValues) => ({
      ...prevValues,
      [id]: selectedValue,
    }));
  };

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
          <CardHeader title='Requests' titleTypographyProps={{ variant: 'h6' }} />

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
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>SubTitle</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Que No.</TableCell>
              <TableCell>ArrivalTime</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData &&
              rowsData?.map((row, index) => (
                <TableRow
                  hover
                  key={`${row.id}-${index}`}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {row.CustomerName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.CustomerPhone}</TableCell>
                  <TableCell>{row.Title}</TableCell>
                  <TableCell>{row.SubTitle}</TableCell>
                  <TableCell>{row.Price}</TableCell>
                  <TableCell>{row.QueNO}</TableCell>
                  <TableCell>{row.ArrivalTime}</TableCell>
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
                  <Grid item xs={12} sm={6} sx={{ marginBottom: 3, marginTop: 3, marginRight: 3 }}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>Status</InputLabel>
                      <Select
                        id='form-layouts-separator-select'
                        labelId='form-layouts-separator-select-label'
                        value={actionValues[row.ReqId] || row.Status}  // Use actionValues[row.ReqId]
                        onChange={(event) => handleActionChange(event, row.ReqId)}
                      >
                        <MenuItem value='0'>Not Started</MenuItem>
                        <MenuItem value='1'>Progress</MenuItem>
                        <MenuItem value='2'>Done</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
