import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import PageOne from './pages/PageOne';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/page1" element={<PageOne />} />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
