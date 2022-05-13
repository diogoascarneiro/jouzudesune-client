import { Link } from "react-router-dom";

export const ThemedDecks = () => {
  return <div className="flex flex-col w-full lg:w-2/6">
          <h4 className="my-2 text-center">Practice specific decks</h4>
          <div className="card h-full bg-primary rounded-box py-5 px-10 text-center justify-between">
            <div>
              <h3 className="mb-5 lg:mb-3">Themed decks</h3>
              <p className="mb-5 lg:mb-0 px-10">Pick one of our themed decks and start learning!</p>
            </div>
            <div className="stack bg-neutral mx-12 lg:mx-28 py-6 rounded-xl mb-5 lg:mb-3">
              <div className="grid w-32 h-40 rounded text-primary-content place-content-center" style={{
          backgroundImage: "url(../img/decks/default.jpg)"
        }}>
                <h3>
                  <b>勉強</b>
                </h3>
              </div>
              <div className="grid w-32 h-40 rounded bg-accent text-accent-content place-content-center">2</div>
              <div className="grid w-32 h-40 rounded bg-secondary text-secondary-content place-content-center">3</div>
            </div>
            <Link to="/decks">
              <button className="btn btn-secondary btn-wide">Start</button>
            </Link>
          </div>
        </div>;
}
  