import axios from 'axios'
import { useEffect, useState } from 'react'

const FetchOverviewData = () => {
  const [overview, setOverview] = useState({
    totalSalon: '',
    totalAmount: '',
    recentSalons: '',
    totalRequests: '',
    activeSalons: '',
    inActiveSalons: ''
  })

  useEffect(() => {
    const fetchOverviewData = async () => {
      const currentLoggedUser = window.localStorage.getItem('username')

      const params = new URLSearchParams()
      params.append('Username', currentLoggedUser)

      const requestData = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }

      try {
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/get_overview.php',
          params,
          requestData
        )
        const data = await response.data
        if (data) {
          setOverview({
            totalSalon: data[0].TotalSalons,
            totalAmount: data[0].TotalAmount,
            recentSalons: data[1].RecentSalons,
            activeSalons: data[2].ActiveSalons,
            inActiveSalons: data[3].inActiveSalons,
            totalRequests: data[4].TotalRequests
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchOverviewData()
  }, [])

  return { overview }
}

export default FetchOverviewData
