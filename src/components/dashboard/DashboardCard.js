import { Transition } from "@headlessui/react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useEffect } from "react";

export const DashboardCard = ({card, index, cardIsShowing}) => {
const stars = [];

for (let i = 0; i < card.averageScore; i++) {
  stars.push(<FaStar/>);
}

const starRatingGenerator = () => {
 
}

useEffect(()=>{
  starRatingGenerator();
}, [card])

  return (
    <Transition
    appear={true}
    show={cardIsShowing}
    enter="transition-opacity duration-1000"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-1000"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    className="w-52 lg:w-[17.5%]"
  >
    <Flippy
      flipOnHover={true}
      flipDirection="horizontal"
      className="h-80 lg:h-96 card m-4 shadow-xl"
      key={index}
    >
      <FrontSide
        className="card shadow-xl opacity-90 border"
        style={{
          backgroundImage: "url(../img/decks/default.jpg)",
          padding: "0",
        }}
      >
        <div className="card-body items-center text-center justify-center text-black">
          <h3 className="card-title text-6xl">
            {card.cardId.questionWord}
          </h3>
        </div>
      </FrontSide>
      <BackSide
        className="card shadow-xl border"
        style={{ padding: "0" }}
      >
        <div className="card-body bg-secondary items-center text-center justify-between">
          <p className="grow-0 text-4xl">
            {card.cardId.wordInKana}
          </p>
          <p className="grow-0 text-5xl">
            {card.cardId.wordMeanings}
          </p>
          <p className="grow-0 text-xl">
            <b>Times seen: </b>
            {card.timesSeen}
          </p>
          <div className="grow-0 text-xl">
            <b>Average score: </b>
            <div className="flex justify-center">{stars}</div>
          ({card.averageScore})
          </div>
         
        </div>
      </BackSide>
    </Flippy>
  </Transition>
  )
}
