import { useState } from 'react'
import { useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    const currValue = localStorage.getItem(key)
    try {
      if (currValue != null) {
        return JSON.parse(currValue)
      }
    } catch (err) {
      return initialValue
    }
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  const clear = () => {
    setState(null)
    localStorage.removeItem(key)
  }

  return [state, setState, clear]
}

export default useLocalStorage
