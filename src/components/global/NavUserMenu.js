import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export const NavUserMenu = () => {
  const { user, logoutUser } = useContext(UserContext);
  
  const greetUser = (username) => {
    let greetings =  [`Hi ${username}!`, `'Sup ${username}?`, `${username}, ようこそ!`, `${username}, お元気ですか?`,`Looking good, ${username}!` ];
    return greetings[Math.floor(Math.random()*greetings.length)];
  }

  return (
    <><p className="">{greetUser(user.username)}</p>
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex="0" className="btn btn-ghost btn-circle avatar ml-4">
          <div className="w-10 rounded-full">
            <img src={user.profilePicture} />
          </div>
        </label>
        <ul
          tabIndex="0"
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
         <li><NavLink to="/decks">Decks</NavLink></li>
          <li>
            <NavLink to="/user/profile" className="justify-between">
              Profile
              {/* <span className="badge">New</span> */}
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/user/settings">Settings</NavLink>
          </li> */}
          <li>
            <NavLink to="/user/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={logoutUser}>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};
