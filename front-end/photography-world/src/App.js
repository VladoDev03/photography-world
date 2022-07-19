import './App.css';
import { LoadingSpinner } from './components/loading-spinner/LoadingSpinner';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Photography World</h1>
                <LoadingSpinner />
            </header>
        </div>
    );
}

export default App;
