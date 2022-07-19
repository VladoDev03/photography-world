import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import styles from './Register.module.css'

export function Register() {
    const navigate = useNavigate()

    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <div className={styles['center']}>
            <h1>Register</h1>
            <form method="post" onSubmit={submitHandler}>
                <div className={styles['text-field']}>
                    <input name="username" type="text" value={values.username} onChange={changeHandler} required />
                    <label htmlFor="username">Username</label>
                </div>
                <div className={styles['text-field']}>
                    <input name="password" type="password" value={values.password} onChange={changeHandler} required />
                    <label htmlFor="password">Password</label>
                </div>
                <div className={styles['text-field']}>
                    <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={changeHandler} required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <input type="submit" value="Register" />
                <div className={styles['signup-link']}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}