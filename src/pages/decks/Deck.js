import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDeck } from "../../api";
import { CardFront } from "../../components/cards/CardFront";
import { Loading } from "../../components/global/Loading";

export const Deck = () => {
    const [deck, setDeck] = useState();
    const {deckId} = useParams();

    useEffect(() => {
        ( async () => {
          const response = await getDeck(deckId);
          setDeck(response.data);
          console.log(deck);
      })()
    }, []);

    if (!deck) return <Loading/>
  return (
    <div>
        <p>{deck.name}</p>
        <ul>
            {deck.cards.map((card)=>{
                return <CardFront id={card._id}/> 
            })}
        </ul>
    </div>
  )
}