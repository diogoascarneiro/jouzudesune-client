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
      return <Link to={deck._id}><p>{deck.name}</p></Link>
    })}
    </div>
  )
}
