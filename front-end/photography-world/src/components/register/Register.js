import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService'

export function Register() {
    const navigate = useNavigate()
    const {userLogin} = useContext(AuthContext)

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

        let userData = {
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword
        }

        authService.register(userData).then(data => userLogin(data))

        navigate('/login')
    }

    return (
        <div className='center'>
            <h1>Register</h1>
            <form method="post" onSubmit={submitHandler}>
                <div className='text-field'>
                    <input name="username" type="text" value={values.username} onChange={changeHandler} required />
                    <label htmlFor="username">Username</label>
                </div>
                <div className='text-field'>
                    <input name="password" type="password" value={values.password} onChange={changeHandler} required />
                    <label htmlFor="password">Password</label>
                </div>
                <div className='text-field'>
                    <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={changeHandler} required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <input type="submit" value="Register" />
                <div className='signup-link'>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}