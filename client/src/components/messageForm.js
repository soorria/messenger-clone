import React from 'react'
import { Flex, Input, Button } from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import { useChat } from '../context/chatContext'

function MessageForm({ chat }) {
  const { register, handleSubmit, setValue } = useForm()
  const { sendMessage } = useChat()

  const onSubmit = data => {
    setValue('message', '')
    sendMessage(chat, data.message)
  }

  return (
    <Flex as='form' onSubmit={handleSubmit(onSubmit)} minH='48px' m={4}>
      <Input
        ref={ref => {
          if (ref) {
            ref.setAttribute('autocomplete', 'off')
          }
          register(ref)
        }}
        name='message'
        placeholder='send a message'
        variantColor='green'
        variant='filled'
        h='100%'
        borderTopRightRadius='0'
        borderBottomRightRadius='0'
      />
      <Button
        type='submit'
        borderTopLeftRadius='0'
        borderBottomLeftRadius='0'
        rightIcon='send'
        variantColor='gray'
        h='100%'
      >
        Send
      </Button>
    </Flex>
  )
}

export default MessageForm
