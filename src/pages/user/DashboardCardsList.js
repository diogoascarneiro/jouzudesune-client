import { DashboardCard } from "../../components/dashboard/DashboardCard";
import { SectionHeader } from "../../components/global/SectionHeader";
import { DashboardCardPagination } from "./DashboardCardPagination";
import { useEffect } from "react";

export const DashboardCardsList = ({ cardsShowing, cardPaginationHandler, showCards, setShowCards }) => {
  
  useEffect(()=>{
    setShowCards(true);
  }, [showCards])

  return (
    <>
      <SectionHeader>Your cards:</SectionHeader>
      {"currentCards" in cardsShowing &&
        cardsShowing.currentCards.length > 0 && (
          <DashboardCardPagination
            cardPaginationHandler={cardPaginationHandler} 
          />
        )}
      <div className="flex flex-row flex-wrap justify-center">
        {cardsShowing.currentCards && showCards &&
          cardsShowing.currentCards.map((card, i) => {
            return (
              <DashboardCard card={card} index={i} cardIsShowing={showCards} />
            );
          })}
      </div>
      {"currentCards" in cardsShowing &&
        cardsShowing.currentCards.length > 0 && (
          <DashboardCardPagination
            cardPaginationHandler={cardPaginationHandler}
          />
        )}
      {"currentCards" in cardsShowing &&
        cardsShowing.currentCards.length === 0 && (
          <h4 className="text-center py-20">
            No cards here yet, go out and explore some!
          </h4>
        )}
    </>
  );
};
