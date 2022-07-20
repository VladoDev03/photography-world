import { useState } from "react"
import { Link } from 'react-router-dom'
import styles from './Login.module.css'

export function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className={styles['center']}>
            <h1>Login</h1>
            <form method="post" onSubmit={submitHandler}>
                <div className={styles['text-field']}>
                    <input name="username" type="text" value={values.username} onChange={changeHandler} required />
                    <label htmlFor="username">Username</label>
                </div>
                <div className={styles['text-field']}>
                    <input name="password" type="password" value={values.password} onChange={changeHandler} required />
                    <label htmlFor="password">Password</label>
                </div>
                <input type="submit" value="Login" />
                <div className={styles['signup-link']}>
                    Not having an account? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}