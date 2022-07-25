import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Register } from './components/register/Register';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Gallery } from './components/gallery/Gallery';
import { Image } from './components/image/Image';
import { AddImage } from './components/add-image/AddImage';

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
                <Route path='add' element={<AddImage />}></Route>
                <Route path='images' element={
                    <>
                        <h1>All Images</h1>
                        <Gallery>
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                            <Image src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" content="Cool looking tree" />
                        </Gallery>
                    </>
                }></Route>
            </Routes>
        </div>
    );
}

export default App;
