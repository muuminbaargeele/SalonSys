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
import { Box, CardActions, IconButton, InputAdornment, TextField, useMediaQuery } from '@mui/material'
import Magnify from 'mdi-material-ui/Magnify'

import FetchOverviewTableData from 'src/hooks/FetchOverviewTableData'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import FetchSalonMangeData from 'src/hooks/FetchSalonMangeData'
import toast from 'react-hot-toast'
import axios from 'axios'

import MainAdminManage from 'src/@core/components/manage/MainAdminManage'
import SalonAdminManage from 'src/@core/components/manage/SalonAdminManage'
import MainManageModal from 'src/@core/components/modals/MainManageModal'
import SalonManageModal from 'src/@core/components/modals/SalonManageModal'
import { getCurrentDate } from 'src/utils/GetCurrentDate'
import { API_BASE_URL } from 'src/lib/apiConfig'

let columns = []

const ManageTable = props => {
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isSalonManageModalOpen, setIsSalonManageModalOpen] = useState(false)
  const [selectedSalon, setSelectSalon] = useState({
    SalonName: '',
    Address: '',
    Name: '',
    Phone: '',
    CreateDT: '',
    Amount: '',
    Remaining: '',
    ModalStatus: '',
    LastActivation: '',
    AdID: '',
    SalonID: '',
    SalonLink: '',
    CustomerLink: ''
  })
  const [selectedSalonEmployer, setSelectSalonEmployer] = useState({
    EmployerName: '',
    EmployerPhone: '',
    EmployerCreateDT: '',
    EmployerUserName: '',
    EmployerRole: '',
    EmployerShift: '',
    EmployerID: ''
  })
  const [inputValue, setInputValue] = useState('')
  const [salonEmployerInputValue, setSalonEmployerInputValue] = useState('')

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { fetchOverviewTable } = FetchOverviewTableData()
  const { values } = FetchLoggedUserInfo()
  const { salonManageData, setSalonManageData, mainManageDT, setMainManageDT, fetchSalonManageData } =
    FetchSalonMangeData()
  console.log(mainManageDT)

  if (values.role == 'MainAdmin') {
    // Main admin
    columns = [
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
        id: 'CreateDT',
        label: 'Create Date',
        minWidth: 100
      },
      {
        id: 'Amount',
        label: 'Amount',
        minWidth: 100
      },
      {
        id: 'remaining',
        label: 'remaining',
        minWidth: 100
      },
      {
        id: 'state',
        label: 'Status',
        minWidth: 100
      },
      { id: 'actions', label: 'Actions', minWidth: 100 }
    ]
  } else if (values.role == 'SalonAdmin') {
    // Salon admin
    columns = [
      { id: 'id', label: '#', minWidth: 50 },
      { id: 'salonname', label: ' Name', minWidth: 100 },
      {
        id: 'phone',
        label: 'phone no.',
        minWidth: 100
      },
      {
        id: 'CreateDT',
        label: 'Create Date',
        minWidth: 100
      },

      {
        id: 'state',
        label: 'Username',
        minWidth: 100
      },
      { id: 'actions', label: 'Role', minWidth: 100 },
      { id: 'actions2', label: 'Shift', minWidth: 100 },
      { id: 'actions3', label: 'actions', minWidth: 100 }
    ]
  } else {
    columns = []
  }

  useEffect(() => {
    fetchOverviewTable()
  }, [])

  const openModal = id => {
    setIsOpen(true)

    const findSelectedSalon = mainManageDT.find(salonAdmin => salonAdmin.AdID == id)

    setSelectSalon({
      SalonName: findSelectedSalon.SalonName,
      Address: findSelectedSalon.Address,
      Name: findSelectedSalon.Name,
      Phone: findSelectedSalon.Phone,
      CreateDT: findSelectedSalon.CreateDT,
      Amount: findSelectedSalon.Amount,
      Remaining: findSelectedSalon.Remaining,
      ModalStatus: findSelectedSalon.Status,
      LastActivation: findSelectedSalon.LastActivation,
      AdID: findSelectedSalon.AdID,
      SalonID: findSelectedSalon.SalonID,
      SalonLink: findSelectedSalon.SalonLink,
      CustomerLink: findSelectedSalon.CustomerLink
    })
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openSalonManageModal = id => {
    setIsSalonManageModalOpen(true)

    const findSelectedEmployer = salonManageData.find(employer => employer.AdID == id)

    setSelectSalonEmployer({
      EmployerName: findSelectedEmployer.Name,
      EmployerPhone: findSelectedEmployer.Phone,
      EmployerCreateDT: findSelectedEmployer.CreateDT,
      EmployerUserName: findSelectedEmployer.Username,
      EmployerRole: findSelectedEmployer.Role,
      EmployerShift: findSelectedEmployer.Shift,
      EmployerID: findSelectedEmployer.AdID
    })
  }

  const closeSalonManageModal = () => {
    setIsSalonManageModalOpen(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleModalChange = prop => event => {
    setSelectSalon(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSalonEmployerModalChange = prop => event => {
    setSelectSalonEmployer(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const updateSalonInfo = async event => {
    event.preventDefault()

    if (
      !selectedSalon.SalonName ||
      !selectedSalon.Address ||
      !selectedSalon.Name ||
      !selectedSalon.Phone ||
      !selectedSalon.Amount ||
      !selectedSalon.ModalStatus ||
      !selectedSalon.LastActivation
    )
      return toast.error('Fill all inputfields.')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currUsername = window.localStorage.getItem('username')

    const currentDate = getCurrentDate()

    const params = new URLSearchParams()
    params.append('AdID', selectedSalon.AdID)
    params.append('SalonID', selectedSalon.SalonID)
    params.append('SalonName', selectedSalon.SalonName)
    params.append('Address', selectedSalon.Address)
    params.append('Name', selectedSalon.Name)
    params.append('Phone', selectedSalon.Phone)
    params.append('Amount', selectedSalon.Amount)
    params.append('Status', selectedSalon.ModalStatus)
    params.append('LastActivation', selectedSalon.LastActivation)
    params.append('TodayDT', currentDate)
    params.append('Username', currUsername)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/update_manage.php`, params, requestData)
      const data = await response.data
      if (data) {
        fetchSalonManageData()
        closeModal()
        data == 'Success' ? toast.success(data) : toast.error(data)
        setSelectSalon({
          SalonName: '',
          Address: '',
          Name: '',
          Phone: '',
          Amount: '',
          Status: ''
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateSalonEmployerInfo = async event => {
    event.preventDefault()

    if (
      !selectedSalonEmployer.EmployerName ||
      !selectedSalonEmployer.EmployerPhone ||
      !selectedSalonEmployer.EmployerShift
    )
      return toast.error('Fill all inputfields.')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currUsername = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('AdID', selectedSalonEmployer.EmployerID)
    params.append('Username', currUsername)
    params.append('Name', selectedSalonEmployer.EmployerName)
    params.append('Phone', selectedSalonEmployer.EmployerPhone)
    params.append('Shift', selectedSalonEmployer.EmployerShift)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/update_manage.php`, params, requestData)
      const data = await response.data
      if (data) {
        fetchSalonManageData()
        closeSalonManageModal()
        data == 'Success' ? toast.success(data) : toast.error(data)
        setSelectSalonEmployer({
          EmployerName: '',
          EmployerPhone: '',
          EmployerCreateDT: '',
          EmployerUserName: '',
          EmployerRole: '',
          EmployerShift: ''
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSalon = async id => {
    const confirmToDelete = confirm('Are sure to delete, this will be deleted every where even database?')
    if (!confirmToDelete) return

    const currUsername = window.localStorage.getItem('username')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('SalonID', id)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/delete_salonadmin.php`, params, requestData)
      const data = await response.data
      if (data == 'Success') {
        toast.success(data)
        closeModal()
        fetchSalonManageData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteSalonEmployer = async id => {
    const confirmToDelete = confirm('Are sure to delete, this will be deleted every where even database?')
    if (!confirmToDelete) return

    const currUsername = window.localStorage.getItem('username')

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const params = new URLSearchParams()
    params.append('Username', currUsername)
    params.append('SalonUser', id)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/delete_salonadmin.php`, params, requestData)
      const data = await response.data
      console.log(data)
      if (data == 'Success') {
        toast.success(data)
        closeSalonManageModal()
        fetchSalonManageData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = event => {
    const searchValue = event.target.value
    setInputValue(searchValue)

    const filteredResults = mainManageDT.filter(el =>
      Object.values(el).some(
        value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )

    if (inputValue === '' || inputValue.length == 1) {
      fetchSalonManageData()
    } else {
      if (filteredResults.length <= 0) {
        fetchSalonManageData()
        toast.error('Not found')
      }
      setMainManageDT(filteredResults)
    }
  }

  const handleEmployerSearch = event => {
    const searchValue = event.target.value
    setSalonEmployerInputValue(searchValue)

    const filteredResults = salonManageData.filter(el =>
      Object.values(el).some(
        value => value && typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      )
    )

    if (salonEmployerInputValue === '' || salonEmployerInputValue.length == 1) {
      fetchSalonManageData()
    } else {
      if (filteredResults.length <= 0) {
        fetchSalonManageData()
        toast.error('Not found')
      }
      setSalonManageData(filteredResults)
    }
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
              onChange={values.role == 'MainAdmin' ? handleSearch : handleEmployerSearch}
              value={values.role == 'MainAdmin' ? inputValue : salonEmployerInputValue}
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
              {columns.map((column, index) => (
                <TableCell key={`${column.id} + ${index}`} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.role == 'MainAdmin'
              ? // Main admin
                Array.isArray(mainManageDT) &&
                mainManageDT.length > 0 &&
                mainManageDT.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return <MainAdminManage row={row} columns={columns} index={index} openModal={openModal} />
                })
              : values.role == 'SalonAdmin'
              ? // Salon admin
                Array.isArray(salonManageData) &&
                salonManageData.length > 0 &&
                salonManageData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  return (
                    <SalonAdminManage
                      row={row}
                      columns={columns}
                      index={index}
                      openSalonManageModal={openSalonManageModal}
                    />
                  )
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={values.role == 'MainAdmin' ? mainManageDT.length : salonManageData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <MainManageModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        selectedSalon={selectedSalon}
        handleModalChange={handleModalChange}
        updateSalonInfo={updateSalonInfo}
        deleteSalon={deleteSalon}
      />
      <SalonManageModal
        isSalonManageModalOpen={isSalonManageModalOpen}
        closeSalonManageModal={closeSalonManageModal}
        handleSalonEmployerModalChange={handleSalonEmployerModalChange}
        updateSalonEmployerInfo={updateSalonEmployerInfo}
        deleteSalonEmployer={deleteSalonEmployer}
        selectedSalonEmployer={selectedSalonEmployer}
      />
    </Paper>
  )
}

export default ManageTable
