import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from '../../services/authService'
import * as registerValidation from '../../utils/validations/registerValidation'

export function Register() {
    const navigate = useNavigate()
    const { userLogin } = useContext(AuthContext)
    const [errors, setErrors] = useState({})

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

        authService.register(userData).then(data => userLogin(data))

        navigate('/login')
    }

    return (
        <>
        {/* {errors.usernameLength ? <span className='error-message'>Username must be at least 3 characters long</span> : ''} */}
        {/* {errors.passwordLength ? <span className='error-message'>Password must be at least 7 symbols long</span> : ''} */}
        {/* {errors.passwordUpper ? <span className='error-message'>Password must contain at least one upper case letter</span> : ''} */}
        {/* {errors.passwordLower ? <span className='error-message'>Password must contain at least one lower case letter</span> : ''} */}
        {/* {errors.passwordSymbol ? <span className='error-message'>Password must contain at least one symbol</span> : ''} */}
        {/* {errors.passwordNumber ? <span className='error-message'>Password must contain at least one digit</span> : ''} */}
        {/* {errors.passwordsMatch ? <span className='error-message'>Passwords must match</span> : ''} */}
        <div className='center'>
            <h1>Register</h1>
            <form method="post" onSubmit={submitHandler}>
                <div className='text-field'>
                    <input name="username" type="text" value={values.username} onChange={changeHandler} onBlur={usernameValidate} required />
                    <label htmlFor="username">Username</label>
                    <span></span>
                </div>
                <div className='text-field'>
                    <input name="password" type="password" value={values.password} onChange={changeHandler} onBlur={passwordValidate} required />
                    <label htmlFor="password">Password</label>
                    <span></span>
                </div>
                <div className='text-field'>
                    <input name="confirmPassword" type="password" value={values.confirmPassword} onChange={changeHandler} onBlur={confirmPasswordValidate} required />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <span></span>
                </div>
                <input type="submit" value="Register" />
                <div className='signup-link'>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
        </>
    )
}