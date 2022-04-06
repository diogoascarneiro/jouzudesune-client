
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export const Navbar = () => {

  const {isLoggedIn, user, logoutUser} = useContext(UserContext);

  return (
    <div>
    <NavLink to="/">Homepage test</NavLink>
    <NavLink to="/decks">See Decks</NavLink>
    {!isLoggedIn && <><NavLink to="/login">Login</NavLink><NavLink to="/signup">Signup</NavLink></>}
    {isLoggedIn && <><p>Welcome {user && user.username}</p><button onClick={logoutUser}>Logout</button></>}
    </div>
  )
}
