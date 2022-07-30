import { createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [auth, setAuth] = useLocalStorage('auth', {})

    const userLogout = () => {
        setAuth({})
    }

    const userLogin = (authData) => {
        setAuth(authData)
    }

    return (
        <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            {children}
        </AuthContext.Provider>
    )
}