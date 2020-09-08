// eslint-disable-next-line no-unused-vars
let doToast = true

export default function doNetworkErrorToast(toastFn, options) {
  if (!doToast) return
  toastFn({
    position: 'top',
    title: 'Server Down',
    description:
      'Looks like the server is down right now. Please try again later.',
    status: 'error',
    duration: 9000,
    isClosable: true,
    ...options,
  })
  doToast = false
  setTimeout(() => (doToast = true), 9000)
}
