import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_BASE_URL } from 'src/lib/apiConfig'
import { useLogo } from 'src/context/SalonLogoContext'

const FetchLoggedUserInfo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { SalonLogo, setSalonLogo } = useLogo()
  const [values, setValues] = useState({
    name: '',
    username: '',
    role: '',
    status: '',
    phone: '',
    salonName: '',
    salonAddress: '',
    SalonImage: ''
  })

  const fetchLoggedUser = async () => {
    console.log('hi')

    const params = new URLSearchParams()
    const currUsername = localStorage.getItem('username')
    params.append('Username', currUsername)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    if (values.salonName == null) return setIsLoading(true)
    try {
      const response = await axios.post(`../../../backend/api/get_admins.php`, params, requestData)
      const data = await response.data[0]

      const salonImage =
        data.SalonImage !== ''
          ? `../../../backend/logo_images/${data.SalonImage}`
          : '/images/avatars/default.jpg'

      setValues({
        name: data.Name || '',
        username: data.Username || '',
        phone: data.Phone || '',
        role: data.Role || '',
        status: data.Status || '',
        salonName: data.SalonName || '',
        salonAddress: data.Address || '',
        SalonImage: salonImage
      })

      setSalonLogo(salonImage)
      console.log(SalonLogo)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLoggedUser()
  }, [])

  return { values, setValues, isLoading, fetchLoggedUser }
}

export default FetchLoggedUserInfo
