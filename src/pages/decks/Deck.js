import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDeck } from "../../api";

export const Deck = () => {
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    useEffect(() => {
        ( async () => {
          const response = await getDeck(deckId);
          setDeck(response.data);
          console.log(deck);
      })()
    }, []);

  return (
    <div>
        <p>{deck.name}</p>
        <ul>
            {deck.cards.map((card)=>{
                return <li key={card._id}>{card.questionWord}</li>
            })}
        </ul>
    </div>
  )
}