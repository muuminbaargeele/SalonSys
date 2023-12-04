// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import CheckBold from 'mdi-material-ui/CheckBold'
import Cancel from 'mdi-material-ui/Cancel'

// ** Next Import
import { useRouter } from 'next/router'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { useEffect } from 'react'

import { useAuth } from 'src/context/AuthContext'
import FetchOverviewData from 'src/hooks/FetchOverviewData'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
// import BasicDateTimePicker from './../views/date-time-picker/DateTimePicker'

const Dashboard = () => {
  const { overview, isLoading } = FetchOverviewData()
  const { values } = FetchLoggedUserInfo()

  const { isLogin, username } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!isLogin) {
      router.push('/login')
      console.log(username)
    } else {
      console.log(username)
    }
  }, [router])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={isLoading ? '...' : values.role == 'MainAdmin' ? overview.activeSalons : overview.Services}
                icon={<CheckBold />}
                color='success'
                title={`${values.role == 'MainAdmin' ? 'Active Salons' : 'Services'}`}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={isLoading ? '...' : values.role == 'MainAdmin' ? overview.inActiveSalons : overview.Pending}
                trend='negative'
                title={`${values.role == 'MainAdmin' ? 'inActive Salons' : 'Pending'}`}
                icon={<Cancel />}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <BasicDateTimePicker />
        </Grid> */}
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
