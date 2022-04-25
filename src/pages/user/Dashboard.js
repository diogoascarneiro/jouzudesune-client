import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser } from "../../api";
import { Loading } from "../../components/global/Loading";
import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

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
              <Flippy
      flipOnHover={true}
      flipDirection="horizontal" className="w-40 h-60 card m-4 shadow-xl">
    <FrontSide className="card shadow-xl opacity-90 border" style={{ backgroundImage: "url(../img/decks/default.jpg)", padding: "0" }}>
                <div className="card-body items-center text-center justify-between text-black">
                  <h2 className="card-title">{deck.deckId.name}</h2>
                  <p className="grow-0">{deck.deckId.description}</p>
                  <p className="grow-0"><b>Difficulty: </b>{deck.deckId.difficulty}</p>
                </div>
    </FrontSide>
    <BackSide className="card shadow-xl opacity-90 border" style={{ padding: "0" }}>
               <div className="card-body items-center text-center justify-between">
                    <h2 className="card-title">{deck.deckId.name}</h2>
                    <p className="grow-0"><b>High score: </b>{deck.highScore}</p>
                    <p className="grow-0"><b>Times Played: </b>{deck.timesPlayed}</p>
                  </div>
    </BackSide>
  </Flippy>
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
                  <p className="grow-0">Score:{card.score}</p>
                </div>
              </div>
            );
          })}
      {!userData.cards[0] && <h4>No cards here yet, go out and explore some!</h4>}
      </div>
    </div>
  );
};
