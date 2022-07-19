import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState(false)
    const [isTabActive, setIsTabActive] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        setIsMenuActive(oldState => !oldState)
    }

    const setStyle = ({isActive}) => {
        return isActive ? styles['active-link'] : ''
    }

    const takeMeHome = () => {
        navigate('/')
    }

    return (
        <nav className={styles['navbar']}>
            <div onClick={takeMeHome}><h1 className={styles['brand-title']}>Photography World</h1></div>
            <a className={styles['toggle-button']} onClick={handleClick}>
                <span className={styles['bar']}></span>
                <span className={styles['bar']}></span>
                <span className={styles['bar']}></span>
            </a>
            <div className={`${styles['navbar-links']} ${isMenuActive ? styles['active'] : ''}`}>
                <ul>
                    <li><NavLink className={setStyle} to="/">Home</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}