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
      return <Link to={deck._id} key={deck._id} className="card w-52 h-80 m-4 shadow-xl" style={{backgroundImage: `url(.${deck.image})`, backgroundSize: "cover"}}>
   <div className="bg-primary opacity-60 h-full w-full absolute top-0 left-0"></div>
   <div className="card-body items-center text-center justify-between text-black z-10">
    <h2 className="card-title">{deck.name}</h2>
    <p className="grow-0">{deck.description}</p>
    <p className="grow-0"><b>Difficulty:</b> {deck.difficulty}</p>
    <p className="grow-0"><b>Number of cards:</b> {deck.cards.length}</p>
  </div>
  </Link>
    })}
    </div>
    </>
  )
}
