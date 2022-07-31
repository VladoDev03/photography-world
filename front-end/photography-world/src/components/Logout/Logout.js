import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Logout() {
    const navigate = useNavigate()
    const { userLogout } = useContext(AuthContext)

    useEffect(() => {
        userLogout()
        navigate(-1)
    }, [])

    return null
}