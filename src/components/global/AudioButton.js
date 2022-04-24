export const AudioButton = ({src}) => {
    const audio = new Audio(src);
    const play = () => {
        audio.play()
    }

  return (
      <><button onClick={play} className="btn btn-primary">🕪 Play</button></>
  )
}
