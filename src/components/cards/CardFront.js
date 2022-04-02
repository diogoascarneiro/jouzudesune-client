import { useEffect, useState } from "react"
import { getCard } from "../../api";
export const CardFront = () => {
 
  const [card, setCard] = useState({});

 useEffect(() => {
  ( async () => {
    const response = await getCard("624851d578c8ecd2aa72f2a8");
    setCard(response.data);
})()
 }, []);

  return (
    <div>
    <h1>{card.questionWord}</h1>
    <button>Option 1</button>
    <button>Option 2</button>
    <button>Option 3</button>
    </div>
  )
}
