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

const Dashboard = () => {
  const isLogin = true;
  const router = useRouter()


  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent stats='14' icon={<CheckBold />} color='success' title='Active Salons' />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent stats='10' trend='negative' title='inActive Salons' icon={<Cancel />} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
