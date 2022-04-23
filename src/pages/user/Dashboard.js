import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser } from "../../api";
import { Loading } from "../../components/global/Loading";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      const response = await getUser(user._id);
      setUserData(response.data);
    })();
  }, []);

  if (!userData) return <Loading />;

  return (
    <div>
      <h1>sup {userData.username}</h1>
      <h2>Your decks:</h2>
      <div className="flex flex-row">
        {userData.decks && userData.decks.map((deck) => {
            return (
              <div
                className="card w-40 h-60 m-4 opacity-90 shadow-xl"
                style={{ backgroundImage: "url(../img/decks/default.jpg)" }}
              >
                <div className="card-body items-center text-center justify-between text-black">
                  <h2 className="card-title">{deck.deckId.name}</h2>
                  <p className="grow-0">{deck.deckId.description}</p>
                  <p className="grow-0">Difficulty: {deck.deckId.difficulty}</p>
                </div>
              </div>
            );
          })}
      {!userData.decks[0] && <h4>No decks here yet, go out and explore some!</h4>}
      </div>

      <h2>Your cards:</h2>
      <div className="flex flex-row">
        {userData.cards && userData.cards.map((card) => {
            return (
              <div
                className="card w-40 h-60 m-4 opacity-90 shadow-xl"
                style={{ backgroundImage: "url(../img/decks/default.jpg)" }}
              >
                <div className="card-body items-center text-center justify-between text-black">
                  <h2 className="card-title">{card.cardId.questionWord}</h2>
                  <p className="grow-0">{card.cardId.wordInKana}</p>
                  <p className="grow-0">{card.cardId.wordMeanings}</p>
                  <p className="grow-0">Times seen: {card.timesSeen}</p>
                  <p className="grow-0">Score: {card.score}</p>
                </div>
              </div>
            );
          })}
      {!userData.cards[0] && <h4>No cards here yet, go out and explore some!</h4>}
      </div>
    </div>
  );
};
