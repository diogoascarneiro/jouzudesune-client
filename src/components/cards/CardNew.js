import { useState, useEffect } from "react";
import { getCard } from "../../api";
import { AudioButton } from "../global/AudioButton";
import ReactTooltip from "react-tooltip";

export const CardNew = ({ id, moveToNextCard }) => {
  const [card, setCard] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getCard(id);
      setCard(response.data);
    })();
  }, []);

  return (
    <div className="card bg-neutral shadow-xl">
      <div className="flex justify-center flex-col lg:items-center px-20">
        <h1 className="text-center">
          <ruby>
            <rb>{card.questionWord}</rb>
            <rt style={{ fontSize: "1rem" }}>{card.wordInKana}</rt>
          </ruby>
        </h1>
        <p className="mb-3">{card.wordMeanings}</p>
        <AudioButton src={`/media/${card.wordAudio}`}>Listen</AudioButton>
      </div>
      <div className="card-body">
        <div>
          <b>Example sentence: </b>
          <br />
          <h2
            data-tip
            data-for="exampleSentenceFurigana" className="underline w-fit"
            dangerouslySetInnerHTML={{ __html: card.exampleSentence }}
          ></h2>
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
          <div className="mb-2">{card.exampleTranslation}</div>
          <AudioButton src={`/media/${card.exampleAudio}`}>Listen</AudioButton>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={moveToNextCard}>
            Next card
          </button>
        </div>
      </div>
    </div>
  );
};
