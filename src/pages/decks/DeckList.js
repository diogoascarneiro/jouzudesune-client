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
   <div className="card bg-primary opacity-40 h-full w-full absolute top-0 left-0"></div>
   <div className="card-body items-center text-center justify-between text-black z-10">
    <h2 className="card-title">{deck.name}</h2>
    <p className="grow-0"><b>Difficulty:</b> {deck.difficulty}</p>
    <p className="grow-0"><b>Number of cards:</b> {deck.cards.length}</p>
    <p className="grow-0 w-full rounded-lg bg-secondary bg-opacity-70 px-2 py-2"><i>{deck.description}</i></p>
    
  </div>
  </Link>
    })}
    </div>
    </>
  )
}


/* 
return (
    <><h1>Decks</h1>
    <div className="flex flex-row">
    {deckList.map((deck) => {
      return <Link to={deck._id} key={deck._id} className="card w-52 h-80 m-4 shadow-xl" style={{backgroundImage: `url(.${deck.image})`, backgroundSize: "cover"}}>
   <div className="card bg-primary opacity-20 h-full w-full absolute top-0 left-0"></div>
   <div className="card-body items-center text-center justify-between text-black z-10">
    <h2 className="card-title rounded-lg bg-secondary bg-opacity-70 px-2 py-2 text-center">{deck.name}</h2>
    <p className="grow-0 w-full rounded-lg bg-secondary bg-opacity-70 px-2 py-2">{deck.description}</p>
    <p className="grow-0 w-full rounded-lg bg-secondary bg-opacity-70 px-2 py-2"><b>Difficulty:</b> {deck.difficulty}</p>
    <p className="grow-0 w-full rounded-lg bg-secondary bg-opacity-70 px-2 py-2"><b>Number of cards:</b> {deck.cards.length}</p>
  </div>
  </Link>
    })}
    </div>
    </>
  )
*/