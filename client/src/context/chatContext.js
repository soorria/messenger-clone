import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import io from 'socket.io-client'

import indexise from '../utils/indexise'
import api from '../api'
import { useCallback } from 'react'
import produce from 'immer'
import checkNetworkError from '../utils/checkNetworkError'
import { useToast, Link } from '@chakra-ui/core'
import doNetworkErrorToast from '../utils/doNetworkErrorToast'

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {
  const [chats, setChats] = useState({})
  const [users, setUsers] = useState({})
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const socket = useRef()

  useEffect(() => {
    async function fetchChats() {
      try {
        const { data } = await api.get('/chat', { params: { populate: true } })
        setChats(indexise(data.chats, '_id'))
      } catch (err) {}
      setLoading(false)
    }
    fetchChats()
  }, [])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data } = await api.get('/users')
        setUsers(indexise(data.users, '_id'))
      } catch (err) {
        checkNetworkError(err, toast)
      }
    }

    fetchUsers()

    const interval = setInterval(() => {
      fetchUsers()
    }, 1000 * 60)

    return () => {
      clearInterval(interval)
    }
  }, [toast])

  useEffect(() => {
    socket.current = io(process.env.API_URL || 'http://localhost:1234', {
      reconnectionAttempts: 10,
    })

    socket.current.on('connect', () => {
      console.log('connected to server')
    })

    socket.current.on('connect_error', () =>
      doNetworkErrorToast(toast, 'connect_error')
    )

    socket.current.on('disconnect', msg => {
      if (msg === 'io server disconnect') {
        toast({
          title: "You're not logged in",
          status: 'error',
          description: (
            <span>
              You're not logged in. Go{' '}
              <Link href={process.env.PUBLIC_URL + '/login'}>here</Link> to gin.
            </span>
          ),
          position: 'top',
          duration: 9000,
        })
      }
      console.log('disconnected from server')
    })

    socket.current.on('chat message', (chatId, newMessage) => {
      setChats(prev =>
        produce(prev, draft => {
          draft[chatId].messages.push(newMessage)
        })
      )
    })

    socket.current.on('create chat', chat => {
      setChats(prev =>
        produce(prev, draft => {
          draft[chat._id] = chat
        })
      )
    })

    socket.current.on('error', ({ message }) => {
      doNetworkErrorToast(toast, {
        title: 'Error sending message',
        description: message,
      })
    })

    return () => {
      socket.current.disconnect()
    }
  }, [chats, toast])

  const sendMessage = useCallback((chatId, message) => {
    if (!message) return
    socket.current.emit('chat message', { chatId, message })
  }, [])

  const createChat = useCallback((name, members) => {
    if (!name.length || members.length < 2) return
    socket.current.emit('create chat', { name, members })
  }, [])

  return (
    <ChatContext.Provider
      value={{ chats, users, sendMessage, loading, createChat }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider

export const useChat = () => useContext(ChatContext)
