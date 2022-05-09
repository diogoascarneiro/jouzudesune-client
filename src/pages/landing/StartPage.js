import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";

export const StartPage = () => {
  const { user } = useContext(UserContext);
  const [randomDeckRange, setRandomDeckRange] = useState(10);
  const [seenDeckRange, setSeenDeckRange] = useState(10);
  const [seenDeckType, setSeenDeckType] = useState(null);
  return (
    <div className="p-5">
      <h1>Welcome back {user.username}! Let's get started.</h1>

      <div className="flex w-full">
        <div className="flex-grow">
          <h2>Practice specific decks</h2>
          <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
            <p>Pick one of our themed decks and start learning!</p>
            <button className="btn">Start</button>
          </div>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="flex-grow">
          <h2>Free practice</h2>
          <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
            <h3>Practice with random cards</h3>
            <p>lorem ipsum blah blah</p>
            <h4>How many cards?</h4>
            <div>
              <input type="range" min="5" max="15" value={randomDeckRange} className="range" step="5" onChange={(e) => setRandomDeckRange(e.target.value)} />
              <div className="w-full flex justify-between text-xs px-2">
                <span>5</span>
                <span>10</span>
                <span>15</span>
              </div>
              <Link to="/free-practice" state={{options: {
                userId: user._id,
                type: "random",
                number: randomDeckRange
              }}}><button className="btn">Start</button></Link>
            </div>
            <div className="divider"></div>
            <h3>Practice with cards you've already seen</h3>
            <p>lorem ipsum blah blah</p>
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
            <input type="range" min="5" max="15" value={seenDeckRange} className="range" step="5" onChange={(e) => setSeenDeckRange(e.target.value)} />
              <div className="w-full flex justify-between text-xs px-2">
                <span>5</span>
                <span>10</span>
                <span>15</span>
              </div>
              {seenDeckType && <Link to="/free-practice" state={{options: {
                userId: user._id,
                type: seenDeckType,
                number: seenDeckRange
              }}}><button className="btn">Start</button></Link>}
              {!seenDeckType && <button className="btn btn-disabled" aria-disabled="true">Start</button>}
            
          </div>
        </div>
      </div>
    </div>
  );
};
