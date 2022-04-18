import { useEffect, useState } from "react";
import { getCard } from "../../api";
import { Loading } from "../global/Loading";

export const CardFront = ({ id, showCardBack, cardQuestions }) => {
  const [card, setCard] = useState();

  const handleAnswer = (e) => {
    if (e.target.innerText.toLowerCase() != cardQuestions.correctMeaning) {
      e.target.style.visibility = "hidden";
    }
    if (e.target.innerText.toLowerCase() === cardQuestions.correctMeaning) {
      showCardBack();
    }
    
  }

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  if (!card || !cardQuestions?.meanings?.length) return <Loading />;
  return (
   
    <div className="">
      <h1 className="text-center mt-16 mb-32">{card.questionWord}</h1>
      <button className="btn" onClick={(e) => handleAnswer(e)}>{cardQuestions.meanings[0]}</button>
      <button className="btn" onClick={(e) => handleAnswer(e)}>{cardQuestions.meanings[1]}</button>
      <button className="btn" onClick={(e) => handleAnswer(e)}>{cardQuestions.meanings[2]}</button>
    </div>
  )
};
