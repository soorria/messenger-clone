import React from 'react'
import { Heading, Button, Flex, Link, Box, useToast } from '@chakra-ui/core'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import InputField from '../components/InputField'
import { useForm } from 'react-hook-form'
import api from '../api'
import sleep from '../utils/sleep'
import { useAuth } from '../context/authContext'
import CentreCard from '../components/centreCard'
import DarkModeToggle from '../components/darkModeToggle'
import checkNetworkError from '../utils/checkNetworkError'

function SignUp() {
  const { register, errors, formState, handleSubmit, setError } = useForm()
  const { user, refetch } = useAuth()
  const toast = useToast()

  const onSubmit = async data => {
    try {
      await sleep(1000)
      await api.post('/signup', data)
      refetch()
    } catch (err) {
      if (checkNetworkError(err, toast)) return
      const errMessage = err.response.data.message
      if (errMessage.includes('username')) {
        setError('username', {
          type: 'request',
          message: errMessage,
        })
      }
    }
  }

  if (user) return <Redirect to='/' />

  return (
    <>
      <CentreCard>
        <Heading textAlign='center'>Sign Up</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={6}>
            <InputField
              ref={register({ required: 'Username is required' })}
              label='Username'
              name='username'
              error={errors.username?.message}
              isRequired
            />
          </Box>
          <Box mt={6}>
            <InputField
              ref={register}
              label='Name'
              name='name'
              error={errors.name?.message}
            />
          </Box>
          <Box mt={6}>
            <InputField
              ref={register({ required: 'Password is required' })}
              label='Password'
              name='password'
              type='password'
              error={errors.password?.message}
              isRequired
            />
          </Box>
          <Flex mt={6} alignItems='center' justifyContent='space-between'>
            <Link to='/login' as={RouterLink}>
              Go to login
            </Link>
            <Button
              type='submit'
              isLoading={formState.isSubmitting}
              variantColor='green'
            >
              Sign Up
            </Button>
          </Flex>
        </form>
      </CentreCard>
      <DarkModeToggle floating />
    </>
  )
}

export default SignUp
