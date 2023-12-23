// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import { useEffect, useState } from 'react'
import { useLogo } from 'src/context/SalonLogoContext'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 50,
  height: 50,
  // marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()
  const { values, isLoading } = FetchLoggedUserInfo()

  const { SalonLogo, setSalonLogo } = useLogo()

  // Conditionally render the SlonAdmin image
  const renderSalonAdminImage = () => {
    if (values.role === 'SalonAdmin') {
      return (
        <ImgStyled
          // src={values.role === 'SalonAdmin' && values.SalonImage ? values.SalonImage : '/images/avatars/default.jpg'}
          src={values.role === 'SalonAdmin' && SalonLogo}
          alt='image'
          onError={e => {
            e.target.onerror = null // Remove the event listener to avoid recursion
            e.target.src = '/images/avatars/default.jpg'
          }}
        />
      )
    }
    return null
  }

  // Conditionally render the MainAdmin image
  const renderMainAdminImage = () => {
    if (values.role === 'MainAdmin') {
      return (
        <ImgStyled
          src={values.role === 'MainAdmin' && '/images/safari.png'}
          alt='image'
          onError={e => {
            e.target.onerror = null // Remove the event listener to avoid recursion
            e.target.src = '/images/safari.png'
          }}
        />
      )
    }
    return null
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            {/* Salon admin */}
            {renderSalonAdminImage()}

            {/* Main admin */}
            {renderMainAdminImage()}

            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {isLoading ? 'Loading...' : values.role == 'MainAdmin' ? 'SAFARITECH' : values.salonName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
