import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { API_BASE_URL } from 'src/lib/apiConfig'

const FetchSalonMangeData = () => {
  const [salonManageData, setSalonManageData] = useState([])
  const [mainManageDT, setMainManageDT] = useState([])

  const fetchSalonManageData = async () => {
    const currentLoggedUsr = window.localStorage.getItem('username')
    const params = new URLSearchParams()
    params.append('Username', currentLoggedUsr)

    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/manage.php`, params, requestData)
      const data = await response.data
      if (data) {
        setSalonManageData(data)
        setMainManageDT(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchSalonManageData = async () => {
      const currentLoggedUsr = window.localStorage.getItem('username')
      const params = new URLSearchParams()
      params.append('Username', currentLoggedUsr)

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/backend/api/manage.php`, params, requestData)
        const data = await response.data
        if (data) {
          setSalonManageData(data)
          setMainManageDT(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSalonManageData()
  }, [])

  return { salonManageData, setSalonManageData, mainManageDT, setMainManageDT, fetchSalonManageData }
}

export default FetchSalonMangeData
