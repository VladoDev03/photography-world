import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Register } from './components/register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { AddImage } from './components/add-image/AddImage';
import { Home } from './components/home/Home';
import { AuthContext } from './contexts/AuthContext'
import { useState } from 'react';
import { Logout } from './components/Logout/Logout';

function App() {
    const [auth, setAuth] = useState({})

    const userLogout = () => {
        setAuth({})
    }

    const userLogin = (authData) => {
        setAuth(authData)
    }

    return (
        <AuthContext.Provider value={{user: auth, userLogin, userLogout}}>
            <div className='App'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='register' element={<Register />}></Route>
                    <Route path='login' element={<Login />}></Route>
                    <Route path='logout' element={<Logout />}></Route>
                    <Route path='add' element={<AddImage />}></Route>
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
