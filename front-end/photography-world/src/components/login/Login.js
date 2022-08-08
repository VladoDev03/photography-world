import { useState, useContext } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner'
import * as authService from '../../services/authService'

export function Login() {
    const [responseErrors, setResponseErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()
    const { userLogin } = useContext(AuthContext)

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
            password: values.password
        }

        setIsLoading(true)

        authService.login(userData)
            .then(data => {
                if (!data.message) {
                    userLogin(data)
                    setIsLoading(false)
                    navigate('/')
                } else {
                    setResponseErrors(oldErrors => ({
                        ...oldErrors,
                        ['existingUser']: data.message
                    }))
                }
            }).catch()
    }

    return (
        <div className='center'>
            {isLoading ? <div className='center-img'>
                <LoadingSpinner />
            </div> :
            <>
                <h1>Login</h1>
                <form method="post" onSubmit={submitHandler}>
                    <div className='text-field'>
                        <input name="username" type="text" value={values.username} onChange={changeHandler} required />
                        <label htmlFor="username">Username</label>
                        <span className="blue-underline"></span>
                    </div>
                    <div className='text-field'>
                        <input name="password" type="password" value={values.password} onChange={changeHandler} required />
                        <label htmlFor="password">Password</label>
                        <span className="blue-underline"></span>
                    </div>
                    <input type="submit" value="Login" />

                </form>
                <p className="error-message">{responseErrors.existingUser}</p>
                <div className='signup-link'>
                    Not having an account? <Link to="/register">Register</Link>
                </div>
            </>}
        </div>
    )
}