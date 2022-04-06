import { Route, Routes } from 'react-router-dom';
import { Navbar } from "./components/global/Navbar.js";
import { Deck } from './pages/decks/Deck';
import { DeckList } from './pages/decks/DeckList';
import { Homepage } from "./pages/landing/Homepage.js";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <div className="App">
    <ToastContainer/>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Homepage></Homepage>} />
      <Route path="/decks" element={<DeckList/>} />
      <Route path="/decks/:deckId" element={<Deck/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
