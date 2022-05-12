import { Route, Routes } from 'react-router-dom';
import { Navbar } from "./components/global/Navbar.js";
import { Deck } from './pages/decks/Deck';
import { DeckList } from './pages/decks/DeckList';
import { Homepage } from "./pages/landing/Homepage.js";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { HowTo } from './pages/landing/HowTo.js';
import { Dashboard } from './pages/user/Dashboard.js';
import { Profile } from './pages/user/Profile.js';
import { IsPrivate } from './components/global/IsPrivate.js';
import { StartPage } from './pages/landing/StartPage.js';
import { FreePractice } from './pages/decks/FreePractice.js';

function App() {
  return (
    <div className="App">
    <ToastContainer position="bottom-right" closeOnClick/>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Homepage></Homepage>} />
      <Route path="/start" element={<IsPrivate><StartPage/></IsPrivate>} />
      <Route path="/decks" element={<IsPrivate><DeckList/></IsPrivate>} />
      <Route path="/decks/:deckId" element={<IsPrivate><Deck/></IsPrivate>} />
      <Route path="/free-practice" element={<IsPrivate><FreePractice/></IsPrivate>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/howto" element={<HowTo/>} />
      <Route path="/user/dashboard" element={<IsPrivate><Dashboard/></IsPrivate>} />
      <Route path="/user/profile" element={<IsPrivate><Profile /></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
