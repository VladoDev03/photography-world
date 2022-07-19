import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Register } from './components/register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/' element={<>
                    <h1>Photography World</h1>
                </>}></Route>
                <Route path='register' element={<Register />}></Route>
                <Route path='login' element={<Login />}></Route>
            </Routes>
        </div>
    );
}

export default App;
