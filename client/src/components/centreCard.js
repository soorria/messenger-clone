import React from 'react'
import { Box, useColorMode, Grid } from '@chakra-ui/core'

const bg = { light: 'gray.200', dark: 'gray.700' }

function CentreCard(props) {
  const { colorMode } = useColorMode()

  return (
    <Grid minH='100%' h='100%' alignContent='center'>
      <Box
        mx='auto'
        maxW='md'
        w='100%'
        p={8}
        bg={bg[colorMode]}
        borderRadius={8}
        {...props}
      >
        {props.children}
      </Box>
    </Grid>
  )
}

export default CentreCard
