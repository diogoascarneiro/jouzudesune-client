import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export const Homepage = ({children}) => {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    navigate("/decks");
  }
  
  return (
    <div>
     <div className="hero min-h-screen" style={{backgroundImage: "url(./img/sakura-hero.jpg)"}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Ready to learn some Japanese?</h1>
      <p className="mb-5">Jouzu desu ne! is an online flashcards app for learning Japanese words, based on the Anki Core 2k deck. The goal is to teach you the most essential words and Kanji in a fast and fun way. </p>
      <button className="btn btn-primary"><Link to="/signup">Let's get started!</Link></button>
    </div>
  </div>
</div>
      {children}
    </div>
  )
}
