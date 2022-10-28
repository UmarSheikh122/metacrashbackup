import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth = ({ children }) => {
  const location = useLocation()
  const token=localStorage.getItem("token")
  if (!token) {
    return <Navigate to='/' /> 
  }
  return children
}