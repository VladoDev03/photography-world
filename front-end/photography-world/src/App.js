import './App.css';
import { LoadingSpinner } from './components/loading-spinner/LoadingSpinner';
import { Image } from './components/image/Image';
import { Navbar } from './components/navbar/Navbar';
import { Register } from './components/register/Register';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/' element={<>
                    <h1>Photography World</h1>
                </>}></Route>
                <Route path='register' element={<Register />}></Route>
            </Routes>
        </div>
    );
}

export default App;
