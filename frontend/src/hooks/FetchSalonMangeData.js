import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const FetchSalonMangeData = () => {
  const [salonManageData, setSalonManageData] = useState([])
  const [mainManageDT, setMainManageDT] = useState([])

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
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/manage.php',
          params,
          requestData
        )
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

  return { salonManageData, mainManageDT }
}

export default FetchSalonMangeData
