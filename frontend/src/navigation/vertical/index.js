// ** Icon imports
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import FetchLoggedUserInfo from 'src/hooks/FetchLoggedUserInfo'
import Import from 'mdi-material-ui/Import'
import PlaylistPlus from 'mdi-material-ui/PlaylistPlus'

const navigation = () => {
  const { values } = FetchLoggedUserInfo()

  if (values.role == 'MainAdmin') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Pages'
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/register'
      },
      {
        title: 'Manage',
        icon: AccountGroupOutline,
        path: '/manage'
      }
    ]
  } else if (values.role == 'SalonAdmin') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Pages'
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/register'
      },
      {
        title: 'Manage',
        icon: AccountGroupOutline,
        path: '/manage'
      },
      {
        sectionTitle: 'Services'
      },
      {
        title: 'Requests',
        icon: Import,
        path: '/requests'
      },
      {
        title: 'Add Service',
        icon: PlaylistPlus,
        path: '/add-service'
      },
    ]
  } else {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Account Settings',
        icon: AccountCogOutline,
        path: '/account-settings'
      },
      {
        sectionTitle: 'Services'
      },
      {
        title: 'Requests',
        icon: Import,
        path: '/requests'
      },
      {
        title: 'Add Service',
        icon: PlaylistPlus,
        path: '/add-service'
      },
    ]
  }
}

export default navigation
