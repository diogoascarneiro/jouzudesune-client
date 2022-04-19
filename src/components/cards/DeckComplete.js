import { Link, useParams } from "react-router-dom"
import { UserContext } from "../../context/user.context";
import { useContext, useEffect } from "react";
import { updateUserDeckData } from "../../api";

export const DeckComplete = ({score}) => {
  const { user } = useContext(UserContext);
  const {deckId} = useParams();

  useEffect(() => {
    (async () => {
      await updateUserDeckData(user, { $push: 
        {decks: {
          id: deckId,
          timesPlayed: 1,
          highScore: 420
        }}
      });
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
