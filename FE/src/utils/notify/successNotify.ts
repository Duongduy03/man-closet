import { toast } from "react-toastify"

export const commonSuccessToast = (message:string) => {
  return toast.success(`${message}`)
}
export const commonInfoToast = (message:string) => {
  return toast.info(`${message}`)
}
export const commonErrorToast = (message:string) => {
  return toast.error(`${message}`)
}
export const commonWarningToast = (message:string) => {
  return toast.warning(`${message}`)
}