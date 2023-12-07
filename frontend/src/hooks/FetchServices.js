import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const FetchServicesData = () => {
  const [services, setServices] = useState([])

  const fetchServicesData = async () => {
    const currentLoggedUsr = window.localStorage.getItem('username')
    const params = new URLSearchParams()
    params.append('Username', currentLoggedUsr)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post(
        'https://salonsys.000webhostapp.com/backend/api/get_services.php',
        params,
        requestData
      )
      const data = await response.data
      if (data) {
        setServices(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchServicesData = async () => {
      const currentLoggedUsr = window.localStorage.getItem('username')
      const params = new URLSearchParams()
      params.append('Username', currentLoggedUsr)

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      try {
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/get_services.php',
          params,
          requestData
        )
        const data = await response.data
        if (data) {
          setServices(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchServicesData()
  }, [])

  return { services, setServices, fetchServicesData }
}

export default FetchServicesData
