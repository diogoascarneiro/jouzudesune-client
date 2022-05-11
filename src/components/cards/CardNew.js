import { AudioButton } from "../global/AudioButton";
import ReactTooltip from "react-tooltip";
import { CardTransition } from "../global/CardTransition";

export const CardNew = ({ card, moveToNextCard }) => {

  return (
      <CardTransition>
      <h1>New card!</h1>
    <div className="card bg-neutral shadow-xl px-20">
      <div className="flex justify-center flex-col lg:items-center p-10">
        <h1 className="text-center">{card.questionWord}</h1>
        <h4 className="mt-6">{card.wordInKana}</h4>
        <h3 className="mb-3">{card.wordMeanings}</h3>
        <AudioButton src={`/media/${card.wordAudio}`}>Listen</AudioButton>
      </div>
      <div className="card-body text-center">
        <div>
          <b className="">Example sentence: </b>
          <br />
          <h3
            data-tip
            data-for="exampleSentenceFurigana" className="border-0 rounded-xl py-4 pl-5 pr-1 my-3 bg-secondary w-fit"
            dangerouslySetInnerHTML={{ __html: card.exampleSentence }}
          ></h3>
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
          <div className="mb-2 text-2xl">{card.exampleTranslation}</div>
          <AudioButton src={`/media/${card.exampleAudio}`}>Listen</AudioButton>
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
