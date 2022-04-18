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
    <div>
    <h1>Decks</h1>
    {deckList.map((deck) => {
      return <><Link to={deck._id}>
      <div className="card w-40 h-60 m-8 bg-neutral shadow-xl">
   <div className="card-body items-center text-center justify-between">
    <h2 className="card-title">{deck.name}</h2>
    <p className="grow-0">Perfect for testing!</p>
  </div>
</div>
      </Link></>
    
    })}
    </div>
  )
}
