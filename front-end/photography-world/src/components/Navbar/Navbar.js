import { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import { AuthContext } from "../../contexts/AuthContext"

export function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const handleClick = () => {
        setIsMenuActive(oldState => !oldState)
    }

    const setStyle = ({ isActive }) => {
        return isActive ? styles['active-link'] : ''
    }

    const takeMeHome = () => {
        navigate('/')
    }

    return (
        <nav className={styles['navbar']}>
            <div onClick={takeMeHome}><h1 className={styles['brand-title']}>Photography World</h1></div>
            <a href='#/' className={styles['toggle-button']} onClick={handleClick}>
                <span className={styles['bar']}></span>
                <span className={styles['bar']}></span>
                <span className={styles['bar']}></span>
            </a>
            <div className={`${styles['navbar-links']} ${isMenuActive ? styles['active'] : ''}`}>
                <ul>
                    <li><NavLink className={setStyle} to="/">Home</NavLink></li>
                    {!user.token && <li><NavLink className={setStyle} to="/register">Register</NavLink></li>}
                    {!user.token && <li><NavLink className={setStyle} to="/login">Login</NavLink></li>}
                    {user.token && <li><NavLink className={setStyle} to="/share">Share</NavLink></li>}
                    {user.token && <li><NavLink className={setStyle} to="/logout">Logout</NavLink></li>}
                    {user.token && <li><NavLink className={setStyle} to="/profile"><span className={styles['username']}>{user.user.username}</span></NavLink></li>}
                </ul>
            </div>
        </nav>
    )
}