import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import * as authService from '../../services/authService'
import * as registerValidation from '../../utils/validations/registerValidation'

export function Register() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [responseErrors, setResponseErrors] = useState({})

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

    const usernameValidate = () => {
        const err = registerValidation.validateUsername(values.username)
        setErrors(oldErrors => ({
            ...oldErrors,
            ['usernameLength']: !err.usernameLength
        }))
    }

    const passwordValidate = () => {
        const err = registerValidation.validatePassword(values.password)
        setErrors(oldErrors => ({
            ...oldErrors,
            ['passwordLength']: !err.passwordLength,
            ['passwordUpper']: !err.passwordUpper,
            ['passwordLower']: !err.passwordLower,
            ['passwordSymbol']: !err.passwordSymbol,
            ['passwordNumber']: !err.passwordNumber,
            ['passwordsMatch']: values.password !== values.confirmPassword
        }))
    }

    const confirmPasswordValidate = () => {
        const err = registerValidation.validateConfirmPassword(values.password, values.confirmPassword)
        setErrors(oldErrors => ({
            ...oldErrors,
            ['passwordsMatch']: !err.passwordsMatch
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault()

        let userData = {
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword
        }

        authService.register(userData)
            .then(data => {
                if (!data.message) {
                    navigate('/login')
                }
                setResponseErrors(oldErrors => ({
                    ...oldErrors,
                    ['existingUser']: data.message
                }))
            })
    }

    return (
        <div className='center'>
            <h1>Register</h1>
            <form method="post" onSubmit={submitHandler}>
                <div className='text-field'>
                    <input name="username" type="text" value={values.username} onChange={changeHandler} onBlur={usernameValidate} required />
                    <label htmlFor="username">Username</label>
                    <span className="blue-underline"></span>
                </div>
                <div className='text-field'>
                    <input name="password" type="password" value={values.password} onChange={changeHandler} onBlur={passwordValidate} required />
                    <label htmlFor="password">Password</label>
                    <span className="blue-underline"></span>
                </div>
                <div className='text-field'>
                    <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={changeHandler} onBlur={confirmPasswordValidate} required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <span className="blue-underline"></span>
                </div>
                <input type="submit" value="Register" disabled={Object.values(errors).some(x => x)} />
            </form>
            <p className='error-message'>{errors.usernameLength ? 'Username must be at least 3 characters long' : ''}</p>
            <p className='error-message'>{errors.passwordLength ? 'Password must be at least 7 symbols long' : ''}</p>
            <p className='error-message'>{errors.passwordUpper ? 'Password must contain at least one upper case letter' : ''}</p>
            <p className='error-message'>{errors.passwordLower ? 'Password must contain at least one lower case letter' : ''}</p>
            <p className='error-message'>{errors.passwordSymbol ? 'Password must contain at least one symbol' : ''}</p>
            <p className='error-message'>{errors.passwordNumber ? 'Password must contain at least one digit' : ''}</p>
            <p className='error-message'>{errors.passwordsMatch ? 'Passwords must match' : ''}</p>
            <p className='error-message'>{responseErrors.existingUser}</p>
            <div className='signup-link'>
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}