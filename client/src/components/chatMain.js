import React from 'react'
import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/core'
import { useChat } from '../context/chatContext'
import { useAuth } from '../context/authContext'
import { Message } from './message'
import { useRef } from 'react'
import { useEffect } from 'react'
import MessageForm from './messageForm'

function ChatMain({ selectedChat }) {
  const { user } = useAuth()
  const { chats } = useChat()
  const messagesRef = useRef()

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [chats, selectedChat])

  if (!selectedChat || !chats[selectedChat]) {
    return (
      <Grid alignItems='center' justifyContent='center'>
        <Flex align='center' textTransform='uppercase'>
          <Icon name='chevron-left' size='4rem' mr='1rem' />
          <Text as='span' fontSize='3rem'>
            Select a chat
          </Text>
        </Flex>
      </Grid>
    )
  }

  const messages = chats[selectedChat].messages || []

  return (
    <Flex direction='column' maxHeight='100vh'>
      <Box
        style={{ scrollBarWidth: 'none' }}
        ref={messagesRef}
        p={4}
        flexGrow='1'
        w='100%'
        overflowY='auto'
      >
        {messages.map(m => (
          <Message
            {...m}
            key={`${m.sender}-${m.date}`}
            isSender={m.sender === user._id}
          />
        ))}
      </Box>
      <MessageForm chat={selectedChat} />
    </Flex>
  )
}

export default ChatMain
