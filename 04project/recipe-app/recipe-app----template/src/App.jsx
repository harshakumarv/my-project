import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
function App() {
    return (
        <div className="App">
            <NavBar />
            <main className="main_container">
                <h1>App</h1>
                <Outlet />
            </main>
        </div>
    );
}

export default App;