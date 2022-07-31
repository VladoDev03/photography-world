import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Register } from './components/register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { AddImage } from './components/add-image/AddImage';
import { Home } from './components/home/Home';
import { Logout } from './components/logout/Logout';
import { Profile } from './components/profile/Profile';
import { NotFound } from './components/not-found/NotFound';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import { PublicRoute } from './components/public-route/PublicRoute';
import { AuthProvider } from './contexts/AuthContext'
import { ConfirmDelete } from './components/confirm-delete/ConfirmDelete';

function App() {
    return (
        <AuthProvider>
            <div className='App'>
                <Navbar />
                <ConfirmDelete />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/*' element={<NotFound />}></Route>
                    <Route path='user/:id' element={<Profile />}></Route>
                    <Route element={<PublicRoute />}>
                        <Route path='register' element={<Register />}></Route>
                        <Route path='login' element={<Login />}></Route>
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='logout' element={<Logout />}></Route>
                        <Route path='add' element={<AddImage />}></Route>
                        <Route path='profile' element={<Profile />}></Route>
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
