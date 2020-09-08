import React from 'react'
import { Button, Heading, Grid, Link, Stack } from '@chakra-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import CentreCard from '../components/centreCard'
import { useAuth } from '../context/authContext'
import DarkModeToggle from '../components/darkModeToggle'

function NotFound() {
  const { user, logout } = useAuth()
  return (
    <>
      <CentreCard>
        <Stack spacing={6}>
          <Heading textAlign='center'>Looks like you're lost!</Heading>
          <Grid templateColumns='repeat(2, 1fr)' gap={6}>
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
          <Grid justifyContent='center'>
            <RouterLink to='/' component={Link}>
              Go Home
            </RouterLink>
          </Grid>
        </Stack>
      </CentreCard>
      <DarkModeToggle floating />
    </>
  )
}

export default NotFound
