import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { useContext, useEffect } from "react";
import { getUserDeckData, updateAllDeckCards, updateUserDeckData } from "../../api";

export const DeckComplete = ({ totalScore, cardScores, bestPossibleScore }) => {
  const { user } = useContext(UserContext);
  const { deckId } = useParams();

  const deckUpdater = async () => {
    const currentDeck = await getUserDeckData(user, deckId);
    const deckData = { deckId };
    if (!currentDeck.data) {
      deckData.timesPlayed = 1;
      deckData.highScore = totalScore;
      await updateUserDeckData(user, deckId, deckData);
    } else {
      deckData.timesPlayed = currentDeck.data.timesPlayed + 1;
      currentDeck.data.highScore > totalScore
        ? (deckData.highScore = currentDeck.data.highScore)
        : (deckData.highScore = totalScore);
      await updateUserDeckData(user, deckId, deckData);
    }
  }

  const cardUpdater = async () => {
    await updateAllDeckCards(user, cardScores);
  }

  useEffect(() => {
    (async () => {
     await deckUpdater();
     await cardUpdater();
    })();
  }, []);

  return (
    <div className="grid place-items-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={"/img/goku-thumbs-up.png"}
            alt="goku thumbs up"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">You did it!</h2>
          <p>
            <b>Your score was:</b> {totalScore} / {bestPossibleScore}
          </p>
          <div className="card-actions">
            <Link className="btn btn-primary" to="/decks">
              Back to deck list
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
