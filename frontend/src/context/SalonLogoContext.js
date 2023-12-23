import { createContext, useContext, useState } from 'react'

const LogoContext = createContext(null)

export const LogoContextProvider = ({ children }) => {

    const [SalonLogo, setSalonLogo] = useState()

  const values = { SalonLogo, setSalonLogo, }

  return <LogoContext.Provider value={values}>{children}</LogoContext.Provider>
}

export const useLogo = () => {
  const context = useContext(LogoContext)
  if (context === null) {
    throw new Error('useLogo must be used within a LogoContextProvider')
  }
  return context
}
