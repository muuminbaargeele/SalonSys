import axios from 'axios'
import { useState } from 'react'

const FetchServicesData = () => {
  const [rowsData, setRowsData] = useState([])
  const [servicesData, setServicesData] = useState([])

  const fetchServices = async () => {
    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currentLoggedUser = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('Username', currentLoggedUser)

    try {
      const response = await axios.post(
        'https://salonsys.000webhostapp.com/backend/api/get_services.php',
        params,
        requestData
      )
      const data = await response.data

      if (data) {
        setRowsData(data)
        setServicesData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { fetchServices, rowsData, setRowsData, servicesData, setServicesData }
}

export default FetchServicesData
