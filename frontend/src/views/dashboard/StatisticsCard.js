// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import HomeModern from 'mdi-material-ui/HomeModern'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import Import from 'mdi-material-ui/Import'
import History from 'mdi-material-ui/History'

import FetchOverviewData from 'src/hooks/FetchOverviewData'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'

const renderStats = () => {
  const { values } = FetchLoggedUserInfo()
  const { overview, isLoading } = FetchOverviewData()

  const salesData = [
    {
      stats: isLoading ? '...' : values.role == 'MainAdmin' ? overview.totalSalon : overview.TotalCustomers,
      title: values.role == 'MainAdmin' ? 'Total Salons' : 'Customers',
      color: 'primary',
      icon: <HomeModern sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: isLoading ? '...' : values.role == 'MainAdmin' ? overview.recentSalons : overview.RecentCustomers,
      title: values.role == 'MainAdmin' ? 'Recent Salons' : 'New Customers',
      color: 'success',
      icon: <History sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: isLoading ? '...' : values.role == 'MainAdmin' ? overview.totalRequests : overview.TotalSalonRequests,
      color: 'warning',
      title: 'requests',
      icon: <Import sx={{ fontSize: '1.75rem' }} />
    },
    {
      stats: `${
        isLoading ? '...' : values.role == 'MainAdmin' ? `$${overview.totalAmount}` : `$${overview.TotalPrice}`
      }`,
      color: 'info',
      title: values.role == 'MainAdmin' ? 'Total Amount' : ' Price',
      icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
    }
  ]

  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Overview'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
