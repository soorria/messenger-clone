import React from 'react'
import { theme } from '@chakra-ui/core'

export default {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "'Didact Gothic', sans-serif",
    body: 'arimo, sans-serif',
  },
  icons: {
    ...theme.icons,
    logout: {
      path: (
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          stroke='currentColor'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
          <polyline points='16 17 21 12 16 7'></polyline>
          <line x1='21' y1='12' x2='9' y2='12'></line>
        </svg>
      ),
    },
    home: {
      path: (
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          stroke='currentColor'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
          <polyline points='9 22 9 12 15 12 15 22'></polyline>
        </svg>
      ),
    },
    send: {
      path: (
        <svg
          viewBox='0 0 24 24'
          width='24'
          height='24'
          stroke='currentColor'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='22' y1='2' x2='11' y2='13'></line>
          <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
        </svg>
      ),
    },
  },
}
