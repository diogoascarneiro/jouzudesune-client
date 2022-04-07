import { useEffect, useState } from "react";
import { getCard } from "../../api";
import { CardBack } from "./CardBack";
import { Loading } from "../global/Loading";

export const CardFront = ({ id }) => {
  const [card, setCard] = useState();
  const [cardState, setCardState] = useState("front");

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  if (!card) return <Loading />;

  return cardState === "front" ? (
    <div className="border-2">
      <h1>{card.questionWord}</h1>
      <button className="btn" onClick={() => setCardState("back")}>Show card back</button>
    </div>
  ) : (
    <CardBack id={id} />
  );
};
