import React from 'react';
import { useState, useEffect } from 'react';
import { getCard } from '../../api';

export const CardBack = ({id, moveToNextCard}) => {

  //testing html parsing from string to avoid changing the db
 // const htmlParser = new DOMParser();

  const [card, setCard] = useState({});

  useEffect(() => {
   ( async () => {
     const response = await getCard(id);
     setCard(response.data);
 })()
  }, []);

  return (
    <div className="">
    <h1>{card.questionWord}</h1>
    <p>{card.wordWithFurigana}</p>
    <p>{card.wordInKana}</p>
    <p>{card.wordMeanings}</p>
    <p>{card.wordAudio}</p>
    {/* <p>{htmlParser.parseFromString(card.exampleSentence, "text/html")}</p> */}
    <p>{card.exampleSentence}</p>
    <p>{card.exampleWithFurigana}</p>
    <p>{card.exampleInKana}</p>
    <p>{card.exampleTranslation}</p>
    <p>{card.exampleAudio}</p>
    <button className="btn" onClick={moveToNextCard}>Next card</button>
    </div>
  )
}
