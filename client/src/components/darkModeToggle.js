import React from 'react'
import { useColorMode, IconButton, Box, Tooltip } from '@chakra-ui/core'

const floatingStyles = {
  pos: 'fixed',
  bottom: 8,
  left: 8,
}

const DarkModeToggle = ({ floating, mr, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box {...(floating ? floatingStyles : {})} mr={mr}>
      <Tooltip hasArrow label='Toggle dark mode'>
        <IconButton
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          isRound
          variantColor='green'
          onClick={toggleColorMode}
          {...props}
        />
      </Tooltip>
    </Box>
  )
}

export default DarkModeToggle
