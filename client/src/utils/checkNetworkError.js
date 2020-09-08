import doNetworkErrorToast from './doNetworkErrorToast'

export default function checkNetworkError(err, toastFn) {
  if (err.isAxiosError && err.message === 'Network Error') {
    doNetworkErrorToast(toastFn)
    return true
  }
  return false
}
