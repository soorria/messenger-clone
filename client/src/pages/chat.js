import React from 'react'
import { Grid, CircularProgress } from '@chakra-ui/core'
import { useParams, Redirect } from 'react-router'
import ChatSidebar from '../components/chatSidebar'
import { useAuth } from '../context/authContext'
import ChatMain from '../components/chatMain'
import { useChat } from '../context/chatContext'

function Chat() {
  const { chatId } = useParams()
  const { user } = useAuth()
  const { loading } = useChat()

  if (!user) return <Redirect to='/login' />

  if (loading)
    return (
      <Grid h='100%' alignItems='center' justifyContent='center'>
        <CircularProgress isIndeterminate color='green' />
      </Grid>
    )

  return (
    <>
      <Grid templateColumns='350px 1fr' h='100%'>
        <ChatSidebar selectedChat={chatId} />
        <ChatMain selectedChat={chatId} />
      </Grid>
    </>
  )
}

export default Chat
