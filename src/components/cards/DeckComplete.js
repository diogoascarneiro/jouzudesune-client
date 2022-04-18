import { Link } from "react-router-dom"

export const DeckComplete = () => {
  return (
    <div>
    <h1>
        You did it!
        
    </h1>
    <Link className="btn btn-primary" to="/decks">Back to deck list</Link>
    </div>
  )
}
