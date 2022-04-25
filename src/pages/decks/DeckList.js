import { useState,  useEffect } from "react";
import { getAllDecks } from "../../api";
import { Link } from "react-router-dom";
export const DeckList = () => {

  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
   ( async () => {
     const response = await getAllDecks();
     setDeckList(response.data);
 })()
  }, []);

  return (
    <><h1>Decks</h1>
    <div className="flex flex-row">
    {deckList.map((deck) => {
      return <Link to={deck._id} key={deck._id} className="card w-60 h-96 m-4 opacity-90 shadow-xl" style={{backgroundImage: "url(./img/decks/default.jpg)"}}>
   <div className="card-body items-center text-center justify-between text-black">
    <h2 className="card-title">{deck.name}</h2>
    <p className="grow-0">{deck.description}</p>
    <p className="grow-0">Difficulty: {deck.difficulty}</p>
    <p className="grow-0">Number of cards: {deck.cards.length}</p>
  </div>
  </Link>
    })}
    </div>
    </>
  )
}
