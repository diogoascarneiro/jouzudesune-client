export const AudioButton = ({src, children}) => {
    const audio = new Audio(src);
    const play = () => {
        audio.play()
    }

  return (
      <><button onClick={play} className="btn btn-primary btn-sm">{children} 🕪</button></>
  )
}
