import Flippy, { FrontSide, BackSide } from "react-flippy";
import { DashboardCardPagination } from "./DashboardCardPagination";

export const DashboardCards = ( {cardsShowing, cardPaginationHandler}) => {

  return (
      <>
    <h2>Your cards:</h2>
    {cardsShowing.currentCards && <DashboardCardPagination cardPaginationHandler={cardPaginationHandler}/>}
    <div className="flex flex-row flex-wrap justify-center">
        {cardsShowing.currentCards &&
          cardsShowing.currentCards.map((card, i) => {
            return (
              <Flippy
                flipOnHover={true}
                flipDirection="horizontal"
                className="w-52 lg:w-[17.5%] h-80 lg:h-96 card m-4 shadow-xl" key={i}
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
                    <p className="grow-0 text-4xl">{card.cardId.wordInKana}</p>
                    <p className="grow-0 text-5xl">{card.cardId.wordMeanings}</p>
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
            );
          })}
          </div>
          {cardsShowing.currentCards && <DashboardCardPagination cardPaginationHandler={cardPaginationHandler}/>}
        {!cardsShowing.currentCards && (
          <h4>No cards here yet, go out and explore some!</h4>
        )}
          </>
  )
}
