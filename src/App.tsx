import './App.css'
import './font.css'
import { NavbarLayout } from './components/navBar/NavBar'
import { BasicModal } from './components/basicComponents/basicModal/BasicModal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './hooks/api/queryClient'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarLayout />
      <BasicModal />
    </QueryClientProvider>
  )
}