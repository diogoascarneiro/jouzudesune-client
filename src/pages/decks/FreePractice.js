import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { CardFront } from "../../components/cards/CardFront";
import { CardBack } from "../../components/cards/CardBack";
import { Loading } from "../../components/global/Loading";
import { DeckComplete } from "../../components/cards/DeckComplete";
import { SectionHeader } from "../../components/global/SectionHeader";
import { CardNew } from "../../components/cards/CardNew";
import { getRandomDeck } from "../../api";

/* 
 Note to self 2: turn all these states into a reducer
 Note to self 3: turn the shuffled deck into an array of cards like newCardsDeck rather than an object
*/

export const FreePractice = () => {
  const { user, setUser } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();
  
  const {options} = location.state || "invalid";

  const [currentCard, setCurrentCard] = useState(0);
  const [cardState, setCardState] = useState("new");
  const [cardQuestions, setCardQuestions] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [cardScores, setCardScores] = useState([]);
  const [bestPossibleScore, setBestPossibleScore] = useState();
  const [shuffledDeck, setShuffledDeck] = useState();
  const [newCardsDeck, setNewCardsDeck] = useState();

  const numOfOptions = 5;

  /*
   * HELPER FUNCTIONS GO HERE
   */
  
  const cleanSeenDecks = (responseData) => {
    return responseData.map((card) => card.cardId);  
  }

  const buildNewCardsSequence = (deck) => {
    const userSeenCards = {};
    user.cards.map((card) => (userSeenCards[`${card.cardId}`] = true));
    const newCards = [];
    deck.cards.forEach((card) => {
      if (!userSeenCards[`${card._id}`]) {
        newCards.push(card);
      }
    });
    if (newCards.length > 0) setNewCardsDeck(newCards);
    else setCardState("front");
  };

  const shuffleDeck = (deck) => {
    const shuffledCards = deck.sort(() => 0.5 - Math.random());
    const newDeck = { ...deck };
    newDeck.cards = shuffledCards;
    setShuffledDeck(newDeck);
    buildNewCardsSequence(newDeck);
    generateQuestions(0, newDeck);
  };

  // create an array of possible answers for each card - one correct, the rest (determined by numOfOptions) false
  const generateQuestions = (currentCard, deck) => {
    // Answer options for card meanings
    const correctMeaning = deck.cards[currentCard].wordMeanings;
    const possibleMeanings = deck.cards
      .filter((card) => card._id !== deck.cards[currentCard]._id)
      .map((card) => card.wordMeanings)
      .slice(0, numOfOptions - 1);
    possibleMeanings.push(correctMeaning);
    const shuffledMeanings = [...possibleMeanings].sort(
      () => 0.5 - Math.random()
    );

    // Answer options for hiragana

    setCardQuestions({ meanings: shuffledMeanings, correctMeaning });
  };

  const moveToNextCard = () => {
    if (cardState === "new") {
      if (!(currentCard + 1 >= newCardsDeck.length)) {
        setCurrentCard(currentCard + 1);
      } else {
        setCurrentCard(0);
        setCardState("front");
      }
    } else {
      if (!(currentCard + 1 >= shuffledDeck.cards.length)) {
        setCurrentCard(currentCard + 1);
        setCardState("front");
        generateQuestions(currentCard + 1, shuffledDeck);
      } else {
        setCurrentCard(currentCard + 1);
      }
    }
  };

  const showCardBack = () => {
    setCardState("back");
  };

  const trackScore = (score, cardId) => {
    // each card can give you (numOfOptions - 1) points, one point is deducted each time you guess incorrectly
    const cardScoreObject = { cardId, score };
    setCardScores([...cardScores, cardScoreObject]);
    setTotalScore(totalScore + score);
  };

  /*
   * USE EFFECT(S) GO HERE
   */

  useEffect(() => {
    (async () => {
      if (!location.state) navigate("/start");
      const response = await getRandomDeck(options);
      setBestPossibleScore(response.data.length * (numOfOptions - 1));
      if (options.type === "random") {
        shuffleDeck(response.data);
        buildNewCardsSequence(response.data);
      }
      else {
        setCardState("front");
        shuffleDeck(cleanSeenDecks(response.data));
      }
      
    })();
  }, []);

  /*
   * JSX GOES HERE
   */

  if (!shuffledDeck) return <Loading />;

  if (currentCard >= shuffledDeck.cards.length)
    return (
      <DeckComplete
        totalScore={totalScore}
        bestPossibleScore={bestPossibleScore}
        cardScores={cardScores}
      />
    );

  return (
    <div className="px-5 pb-5">
      <SectionHeader className="mb-5">Free Practice - {shuffledDeck.cards.length} cards</SectionHeader>
      <div className="grid place-items-center">
        {cardState === "new" && newCardsDeck && (
          <CardNew
            card={newCardsDeck[currentCard]}
            moveToNextCard={moveToNextCard}
          />
        )}
        {cardState === "front" && (
          <CardFront
            id={shuffledDeck.cards[currentCard]._id}
            showCardBack={showCardBack}
            cardQuestions={cardQuestions}
            numOfOptions={numOfOptions}
            trackScore={trackScore}
          />
        )}
        {cardState === "back" && (
          <CardBack
            id={shuffledDeck.cards[currentCard]._id}
            moveToNextCard={moveToNextCard}
          />
        )}
      </div>
    </div>
  );
};
