import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const {state} = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className="pages">
            <Routes>
              <Route 
                path="/" 
                element={ state.token? <Home /> : <Navigate to="/login" /> }
              />
              <Route 
                path="/login" 
                element={!state.token? <Login /> : <Navigate to="/" />} 
              />
              <Route 
                path="/signup" 
                element={!state.token? <Signup /> : <Navigate to="/" />} 
              />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
