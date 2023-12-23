// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import CalendarRange from 'mdi-material-ui/CalendarRange'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import ImageSearch from 'mdi-material-ui/ImageSearch'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'
import Modal from 'react-modal'
import {
  Button,
  CardActions,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  InputLabel,
  createTheme,
  ThemeProvider,
  TextField,
  IconButton,
  Menu
} from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import FetchOverviewTableData from 'src/hooks/FetchOverviewTableData'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import { API_BASE_URL } from 'src/lib/apiConfig'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 500,
  height: 500,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const customStyles2 = {
  content: {
    backgroundColor: 'transparent',
    border: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999999999,
  },
  overlay: {
    zIndex: 9999999998,
    backgroundColor: `rgb(0 0 0 / 0.25)`
  }
}

const primaryColor = '#1976D2'
const lightModeColor = primaryColor

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightModeColor
    }
  }
})

const DashboardTable = props => {
  const { hidden, hiddenSm } = props

  const [inputValue, setInputValue] = useState('')
  const [actionValues, setActionValues] = useState({})

  const [selectedRow, setSelectedRow] = useState(null)
  const [imgSrc, setImgSrc] = useState('/images/avatars/default.jpeg')
  const [isServiceImageModalOpen, setIsServiceImageModal] = useState(false)

  const { fetchOverviewTable, rowsData, setRowsData } = FetchOverviewTableData()

  const closeModal = () => {
    setIsServiceImageModal(false)
  }

  const openImageModal = img => {
    setIsServiceImageModal(true)
    const image =
      img !== '' ? `${API_BASE_URL}/backend/service_images/${img}` : '/images/avatars/default.jpeg'
    setImgSrc(image)
  }

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
      const response = await axios.post(`${API_BASE_URL}/backend/api/update_requests.php`, params, requestData)
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
    const selectedValue = event.target.value

    // Log the selected value for the clicked row
    console.log(`Row ID: ${id}, Selected Value: ${selectedValue}`)
    updateRequest(id, selectedValue)

    // Update the state for the specific row
    setActionValues(prevValues => ({
      ...prevValues,
      [id]: selectedValue
    }))
  }



  useEffect(() => {
    // Function to fetch data and update state
    const fetchData = async () => {
      try {
        await fetchOverviewTable();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval to fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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

  const handleDateTimeChange = async (newDate, reqId) => {
    if (!newDate) return

    const currentDate = newDate
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    const currentHour = currentDate.getHours()
    const currentMinute = currentDate.getMinutes()
    const currentSecond = currentDate.getSeconds()
    const TodayDT = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinute}:${currentSecond}`

    const currUsername = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('ReqId', reqId)
    params.append('ArrivalTime', TodayDT)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/set_arrivaltime.php`, params, requestData)
      const data = await response.data
      if (data == 'Success') {
        fetchOverviewTable()
        setSelectedRow(null)
        toast.success(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
                <TableCell>Category</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Service Image</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Que No.</TableCell>
                <TableCell>ArrivalTime</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rowsData) &&
                rowsData.length > 0 &&
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
                    <TableCell><ImageSearch sx={{ cursor: 'pointer', justifyContent: 'center', width: 100 }} size={3} onClick={() => openImageModal(row.ServiceImage)} /></TableCell>

                    <TableCell>{row.Price}</TableCell>
                    <TableCell>{row.QueNO}</TableCell>

                    <TableCell>
                      {row.ArrivalTime && (
                        <>
                          <span style={{ paddingRight: 10 }}>{row.ArrivalTime}</span>
                          <Button onClick={() => setSelectedRow(row)} variant='outlined'>
                            <CalendarRange />
                          </Button>
                        </>
                      )}

                      {!row.ArrivalTime && (
                        <Button onClick={() => setSelectedRow(row)} variant='outlined'>
                          <CalendarRange />
                        </Button>
                      )}
                    </TableCell>

                    {selectedRow && (
                      <Dialog open={!!selectedRow} onClose={() => setSelectedRow(null)}>
                        <DialogTitle>Select Date and Time</DialogTitle>
                        <DialogContent sx={{ height: 330, width: 500 }}>
                          <DateTimePickerComponent row={selectedRow} onChange={handleDateTimeChange} />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setSelectedRow(null)} color='primary'>
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    )}
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
                        <Select
                          sx={{ fontSize: 14 }}
                          id='form-layouts-separator-select'
                          labelId='form-layouts-separator-select-label'
                          value={actionValues[row.ReqId] || row.Status} // Use actionValues[row.ReqId]
                          onChange={event => handleActionChange(event, row.ReqId)}
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
      {/* Service image modal */}
      <ThemeProvider theme={theme}>
        <Modal
          isOpen={isServiceImageModalOpen}
          onRequestClose={closeModal}
          style={customStyles2}
          contentLabel='servive Modal'
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ImgStyled
              src={imgSrc}
              alt='image'
              onError={() => {
                setImgSrc('/images/avatars/default.jpg')
              }}
            />
          </Box>
        </Modal>
      </ThemeProvider>
      {/* Service image modal */}
    </>
  )
}

export default DashboardTable

const DateTimePickerComponent = ({ row, onChange }) => {
  const [date, setDate] = useState(new Date())

  const handleDateTimeChange = newDate => {
    setDate(newDate)
    onChange(newDate, row.ReqId)
  }

  return <DateTimePicker onChange={handleDateTimeChange} value={date} />
}
