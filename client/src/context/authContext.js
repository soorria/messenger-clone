import React, { createContext, useCallback, useContext, useEffect } from 'react'
import api from '../api'
import useLocalStorage from '../utils/useLocalStorage'
import { useToast } from '@chakra-ui/core'
import checkNetworkError from '../utils/checkNetworkError'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser, clearUser] = useLocalStorage('msg:user', null)
  const toast = useToast()

  const refetch = useCallback(async () => {
    try {
      const res = await api.get('/users/me')
      setUser(res?.data?.user)
    } catch (err) {
      checkNetworkError(err, toast)
    }
  }, [setUser, toast])

  useEffect(() => {
    refetch()
  }, [refetch])

  const logout = useCallback(async () => {
    await api.delete('/logout')
    refetch()
    clearUser()
  }, [clearUser, refetch])

  return (
    <AuthContext.Provider value={{ user, refetch, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
