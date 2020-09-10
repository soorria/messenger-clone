import React, { useState } from 'react'
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Select,
  FormLabel,
  Box,
  FormControl,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/core'
import InputField from './InputField'
import { useForm } from 'react-hook-form'
import { useChat } from '../context/chatContext'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import produce from 'immer'

function CreateChatButton() {
  const { handleSubmit, register, setValue, getValues } = useForm()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose: setClose } = useDisclosure()
  const { users: usersObj, createChat } = useChat()
  const [members, setMembers] = useState([])

  useEffect(() => {
    setValue('members', members)
  }, [members, setValue])

  const onSubmit = handleSubmit(e => {
    createChat(e.name, e.members.concat(user))
  })

  const onSelectMember = e => {
    const userId = e.target.value

    if (members.find(m => m._id === userId)) return

    setMembers(m =>
      produce(m, draft => {
        draft.push(usersObj[userId])
      })
    )

    e.target.value = ''
  }

  const onUnselectMember = id => {
    setMembers(prev => prev.filter(m => m._id !== id))
  }

  const onClose = e => {
    setMembers([])
    setClose()
  }

  const users = Object.values(usersObj).filter(
    u => u._id !== user._id && !members.find(m => m._id === u._id)
  )

  return (
    <>
      <Button
        variant='solid'
        p={6}
        mx={4}
        my={4}
        variantColor='green'
        fontSize='lg'
        leftIcon='chat'
        onClick={onOpen}
      >
        Create a new chat
      </Button>

      <Modal preserveScrollBarGap isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={onSubmit} borderRadius='lg'>
          <ModalHeader>Create a new Chat</ModalHeader>

          <ModalBody>
            <InputField
              ref={register}
              label='Chat name'
              type='text'
              name='name'
              isRequired
            />

            <FormControl isRequired mt={6}>
              <FormLabel>Chat Members</FormLabel>
              <Box mb={members.length ? 2 : 0}>
                {Array.from(members).map(m => (
                  <Tag rounded='full' mr={2} key={m._id}>
                    <TagLabel>{m.name || m.username}</TagLabel>
                    <TagCloseButton onClick={() => onUnselectMember(m._id)} />
                  </Tag>
                ))}
              </Box>
              <Select
                ref={register({
                  required: true,
                  name: 'members',
                })}
                name='members'
                onChange={onSelectMember}
                required
                defaultValue=''
              >
                <option value='' disabled>
                  Choose at least one member.
                </option>
                {users.map(u => (
                  <option value={u._id} key={u._id}>
                    {u.name || u.username}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variantColor='green'
              variant='ghost'
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variantColor='green'
              isDisabled={!members.length || !getValues('name')}
              type='submit'
              onClick={onSubmit}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateChatButton
