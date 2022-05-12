import { Link } from "react-router-dom";
import { GiCardRandom } from "react-icons/gi";
import { IconContext } from "react-icons";

export const PracticeRandom = ({
  user,
  randomDeckRange,
  setRandomDeckRange,
}) => {
  return (
    <div className="w-full lg:w-2/4 py-5 px-10 card bg-primary rounded-box justify-between lg:h-full">
      <div>
        <h3 className="mb-5 lg:mb-3">Random cards</h3>
        <p className="lg:px-10">
          Feeling adventurous? Choose a number of cards and we'll fetch you a
          completely random deck. Let's see how you do!
        </p>
      </div>
     <div className="flex justify-center my-5 lg:my-0">
          <IconContext.Provider value={{ className: "text-7xl text-center text-neutral" }}>
            <GiCardRandom />
          </IconContext.Provider>
        </div>
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
          <span>
            <b>5</b>
          </span>
          <span>
            <b>10</b>
          </span>
          <span>
            <b>15</b>
          </span>
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
  );
};
