import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultTransition } from "../../components/global/DefaultTransition";
import { SectionHeader } from "../../components/global/SectionHeader";
import { UserContext } from "../../context/user.context";

export const StartPage = () => {
  const { user } = useContext(UserContext);
  const [randomDeckRange, setRandomDeckRange] = useState(10);
  const [seenDeckRange, setSeenDeckRange] = useState(10);
  const [seenDeckType, setSeenDeckType] = useState(null);

  return (
    <DefaultTransition>
    <div className="p-5">
      <SectionHeader>Welcome back {user.username}! Let's get started.</SectionHeader>
      <div className="flex w-full h-[60vh]">
        <div className="flex-grow w-2/4">
          <h4 className="my-3">Practice specific decks</h4>
          <div className="grid flex-grow card h-full bg-primary rounded-box place-items-center p-5">
            <p>Pick one of our themed decks and start learning!</p>
            <Link to="/decks">
              <button className="btn btn-secondary">Start</button>
            </Link>
          </div>
        </div>
        <div className="divider divider-horizontal mt-3 py-16">OR</div>
        <div className="flex-grow">
          <h4 className="my-2">Free practice</h4>
          <div className="flex flex-row flex-grow place-items-center h-full">
            <div className="w-2/4 p-5 card bg-primary rounded-box h-full mr-5">
              <h3>Random cards</h3>
              <p>Feeling adventurous? We'll fetch you a completely random deck. Let's see how you do! </p>
              <h6>How many cards should this deck have?</h6>
              <div>
                <input
                  type="range"
                  min="5"
                  max="15"
                  value={randomDeckRange}
                  className="range range-secondary"
                  step="5"
                  onChange={(e) => setRandomDeckRange(e.target.value)}
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                </div>
                <Link
                  to="/free-practice"
                  state={{
                    options: {
                      userId: user._id,
                      type: "random",
                      number: randomDeckRange,
                    },
                  }}
                >
                  <button className="btn btn-secondary">Start</button>
                </Link>
              </div>
            </div>
            <div className="w-2/4 p-5 h-full card bg-primary rounded-box">
              <h3>Practice seen cards</h3>
              <p>
                Need a refresher? We'll make a deck out of the cards you've already seen to help you memorize them. Make it random or focus on the ones you did worse on -
                the choice is yours.
              </p>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Lower scored cards first</span>
                  <input type="radio" name="radio-6" className="radio checked:bg-primary" onChange={() => setSeenDeckType("seenLowFirst")} />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Random</span>
                  <input type="radio" name="radio-6" className="radio checked:bg-secondary" onChange={() => setSeenDeckType("seenRandom")} />
                </label>
              </div>
              <input type="range" min="5" max="15" value={seenDeckRange} className="range range-secondary" step="5" onChange={(e) => setSeenDeckRange(e.target.value)} />
              <div className="w-full flex justify-between text-xs px-2">
                <span>5</span>
                <span>10</span>
                <span>15</span>
              </div>
              {seenDeckType && (
                <Link
                  to="/free-practice"
                  state={{
                    options: {
                      userId: user._id,
                      type: seenDeckType,
                      number: seenDeckRange,
                    },
                  }}
                >
                  <button className="btn btn-secondary">Start</button>
                </Link>
              )}
              {!seenDeckType && (
                <button className="btn btn-secondary btn-disabled" aria-disabled="true">
                  Start
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </DefaultTransition>
  );
};
