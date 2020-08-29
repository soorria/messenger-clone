import React from 'react'
import { useColorMode, IconButton, Box, Tooltip } from '@chakra-ui/core'

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box pos='fixed' bottom={8} left={8}>
      <Tooltip
        hasArrow
        label={`Use ${colorMode === 'light' ? 'dark' : 'light'} mode`}
      >
        <IconButton
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          isRound
          onClick={toggleColorMode}
        />
      </Tooltip>
    </Box>
  )
}

export default DarkModeToggle
