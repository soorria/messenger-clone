import React, { createContext, useContext, useEffect } from 'react'
import api from '../api'
import useLocalStorage from '../utils/useLocalStorage'
import { useCallback } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser, clearUser] = useLocalStorage('msg:user', null)

  const refetch = useCallback(async () => {
    const res = await api.get('/users/me')
    console.log('refetch response', res)
    setUser(res?.data?.user)
  }, [setUser])

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

export const useAuth = () => {
  return useContext(AuthContext)
}
