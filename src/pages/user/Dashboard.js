import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser } from "../../api";
import { Loading } from "../../components/global/Loading";
import { DashboardDecks } from "./DashboardDecks";
import { DashboardCards } from "./DashboardCards";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [cardsShowing, setCardsShowing] = useState({});
  const [showCards, setShowCards] = useState(true);

  // need to make a show more button here
  useEffect(() => {
    (async () => {
      if (user) {
      const response = await getUser(user._id);
      setUserData(response.data);
    }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (userData && "cards" in userData) {
        setCardsShowing({
        page: 1,
        numOfCards: 10,
        currentCards: userData.cards.slice(0, 10),
      });
    }  
    })();
  }, [userData]);

  const cardPaginationHandler = (option) => {
    const nextCardsShowing = { ...cardsShowing };
    const numOfPages = Math.ceil(
      userData.cards.length / nextCardsShowing.numOfCards
    );
    if (option === "showPage")
      return `Page ${nextCardsShowing.page} / ${numOfPages}`;
    if (option === "prev" && nextCardsShowing.page - 1 >= 1) {
      setShowCards(false);
      nextCardsShowing.page -= 1;
    }
    if (option === "next" && nextCardsShowing.page + 1 <= numOfPages) {
      setShowCards(false);
      nextCardsShowing.page += 1;
    }
    nextCardsShowing.currentCards = userData.cards.slice(
      (nextCardsShowing.page - 1) * nextCardsShowing.numOfCards,
      (nextCardsShowing.page - 1) * nextCardsShowing.numOfCards +
        nextCardsShowing.numOfCards
    );
    setCardsShowing(nextCardsShowing);
    
  };

  if (!userData && !cardsShowing) return <Loading />;

  return (
    <div className="p-5">
      {cardsShowing && <DashboardCards
        cardsShowing={cardsShowing}
        cardPaginationHandler={cardPaginationHandler}
        showCards={showCards} setShowCards={setShowCards}
      />}
      {userData && <DashboardDecks userData={userData} />}
    </div>
  );
};
