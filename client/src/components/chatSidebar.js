import React, { useState } from 'react'
import {
  Flex,
  Stack,
  Button,
  useColorMode,
  IconButton,
  Tooltip,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
} from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import { useChat } from '../context/chatContext'
import { useAuth } from '../context/authContext'
import DarkModeToggle from './darkModeToggle'
import CreateChatButton from './createChatButton'

const bg = { light: 'gray.300', dark: 'gray.700' }

function ChatSidebar({ selectedChat }) {
  const { colorMode } = useColorMode()
  const { chats: chatsObj } = useChat()
  const { logout } = useAuth()
  const [filter, setFilter] = useState('')

  let chats = Object.values(chatsObj)
  if (filter) {
    chats = chats.filter(c => c.name.toLowerCase().includes(filter))
  }

  return (
    <Flex maxHeight='100vh' direction='column' bg={bg[colorMode]}>
      <Flex align='center' justify='space-between' p={4}>
        <Text fontSize='2.5rem'>Chats</Text>
        <Stack isInline spacing={4}>
          <DarkModeToggle variant='ghost' variantColor='green' />
          <Tooltip hasArrow label='Logout'>
            <IconButton
              icon='logout'
              variantColor='green'
              variant='ghost'
              isRound
              onClick={logout}
            />
          </Tooltip>
        </Stack>
      </Flex>
      <InputGroup mx={4}>
        <Input
          value={filter}
          placeholder='search'
          onChange={e => setFilter(e.target.value)}
        />
        <InputRightElement>
          <Icon name='search' />
        </InputRightElement>
      </InputGroup>
      <Stack overflowY='auto' w='100%' p={4} flexGrow='1'>
        {chats.map(c => (
          <Button
            key={c._id}
            variant={c._id === selectedChat ? 'solid' : 'ghost'}
            p={6}
            variantColor='green'
            fontSize='lg'
            as={c._id === selectedChat ? 'button' : RouterLink}
            to={`/chat/${c._id}`}
          >
            {c.name}
          </Button>
        ))}
      </Stack>
      <CreateChatButton />
    </Flex>
  )
}

export default ChatSidebar
