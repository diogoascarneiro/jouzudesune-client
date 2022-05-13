import { AudioButton } from "../global/AudioButton";
import ReactTooltip from "react-tooltip";
import { CardTransition } from "../global/CardTransition";

export const CardNew = ({ card, moveToNextCard }) => {

let meaningCapitalized = card.wordMeanings.charAt(0).toUpperCase() + card.wordMeanings.slice(1);

  return (
      <CardTransition>
<h4 className="text-center rounded-xl bg-primary mb-2">New card!</h4>
    <div className="card bg-neutral shadow-xl p-8 mb-10">
    <div className="flex items-center justify-evenly lg:flex-col lg:px-20 gap-x-5">
          <ruby className="">
            <rb><h1 className="text-center">{card.questionWord}</h1></rb>
            <rt style={{ fontSize: "1rem" }}>{card.wordInKana}</rt>
          </ruby>
        <div className="flex flex-col justify-center w-2/4 lg:w-fit"><h4 className="mb-3 text-center">{meaningCapitalized}</h4>
        <AudioButton src={`/media/${card.wordAudio}`}>Listen</AudioButton></div>
      </div>
      <div className="card-body py-0 pt-4 px-5">
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
