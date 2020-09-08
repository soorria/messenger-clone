import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/core'

const InputField = React.forwardRef(
  ({ label, name, error, isRequired, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        <FormLabel htmlFor={name}>{label || name}</FormLabel>
        <Input id={name} name={name} placeholder={name} ref={ref} {...props} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default InputField
