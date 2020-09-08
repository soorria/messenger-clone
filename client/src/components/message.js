import React from 'react'
import { Box, useColorMode, Tooltip } from '@chakra-ui/core'
import { format } from 'timeago.js'
import { useChat } from '../context/chatContext'

export function Message({ body, sender, date, isSender }) {
  const { colorMode } = useColorMode()
  const { users } = useChat()

  const senderProps = {
    ml: 'auto',
    bg: colorMode === 'light' ? 'green.200' : 'green.500',
    borderBottomRightRadius: 'md',
  }

  const otherMemberProps = {
    mr: 'auto',
    bg: colorMode === 'light' ? 'gray.200' : 'gray.500',
    borderBottomLeftRadius: 'md',
  }

  return (
    <Tooltip
      label={`by ${users[sender]?.name || users[sender]?.username} | ${format(
        date
      )}`}
      placement={isSender ? 'left' : 'right'}
      fontSize='md'
    >
      <Box
        my={2}
        maxW='400px'
        borderRadius='1rem'
        padding={4}
        {...(isSender ? senderProps : otherMemberProps)}
      >
        {body}
      </Box>
    </Tooltip>
  )
}
