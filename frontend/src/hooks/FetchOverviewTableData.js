import axios from 'axios'
import { useState } from 'react'
import { API_BASE_URL } from 'src/lib/apiConfig'

const FetchOverviewTableData = () => {
  const [rowsData, setRowsData] = useState([])
  const [mainManageData, setMainManageData] = useState([])

  const fetchOverviewTable = async () => {
    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }

    const currentLoggedUser = window.localStorage.getItem('username')

    const params = new URLSearchParams()
    params.append('Username', currentLoggedUser)

    try {
      const response = await axios.post(`${API_BASE_URL}/backend/api/get_dashtable.php`, params, requestData)
      const data = await response.data

      if (data) {
        setRowsData(data)
        setMainManageData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { fetchOverviewTable, rowsData, setRowsData, mainManageData, setMainManageData }
}

export default FetchOverviewTableData
