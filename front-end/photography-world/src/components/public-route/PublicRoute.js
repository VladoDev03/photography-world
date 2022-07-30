import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

export function PublicRoute() {
    const { user } = useContext(AuthContext)

    if (user.token) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}