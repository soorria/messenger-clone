import React from 'react'
import { Heading, Button, Flex, Link, Box, useToast } from '@chakra-ui/core'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import api from '../api'
import sleep from '../utils/sleep'
import CentreCard from '../components/centreCard'
import DarkModeToggle from '../components/darkModeToggle'
import InputField from '../components/InputField'
import { useAuth } from '../context/authContext'
import checkNetworkError from '../utils/checkNetworkError'

function Login() {
  const { register, errors, formState, handleSubmit, setError } = useForm()
  const { user, refetch, setToken } = useAuth()
  const toast = useToast()

  const onSubmit = async data => {
    try {
      await sleep(1000)
      const res = await api.post('/login', data)
      console.log(res)
      if (res?.data?.token) {
        setToken(res.data.token)
      }
      refetch()
    } catch (err) {
      if (checkNetworkError(err, toast)) return
      const errMessage = err.response.data.message
      setError('password', { type: 'request', message: errMessage })
    }
  }

  if (user) return <Redirect to='/' />

  return (
    <>
      <CentreCard>
        <Heading textAlign='center'>Login</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={6}>
            <InputField
              ref={register({ required: 'Username is required' })}
              label='Username'
              name='username'
              error={errors.username?.message}
            />
          </Box>
          <Box mt={6}>
            <InputField
              ref={register({ required: 'Password is required' })}
              label='Password'
              name='password'
              type='password'
              error={errors.password?.message}
            />
          </Box>
          <Flex mt={6} alignItems='center' justifyContent='space-between'>
            <Link to='/signup' as={RouterLink}>
              Go to sign up
            </Link>
            <Button
              type='submit'
              isLoading={formState.isSubmitting}
              variantColor='green'
            >
              Login
            </Button>
          </Flex>
        </form>
      </CentreCard>
      <DarkModeToggle floating />
    </>
  )
}

export default Login
