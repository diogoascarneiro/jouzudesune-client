import React from "react";
import { useState, useEffect } from "react";
import { getCard } from "../../api";
import { AudioButton } from "../global/AudioButton";

export const CardBack = ({ id, moveToNextCard }) => {
  /* Not going to implement something like DOMPurifier to sanitize html for dangerouslySetInnerHtml
    for now since this is mostly for practicing react and I set the data on the db myself, but
    I'm leaving this here for future reference if I have the time to implement it later.  
  */
  const [card, setCard] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  const congratulateCard = () => {
    let congratulations =  ["That's right!", "You got it!", "You know your stuff!", "Yep, that's it!"];
    return congratulations[Math.floor(Math.random()*congratulations.length)];
  }

  return (
    <div className="card lg:card-side bg-neutral shadow-xl">
      <div className="flex justify-center lg:items-center px-20">
        <h1 className="text-center"> <ruby><rb>{card.questionWord}</rb><rt style={{fontSize: "1rem"}}>{card.wordInKana}</rt>
          </ruby></h1>
      </div>
      <div className="card-body">
        <h1 className="card-title pb-5">{congratulateCard()}</h1>
        <p>
          <b>Word meanings: </b>
          {card.wordMeanings}
        </p>
        <p>
          <b>Listen to the word: </b>
          <AudioButton src={`/media/${card.wordAudio}`} />
        </p>
        <p>
          <b>Word in a sentence: </b>
          <span dangerouslySetInnerHTML={{__html: card.exampleSentence}}></span>
        </p>
        <p>
          <b>Sentence with furigana: </b>
          <span dangerouslySetInnerHTML={{__html: card.exampleWithFurigana}}></span>
        </p>
        <p>
          <b>Sentence in kana: </b>
          <span dangerouslySetInnerHTML={{__html: card.exampleInKana}}></span>
        </p>
        <p>
          <b>Sentence translation: </b>
          {card.exampleTranslation}
        </p>
        <p>
          <b>Sentence audio: </b>
          <AudioButton src={`/media/${card.exampleAudio}`}/>
          
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
