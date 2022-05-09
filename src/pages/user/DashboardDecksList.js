import Flippy, { FrontSide, BackSide } from "react-flippy";
import { SectionHeader } from "../../components/global/SectionHeader";

export const DashboardDecksList = ({userData}) => {
  return (
    <div>
     <SectionHeader>Your decks</SectionHeader>
      <div className="flex flex-row justify-center">
        {userData.decks &&
          userData.decks.map((deck, i) => {
            return (
                <Flippy
                  flipOnHover={true}
                  flipDirection="horizontal"
                  className="w-52 h-80 card m-4 shadow-xl" key={i}
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
                    <div className="card-body bg-secondary items-center text-center justify-between">
                      <p className="grow-0">
                        <b>High score: </b>
                        {deck.highScore}
                      </p>
                      <p className="grow-0">
                        <b>Times Played: </b>
                        {deck.timesPlayed}
                      </p>
                    </div>
                  </BackSide>
                </Flippy>
            );
          })}
        {!userData.decks[0] && (
          <h4 className="text-center py-20">No decks here yet, go out and explore some!</h4>
        )}
      </div>
      </div>
  )
}
