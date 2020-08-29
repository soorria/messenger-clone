import React from 'react'
import { Heading, Button, Flex, Link, Box } from '@chakra-ui/core'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import InputField from '../components/InputField'
import CentreCard from '../components/centreCard'
import { useForm } from 'react-hook-form'
import api from '../api'
import sleep from '../utils/sleep'
import { useAuth } from '../context/authContext'

function Login() {
  const { register, errors, formState, handleSubmit, setError } = useForm()
  const { user, refetch } = useAuth()

  const onSubmit = async data => {
    try {
      await sleep(1000)
      console.log(await api.post('/login', data))
      refetch()
    } catch (err) {
      console.dir('caught', err)
      console.log(err.response?.data)
      const errMessage = err.response.data.message
      setError('password', { type: 'request', message: errMessage })
    }
  }

  if (user) return <Redirect to='/' />

  return (
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
  )
}

export default Login
