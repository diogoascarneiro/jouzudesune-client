import { Link, useParams } from "react-router-dom"
import { UserContext } from "../../context/user.context";
import { useContext, useEffect } from "react";
import { getUserDeckData, updateUserDeckData } from "../../api";

export const DeckComplete = ({score}) => {
  const { user } = useContext(UserContext);
  const { deckId } = useParams();

  useEffect(() => {
    (async () => {
     const currentDeck = await getUserDeckData(user, deckId);
     const deckData = {deckId: deckId}; 
     if (!currentDeck) {
        deckData.timesPlayed = 1;
        deckData.highScore = score;
        await updateUserDeckData(user, deckId, deckData);
      } else {
        deckData.timesPlayed = currentDeck.data.timesPlayed + 1;        
        currentDeck.data.highScore > score ? deckData.highScore = currentDeck.data.highScore : deckData.highScore = score;
        await updateUserDeckData(user, deckId, deckData);
      }
    })();
  }, []);

  return (
    <div>
    <h1>You did it!</h1>
    <p><b>Your score was:</b> {score}</p>
    <Link className="btn btn-primary" to="/decks">Back to deck list</Link>
    </div>
  )
}
