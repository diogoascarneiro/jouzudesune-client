import { useEffect, useState } from "react";
import { getCard } from "../../api";
import { Loading } from "../global/Loading";

export const CardFront = ({ id, showCardBack, cardQuestions }) => {
  const [card, setCard] = useState();

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  if (!card || !cardQuestions?.meanings?.length) return <Loading />;
  return (
   
    <div className="border-2">
      <h1>{card.questionWord}</h1>
      <button className="btn" onClick={showCardBack}>{cardQuestions.meanings[0]}</button>
      <button className="btn" onClick={showCardBack}>{cardQuestions.meanings[1]}</button>
      <button className="btn" onClick={showCardBack}>{cardQuestions.meanings[2]}</button>
    </div>
  )
};
