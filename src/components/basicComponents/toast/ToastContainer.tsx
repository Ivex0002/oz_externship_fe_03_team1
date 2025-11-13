import { createPortal } from 'react-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const GlobalToast = () => {
  return createPortal(
    <ToastContainer
      style={{ zIndex: 10000 }}
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />,
    document.body
  )
}
