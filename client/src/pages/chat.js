import React from 'react'
import { Heading } from '@chakra-ui/core'
import { useParams, useRouteMatch } from 'react-router'
import CentreCard from '../components/centreCard'

const Chat = () => {
  const { username } = useParams()
  const match = useRouteMatch('/chat/:username')
  return (
    <CentreCard>
      <Heading>{"This part isn't done yet. :("}</Heading>
      <p>
        username: {username}, {JSON.stringify(match)}
      </p>
    </CentreCard>
  )
}

export default Chat
