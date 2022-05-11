import { AiFillSound } from "react-icons/ai";

export const AudioButton = ({ src, children, className }) => {
  const audio = new Audio(src);
  const play = () => {
    audio.play();
  };

  return (
    <>
      <button onClick={play} className={className ? `btn btn-primary btn-xs ${className}` : "btn btn-primary btn-xs"}>
        {children}
        <span className="ml-1">
          <AiFillSound />
        </span>
      </button>
    </>
  );
};
