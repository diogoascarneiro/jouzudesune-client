import { useEffect, useState } from "react";
import { getCard } from "../../api";
import { Loading } from "../global/Loading";

export const CardFront = ({ id, showCardBack, trackScore, cardQuestions, numOfOptions }) => {
  const [card, setCard] = useState();
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

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  if (!card || !cardQuestions?.meanings?.length) return <Loading />;
  return (
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
  );
};
