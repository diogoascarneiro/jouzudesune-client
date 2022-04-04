import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
    <NavLink to="/">Homepage test</NavLink>
    <NavLink to="/decks">See Decks</NavLink>
    </div>
  )
}
