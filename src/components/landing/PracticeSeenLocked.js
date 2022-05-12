import { AiFillLock } from "react-icons/ai";
import { IconContext } from "react-icons";

export const PracticeSeenLocked = () => {
  return (
    <div className="w-full lg:w-2/4 py-5 px-10 lg:h-full card bg-gray-500 rounded-box justify-between mb-10">
      <div>
        <h3 className="mb-5 lg:m-0">Practice seen cards</h3>
        <p className="mt-3 lg:mb-2 line-through">
          Need a refresher? We'll make a deck out of the cards you've already
          seen to help you memorize them.
        </p>
      </div>
      <div className="w-full flex flex-col my-10 lg:-mt-3">
        <div className="flex justify-center">
          <IconContext.Provider value={{ className: "text-7xl text-center" }}>
            <AiFillLock />
          </IconContext.Provider>
        </div>
        <h3>Locked</h3>
          <p>Complete at least one deck to unlock!</p>
      </div>
      <div><button className="btn bg-primary btn-disabled btn-wide">Start</button></div>
    </div>
  );
};
