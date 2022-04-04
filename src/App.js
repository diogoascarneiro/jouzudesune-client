import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CardBack } from './components/cards/CardBack';
import { CardFront } from './components/cards/CardFront';
import { Navbar } from "./components/global/Navbar.js";
import { Deck } from './pages/decks/Deck';
import { DeckList } from './pages/decks/DeckList';
import { Homepage } from "./pages/landing/Homepage.js";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={<Homepage><CardFront/><CardBack/></Homepage>} />
      <Route path="/decks" element={<DeckList/>} />
      <Route path="/decks/:deckId" element={<Deck/>} />
      </Routes>
    </div>
  );
}

export default App;
