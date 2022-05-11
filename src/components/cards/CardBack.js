import { AudioButton } from "../global/AudioButton";
import ReactTooltip from "react-tooltip";
import { CardTransition } from "../global/CardTransition";

export const CardBack = ({ card, moveToNextCard }) => {
  /* Not going to implement something like DOMPurifier to sanitize html for dangerouslySetInnerHtml
    for now since this is mostly for practicing react and I set the data on the db myself, but
    I'm leaving this here for future reference if I have the time to implement it later.  
  */

  const congratulateCard = () => {
    let congratulations = [
      "That's right!",
      "You got it!",
      "You know your stuff!",
      "Yep, that's it!",
    ];
    return congratulations[Math.floor(Math.random() * congratulations.length)];
  };

 
let meaningCapitalized = card.wordMeanings.charAt(0).toUpperCase() + card.wordMeanings.slice(1);

  return (<CardTransition>
    <h4 className="card-title text-center pb-3">{congratulateCard()}</h4>
    <div className="card bg-neutral shadow-xl p-8 mb-10">
      <div className="flex items-center justify-around lg:flex-col px-20">
          <ruby>
            <rb><h1 className="text-center">{card.questionWord}</h1></rb>
            <rt style={{ fontSize: "1rem" }}>{card.wordInKana}</rt>
          </ruby>
        <div className="flex flex-col justify-center"><h4 className="mb-3 text-center">{meaningCapitalized}</h4>
        <AudioButton src={`/media/${card.wordAudio}`}>Listen</AudioButton></div>
      </div>
      <div className="card-body pb-0">
        <div>
          <p className="">Example sentence: </p>
          <h4
            data-tip
            data-for="exampleSentenceFurigana" className="border-0 rounded-xl py-4 pl-5 pr-1 mb-2 mt-1 bg-secondary text-center w-full"
            dangerouslySetInnerHTML={{ __html: card.exampleSentence }}
          ></h4>
          <ReactTooltip
            place="top"
            type="light"
            effect="solid"
            id="exampleSentenceFurigana"
          >
            <span className="text-xl"
              dangerouslySetInnerHTML={{ __html: card.exampleWithFurigana }}
            ></span>
          </ReactTooltip>
          <div className="w-full flex justify-center gap-x-5 mb-2">
          <h6 className="text-center text-lg lg:text-xl">{card.exampleTranslation}</h6>
          <AudioButton src={`/media/${card.exampleAudio}`} className="justify-self-end mt-1">Listen</AudioButton></div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={moveToNextCard}>
            Next card
          </button>
        </div>
      </div>
    </div>
    </CardTransition>
  );
};
