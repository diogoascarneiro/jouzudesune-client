import React from "react";
import { useState, useEffect } from "react";
import { getCard } from "../../api";

export const CardBack = ({ id, moveToNextCard }) => {
  //testing html parsing from string to avoid changing the db
  // const htmlParser = new DOMParser();

  const [card, setCard] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <div className="flex justify-center lg:items-center p-20">
        <h1 className="text-center">{card.questionWord}</h1>
      </div>
      <div className="card-body">
        <h2 className="card-title">That's right!</h2>
        <p>
          <b>Word with furigana: </b>
          {card.wordWithFurigana}
        </p>
        <p>
          <b>Word in kana: </b>
          {card.wordInKana}
        </p>
        <p>
          <b>Meanings: </b>
          {card.wordMeanings}
        </p>
        <p>
          <b>Listen to the word: </b>
            <audio src={`/media/${card.wordAudio}`} controls/>
        </p>
        {/* <p>{htmlParser.parseFromString(card.exampleSentence, "text/html")}</p> */}
        <p>
          <b>Word in a sentence: </b>
          {card.exampleSentence}
        </p>
        <p>
          <b>Sentence with furigana: </b>
          {card.exampleWithFurigana}
        </p>
        <p>
          <b>Sentence in kana: </b>
          {card.exampleInKana}
        </p>
        <p>
          <b>Sentence translation: </b>
          {card.exampleTranslation}
        </p>
        <p>
          <b>Sentence audio: </b>
          <audio src={`/media/${card.exampleAudio}`} controls/>
          
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={moveToNextCard}>
            Next card
          </button>
        </div>
      </div>
    </div>
  );
};
