import React from 'react'
import { Button, Heading, Grid } from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import CentreCard from '../components/centreCard'
import { useAuth } from '../context/authContext'

const Home = () => {
  const { user, logout } = useAuth()

  return (
    <CentreCard>
      <Heading textAlign='center' size='2xl'>
        {user ? `Hi, ${user.name || user.username}` : 'Not Messenger'}
      </Heading>
      <Heading as='h3' size='md' textAlign='center'>
        This page isn't done yet
      </Heading>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} mt={6}>
        {user ? (
          <>
            <Button variant='outline' variantColor='green' onClick={logout}>
              Logout
            </Button>
            <Button variantColor='green' to='/chat' as={RouterLink}>
              Message people
            </Button>
          </>
        ) : (
          <>
            <Button variantColor='green' to='/signup' as={RouterLink}>
              Sign Up
            </Button>
            <Button variantColor='green' to='/login' as={RouterLink}>
              Login
            </Button>
          </>
        )}
      </Grid>
    </CentreCard>
  )
}

export default Home
