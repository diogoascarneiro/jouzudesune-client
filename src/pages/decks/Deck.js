import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDeck } from "../../api";
import { CardFront } from "../../components/cards/CardFront";
import { CardBack } from "../../components/cards/CardBack";
import { Loading } from "../../components/global/Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DeckComplete } from "../../components/cards/DeckComplete";

export const Deck = () => {
    const [deck, setDeck] = useState();
    const [currentCard, setCurrentCard] = useState(0);
    const [cardState, setCardState] = useState("front");
    const [cardQuestions, setCardQuestions] = useState({});
    const [score, setScore] = useState(0);

    const {deckId} = useParams();
    const navigate = useNavigate();

    // create an array of three possible answers for each card - two false, one correct
    const generateQuestions = (currentCard, deck) => {
       // Answer options for card meanings
        const correctMeaning = deck.cards[currentCard].wordMeanings;
        const possibleMeanings = deck.cards.filter((card) => card._id !==  deck.cards[currentCard]._id).map((card) => card.wordMeanings).slice(0, 2);
        possibleMeanings.push(correctMeaning);
        const shuffledMeanings = [...possibleMeanings].sort(() => 0.5 - Math.random());    
       
      // Answer options for hiragana


      setCardQuestions({meanings: shuffledMeanings, correctMeaning});
    }

    const moveToNextCard = () => {
      if (!(currentCard +1 >= deck.cards.length)) {
        setCurrentCard(currentCard + 1);
        setCardState("front");
        generateQuestions(currentCard + 1, deck) 
      } else {setCurrentCard(currentCard + 1);}
      
    }

    const showCardBack = () => {
      setCardState("back")
    }

    const trackScore = (cardScore) => {
      // each card can give you two points, one point is deducted each time you guess incorrectly
      setScore(score + cardScore);
    }

    useEffect(() => {
        ( async () => {
          const response = await getDeck(deckId);
          setDeck(response.data);
          generateQuestions(0, response.data);
      })()
    }, []);

    if (!deck) return <Loading/>

    if (currentCard >= deck.cards.length) return <DeckComplete score={score}/>

  return (
    <div>
        <h3 className="">{deck.name}</h3>
        <div className="grid place-items-center">
        {cardState === "front" ? 
        <CardFront id={deck.cards[currentCard]._id} showCardBack={showCardBack} cardQuestions={cardQuestions} trackScore={trackScore}/> :
        <CardBack id={deck.cards[currentCard]._id} moveToNextCard={moveToNextCard} score={score}/>}
        </div>
    </div>
  )
}
