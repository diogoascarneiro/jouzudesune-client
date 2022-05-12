import { Link } from "react-router-dom";

export const PracticeSeen = ({
  user,
  setSeenDeckType,
  seenDeckRange,
  setSeenDeckRange,
  seenDeckType,
}) => {
  return (
    <div className="w-full lg:w-2/4 py-5 px-10 lg:h-full card bg-primary rounded-box justify-between mb-10">
      <h3 className="mb-5 lg:m-0">Practice seen cards</h3>
      <p className="mb-5 lg:mb-2">
        Need a refresher? We'll make a deck out of the cards you've already seen
        to help you memorize them.
      </p>
      <div className="form-control bg-neutral rounded-xl mb-5 lg:m-0 p-3">
        <label className="label cursor-pointer">
          <span className="label-text">
            <b>Lower scored cards first</b>
          </span>
          <input
            type="radio"
            name="radio-6"
            className="radio radio-primary checked:bg-primary"
            onChange={(e) => setSeenDeckType("seenLowFirst")}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">
            <b>Random</b>
          </span>
          <input
            type="radio"
            name="radio-6"
            className="radio radio-primary checked:bg-primary"
            onChange={(e) => setSeenDeckType("seenRandom")}
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
  );
};
