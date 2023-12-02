import axios from 'axios'
import { useEffect, useState } from 'react'

const FetchLoggedUserInfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    name: '',
    username: '',
    role: '',
    status: '',
    phone: '',
    salonName: '',
    salonAddress: ''
  })

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const params = new URLSearchParams()
      const currUsername = localStorage.getItem('username')
      params.append('Username', currUsername)

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      setIsLoading(true)
      try {
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/get_admins.php',
          params,
          requestData
        )
        const data = await response.data[0]
        setValues({
          name: data.Name || '',
          username: data.Username || '',
          phone: data.Phone || '',
          role: data.Role || '',
          status: data.Status || '',
          salonName: data.SalonName || '',
          salonAddress: data.Address || ''
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLoggedUser()
  }, [])

  return { values, setValues, isLoading }
}

export default FetchLoggedUserInfo
