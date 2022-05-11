import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { useContext, useEffect, useState } from "react";
import { getUser, getUserDeckData, updateAllDeckCards, updateUserDeckData } from "../../api";
import { CardTransition } from "../global/CardTransition";
import { Loading } from "../global/Loading";

export const DeckComplete = ({ totalScore, cardScores, bestPossibleScore }) => {
  const { user, setUser } = useContext(UserContext);
  const { deckId } = useParams() || null;
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const winImage = () => {
    const winImages = ["/img/thumbs-up1.gif", "/img/thumbs-up2.gif", "/img/thumbs-up3.gif", "/img/thumbs-up4.gif", "/img/thumbs-up5.gif" ];
    return winImages[Math.floor(Math.random() * winImages.length)];
  };

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

  const updateUserContext = async () => {
   const response = await getUser(user._id);
   const updatedUserContext = {...user};
   updatedUserContext.cards = response.data.cards;
   updatedUserContext.decks = response.data.decks;
   setUser(updatedUserContext);
  }

  useEffect(() => {
    (async () => {
    if (deckId) await deckUpdater();
     await cardUpdater();
     await updateUserContext();
     setFullyLoaded(true);
    })();
  }, []);

  if (!fullyLoaded) return <Loading/>
  return (
  <>
    {fullyLoaded && <CardTransition>
    <div className="grid place-items-center h-[75vh]">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={winImage()}
            alt="Thumbs up"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">You did it!</h2>
          <p>
            <b>Your score was:</b> {totalScore} / {bestPossibleScore}
          </p>
          <div className="card-actions">
          {deckId ? <Link className="btn btn-primary" to="/decks">
              Back to deck list
            </Link> : <Link className="btn btn-primary" to="/start">
              Back
            </Link>}
          </div>
        </div>
      </div>
    </div>
    </CardTransition>
    }
  </>
  );
};
