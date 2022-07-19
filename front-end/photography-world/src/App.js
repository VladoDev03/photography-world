import './App.css';
import { LoadingSpinner } from './components/loading-spinner/LoadingSpinner';
import { Image } from './components/image/Image';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Photography World</h1>
                <LoadingSpinner />
                <Image src='https://www.vajracinema.com/movie-image/thor-love-and-thunder-1657089722.jpg' content='Thor Love and Thunder' />
            </header>
        </div>
    );
}

export default App;
