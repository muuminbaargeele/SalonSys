import axios from 'axios'
import { useEffect, useState } from 'react'
import FetchLoggedUserInfo from './FetchLoggedUserInfo'

const FetchOverviewData = () => {
  const { values } = FetchLoggedUserInfo()

  const [isLoading, setIsLoading] = useState(false)
  const [overview, setOverview] = useState({
    // Main admin
    totalSalon: '',
    totalAmount: '',
    recentSalons: '',
    totalRequests: '',
    activeSalons: '',
    inActiveSalons: '',
    // Salon
    Pending: '',
    RecentCustomers: '',
    Services: '',
    TotalCustomers: '',
    TotalPrice: '',
    TotalSalonRequests: ''
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

      setIsLoading(true)
      try {
        const response = await axios.post(
          'https://salonsys.000webhostapp.com/backend/api/get_overview.php',
          params,
          requestData
        )
        let data
        if (values.role == 'MainAdmin') {
          // Main admin
          data = await response.data
          if (!data) return
          setOverview({
            totalSalon: data[0].TotalSalons,
            totalAmount: data[0].TotalAmount,
            recentSalons: data[1].RecentSalons,
            activeSalons: data[2].ActiveSalons,
            inActiveSalons: data[3].inActiveSalons,
            totalRequests: data[4].TotalRequests
          })
          console.log('sd', data)
        } else {
          // Salon
          data = await response.data[0]
          if (!data) return
          setOverview({
            Pending: data.Pending,
            RecentCustomers: data.RecentCustomers,
            Services: data.Services,
            TotalCustomers: data.TotalCustomers,
            TotalPrice: data.TotalPrice,
            TotalSalonRequests: data.TotalRequests
          })
        }
        console.log('role', values.role)
        console.log(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchOverviewData()
  }, [values])

  return { overview, isLoading }
}

export default FetchOverviewData
