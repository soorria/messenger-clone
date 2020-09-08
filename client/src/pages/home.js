import React from 'react'
import { Button, Heading, Grid } from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'

import CentreCard from '../components/centreCard'
import { useAuth } from '../context/authContext'
import DarkModeToggle from '../components/darkModeToggle'

const Home = () => {
  const { user, logout } = useAuth()

  return (
    <>
      <CentreCard>
        <Heading textAlign='center' size='2xl'>
          {user ? (
            <>
              {'Hi, '}
              <em>{user.name || user.username}</em>
            </>
          ) : (
            'Not Messenger'
          )}
        </Heading>
        <Grid templateColumns='repeat(2, 1fr)' gap={6} mt={6}>
          {user ? (
            <>
              <Button variant='ghost' variantColor='green' onClick={logout}>
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
      <DarkModeToggle floating />
    </>
  )
}

export default Home
