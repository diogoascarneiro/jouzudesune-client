import { useState, useEffect } from "react";
import { getAllDecks } from "../../api";
import { Link } from "react-router-dom";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export const DeckList = () => {
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllDecks();
      setDeckList(response.data);
    })();
  }, []);

  return (
    <div className="p-5">
      <h1>Decks</h1>
      <div className="flex flex-row">
        {deckList.map((deck) => {
          return (
            <Link to={deck._id} key={deck._id}>
              <Flippy
                flipOnHover={true}
                flipDirection="horizontal"
                className="w-52 h-80 card m-4 shadow-xl"
              >
                <FrontSide
                  className="card shadow-xl opacity-90"
                  style={{
                    backgroundImage: `url(..${deck.image})`,
                    padding: "0",
                    backgroundSize: "cover"
                  }}
                >
                  <div className="card bg-primary opacity-40 h-full w-full absolute top-0 left-0"></div>
                  <div className="card-body items-center text-center justify-center text-black z-10">
                    <h3 className="card-title text-2xl">{deck.name}</h3>
                  </div>
                </FrontSide>
                <BackSide>
                <div className="flex flex-col h-full py-5">
                <p className="h-3/6 flex w-full justify-self-center rounded-lg bg-secondary px-2 py-2">
                    <i className="text-center self-center">{deck.description}</i>
                  </p>
                <div className="grow flex flex-col justify-end"><p className="w-full">
                    <b>Difficulty:</b> {deck.difficulty}
                  </p>
                  <p className="w-full">
                    <b>Number of cards:</b> {deck.cards.length}
                  </p></div>
                  </div>
                </BackSide>
              </Flippy>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

