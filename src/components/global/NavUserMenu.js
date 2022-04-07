import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export const NavUserMenu = () => {
    const { logoutUser } = useContext(UserContext);

  return (
    <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=33791" />
        </div>
      </label>
      <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={logoutUser}>Logout</a></li>
      </ul>
    </div>
  </div>
  )
}
