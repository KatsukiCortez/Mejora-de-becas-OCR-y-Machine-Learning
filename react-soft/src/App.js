import logo from './logo.svg';
import './App.css';
import Login from './frontend/Login';
import Home from './frontend/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
      <body>
        <Login /> {/* Agrega el componente LoginForm aquí */}
        
      </body>
    </div>
  );
}

export default App;
