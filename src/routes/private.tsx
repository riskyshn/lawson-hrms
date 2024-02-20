import { useEffect } from 'react' // Import useEffect hook
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store'
import { useToast } from 'jobseeker-ui'

// @TODO
// a private middleware to handle is user authenticated is here

const Private = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (!user) {
      toast('Please log in to access this page', { color: 'primary' })
      navigate('/auth/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return user ? <Outlet /> : null
}

export default Private
