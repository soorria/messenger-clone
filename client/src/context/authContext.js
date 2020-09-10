import React, { createContext, useCallback, useContext, useEffect } from 'react'
import api from '../api'
import useLocalStorage from '../utils/useLocalStorage'
import { useToast } from '@chakra-ui/core'
import checkNetworkError from '../utils/checkNetworkError'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser, clearUser] = useLocalStorage('msg:user', null)
  const [token, setToken, clearToken] = useLocalStorage('msg:token', '')
  const toast = useToast()

  const refetch = useCallback(async () => {
    try {
      const res = await api.get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      setUser(res?.data?.user)
    } catch (err) {
      checkNetworkError(err, toast)
    }
  }, [setUser, toast, token])

  useEffect(() => {
    refetch()
  }, [refetch])

  const login = useCallback((username, password) => {
    return api.post('/login', { username, password })
  }, [])

  const logout = useCallback(async () => {
    await api.delete('/logout')
    refetch()
    clearUser()
    clearToken()
  }, [clearToken, clearUser, refetch])

  return (
    <AuthContext.Provider
      value={{ user, refetch, logout, login, setToken, token }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)
