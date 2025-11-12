import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const GlobalToast = () => (
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
    theme="light"
  />
)
