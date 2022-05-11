import { useState } from "react";
import { CardTransition } from "../global/CardTransition";
import { Loading } from "../global/Loading";

export const CardFront = ({ card, id, showCardBack, trackScore, cardQuestions, numOfOptions }) => {
  const [cardScore, setCardScore] = useState(numOfOptions - 1);

  const handleAnswer = (e) => {
    if (e.target.innerText.toLowerCase() !== cardQuestions.correctMeaning.toLowerCase()) {
      e.target.style.visibility = "hidden";
      setCardScore(cardScore - 1);
    }
    if (e.target.innerText.toLowerCase() === cardQuestions.correctMeaning.toLowerCase()) {
      showCardBack();
      trackScore(cardScore, id);
    }
  };


  if (!card || !cardQuestions?.meanings?.length) return <Loading />;
  return (
    <CardTransition>
    <div className="card w-96 bg-neutral shadow-xl">
      <div className="card-body items-center text-center">
        <h1 className="text-center mt-16 mb-32">{card.questionWord}</h1>
        <div className="card-actions justify-center">
          {cardQuestions.meanings.map((meaning) => {
            return (
              <button className="btn btn-primary" onClick={(e) => handleAnswer(e)}>
                {meaning}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    </CardTransition>
  );
};
