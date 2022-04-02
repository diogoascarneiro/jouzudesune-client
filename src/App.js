import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CardBack } from './components/cards/CardBack';
import { CardFront } from './components/cards/CardFront';
import { Navbar } from "./components/global/Navbar.js";
import { Homepage } from "./pages/landing/Homepage.js";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Homepage><CardFront/><CardBack/></Homepage>} />
      </Routes>
    </div>
  );
}

export default App;
