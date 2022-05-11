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
    <DefaultTransition className="p-5 h-[90vh]">
      <SectionHeader>
        Welcome back {user.username}! Let's get started.
      </SectionHeader>
      <div className="flex w-full flex-wrap lg:flex-nowrap gap-x-5 h-[85%] mb-20">
        <div className="flex flex-col w-full lg:w-2/6">
          <h4 className="my-2 text-center">Practice specific decks</h4>
          <div className="card h-full bg-primary rounded-box py-5 px-10 text-center justify-between">
          <div><h3 className="mb-5 lg:mb-3">Themed decks</h3>
          <p className="mb-5 lg:mb-0">Pick one of our themed decks and start learning!</p></div>
          <div className="stack bg-neutral mx-28 py-6 rounded-xl mb-5 lg:mb-3">
  <div className="grid w-32 h-40 rounded text-primary-content place-content-center" style={{
          backgroundImage: "url(../img/decks/default.jpg)"
        }}><h3><b>勉強</b></h3></div> 
  <div className="grid w-32 h-40 rounded bg-accent text-accent-content place-content-center">2</div> 
  <div className="grid w-32 h-40 rounded bg-secondary text-secondary-content place-content-center">3</div>
</div>
            <Link to="/decks">
              <button className="btn btn-secondary btn-wide">Start</button>
            </Link>
          </div>
        </div>
        <div className="divider divider-horizontal mt-16 hidden lg:flex">OR</div>
        <div className="flex flex-col w-full lg:w-4/6">
          <h4 className="mt-5 mb-5 lg:mt-2 lg:mb-2 text-center">Free practice</h4>
          <div className="flex flex-wrap lg:flex-nowrap gap-x-10 gap-y-5 text-center lg:h-full">
          <div className="w-full lg:w-2/4 py-5 px-10 card bg-primary rounded-box justify-between lg:h-full">
              <div><h3 className="mb-5 lg:mb-3">Random cards</h3>
              <p className="px-10">
                Feeling adventurous? Choose a number of cards and we'll fetch you a completely random deck.
                Let's see how you do!
              </p></div>
              <div>
              <h6 className="text-left mt-3 lg:mt-0 mb-2">Number of cards:</h6>
                <input
                  type="range"
                  min="5"
                  max="15"
                  value={randomDeckRange}
                  className="range range-secondary"
                  step="5"
                  onChange={(e) => setRandomDeckRange(e.target.value)}
                />
                <div className="w-full flex justify-between text-xs mb-5 px-2">
                  <span><b>5</b></span>
                  <span><b>10</b></span>
                  <span><b>15</b></span>
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
                  <button className="btn btn-secondary btn-wide">Start</button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-2/4 py-5 px-10 lg:h-full card bg-primary rounded-box justify-between mb-10">
              <h3 className="mb-5 lg:m-0">Practice seen cards</h3>
              <p className="mb-5 lg:mb-2">
                Need a refresher? We'll make a deck out of the cards you've
                already seen to help you memorize them. 
              </p>
              <div className="form-control bg-neutral rounded-xl mb-5 lg:m-0 p-3">
                <label className="label cursor-pointer">
                  <span className="label-text"><b>Lower scored cards first</b></span>
                  <input
                    type="radio"
                    name="radio-6"
                    className="radio radio-primary checked:bg-primary"
                    onChange={() => setSeenDeckType("seenLowFirst")}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text"><b>Random</b></span>
                  <input
                    type="radio"
                    name="radio-6"
                    className="radio radio-primary checked:bg-primary"
                    onChange={() => setSeenDeckType("seenRandom")}
                  />
                </label>
              </div>
             <div>
             <h6 className="text-left mb-2">Number of cards:</h6>
              <input
                type="range"
                min="5"
                max="15"
                value={seenDeckRange}
                className="range range-secondary"
                step="5"
                onChange={(e) => setSeenDeckRange(e.target.value)}
              />
              <div className="w-full flex justify-between text-xs px-2 mb-5">
                <span><b>5</b></span>
                <span><b>10</b></span>
                <span><b>15</b></span>
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
                  <button className="btn btn-secondary btn-wide">Start</button>
                </Link>
              )}
              {!seenDeckType && (
                <button
                  className="btn btn-secondary btn-disabled btn-wide"
                  aria-disabled="true"
                >
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
