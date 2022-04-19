import { Link } from "react-router-dom"

export const DeckComplete = ({score}) => {
  return (
    <div>
    <h1>You did it!</h1>
    <p><b>Your score was:</b> {score}</p>
    <Link className="btn btn-primary" to="/decks">Back to deck list</Link>
    </div>
  )
}
