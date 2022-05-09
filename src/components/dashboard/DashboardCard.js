import { Transition } from "@headlessui/react";
//import { useState, useEffect } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export const DashboardCard = ({card, index, cardIsShowing}) => {

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
          <p className="grow-0 text-xl">
            <b>Score: </b>
            {card.score}
          </p>
        </div>
      </BackSide>
    </Flippy>
  </Transition>
  )
}
