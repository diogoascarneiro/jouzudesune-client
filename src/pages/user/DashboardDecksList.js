import Flippy, { FrontSide, BackSide } from "react-flippy";
import { DefaultTransition } from "../../components/global/DefaultTransition";
import { SectionHeader } from "../../components/global/SectionHeader";
import { DashboardDeckPagination } from "./DashboardDeckPagination";
import { useEffect } from "react";

export const DashboardDecksList = ({deckPaginationHandler, decksShowing, showDecks, setShowDecks}) => {
 
  useEffect(()=>{
    setShowDecks(true);
  }, [showDecks])

  console.log('decksShowing', decksShowing)
  return (
    <DefaultTransition>
     <SectionHeader>Your decks</SectionHeader>
     {"currentDecks" in decksShowing &&
        decksShowing.currentDecks.length > 0 && (
          <DashboardDeckPagination
            deckPaginationHandler={deckPaginationHandler} 
          />
        )}
      <div className="flex flex-row flex-wrap justify-center">
        {"currentDecks" in decksShowing &&
          decksShowing.currentDecks.map((deck, i) => {
            return (
              <div className="grow lg:grow-0 max-w-[50%] lg:w-[20%]">
                <Flippy
                  flipOnHover={true}
                  flipDirection="horizontal"
                  className="h-60 lg:h-96 xl:h-[28rem] card m-2 lg:m-4 shadow-xl" key={`${i}-${deck.deckId.name}`}
                >
                  <FrontSide
                    className="card shadow-xl opacity-90"
                    style={{
                      backgroundImage: `url(..${deck.deckId.image})`,
                      padding: "0",
                      backgroundSize: "cover"
                    }}
                  >
                   <div className="card bg-primary opacity-40 h-full w-full absolute top-0 left-0"></div>
                  <div className="card-body items-center text-center justify-center text-black z-10">
                    <h3 className="card-title text-2xl">{deck.deckId.name}</h3>
                  </div>
                  </FrontSide>
                  <BackSide
                    className="card shadow-xl border"
                    style={{ padding: "0" }}
                  >
                    <div className="card-body p-3 lg:p-5 bg-secondary items-center text-center justify-between">
                    <div className="grow-0 text-base hidden lg:flex lg:text-xl">
                        <p><i>{deck.deckId.description}</i></p>
                      </div>
                      <div className="grow-0 text-base lg:text-xl">
                        <b>Difficulty: </b>
                        <p>{deck.deckId.difficulty}</p>
                      </div>
                      <div className="grow-0 text-base lg:text-xl">
                        <b>High score: </b>
                        <p>{deck.highScore} / <b>{deck.deckId.cards.length * 4}</b></p>
                      </div>
                      <div className="grow-0 text-base lg:text-xl">
                        <b>Times Played: </b>
                        <p>{deck.timesPlayed}</p>
                      </div>
                    </div>
                  </BackSide>
                </Flippy>
                </div>
            );
          })}
         {"currentDecks" in decksShowing &&
        decksShowing.currentDecks.length > 0 && (
          <DashboardDeckPagination
            deckPaginationHandler={deckPaginationHandler} 
          />
        )}
        {"currentDecks" in decksShowing &&
        decksShowing.currentDecks.length === 0 && (
          <h4 className="text-center py-20">No decks here yet, go out and explore some!</h4>
        )}
      </div>
      </DefaultTransition>
  )
}
