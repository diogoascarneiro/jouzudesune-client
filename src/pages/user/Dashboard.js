import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser } from "../../api";
import { Loading } from "../../components/global/Loading";
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (async () => {
      const response = await getUser(user._id);
      setUserData(response.data);
    })();
  }, [user]);

  if (!userData) return <Loading />;
  
  return (
    <div>
          <h2>Your decks:</h2>
      <div className="flex flex-row">
        {userData.decks && userData.decks.map((deck) => {
            return (
              <Flippy
      flipOnHover={true}
      flipDirection="horizontal" className="w-52 h-80 card m-4 shadow-xl">
    <FrontSide className="card shadow-xl opacity-90 border" style={{ backgroundImage: `url(..${deck.deckId.image})`, padding: "0" }}>
                <div className="card-body items-center text-center justify-between text-black">
                  <h2 className="card-title">{deck.deckId.name}</h2>
                  <p className="grow-0">{deck.deckId.description}</p>
                  <p className="grow-0"><b>Difficulty: </b>{deck.deckId.difficulty}</p>
                </div>
    </FrontSide>
    <BackSide className="card shadow-xl opacity-90 border" style={{ padding: "0" }}>
               <div className="card-body items-center text-center justify-between">
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
      <div className="flex flex-row flex-wrap">
        {userData.cards && userData.cards.map((card) => {
            return (
              <Flippy
      flipOnHover={true}
      flipDirection="horizontal" className="w-52 h-80 card m-4 shadow-xl">
    <FrontSide className="card shadow-xl opacity-90 border" style={{ backgroundImage: "url(../img/decks/default.jpg)", padding: "0" }}>
                <div className="card-body items-center text-center justify-center text-black">
                <h3 className="card-title text-2xl">{card.cardId.questionWord}</h3>
                </div>
    </FrontSide>
    <BackSide className="card shadow-xl opacity-90 border" style={{ padding: "0" }}>
               <div className="card-body items-center text-center justify-between">
                  <p className="grow-0">{card.cardId.wordInKana}</p>
                  <p className="grow-0">{card.cardId.wordMeanings}</p>
                  <p className="grow-0"><b>Times seen: </b>{card.timesSeen}</p>
                  <p className="grow-0"><b>Score: </b>{card.score}</p>
                  </div>
    </BackSide>
  </Flippy>
            );
          })}
      {!userData.cards[0] && <h4>No cards here yet, go out and explore some!</h4>}
      </div>
    </div>
  );
};
