import React from 'react';
import { useState } from 'react';
import { addUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { toast, Toast } from 'react-toastify';

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const handleSignupFormSubmit () => {
      //new user api call here
    } 

  return (
    <div>
        <form onSubmit={handleSignupFormSubmit}>
            <label labelfor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label labelfor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label labelfor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label labelfor="profilePic">Profile Picture (optional)</label>
            <input id="profilePic" type="image" value={profilePic} onChange={(e) => setProfilePic(e.target.value)}/>
            <button type="submit">Sign up</button>
        </form>
    </div>
  )
}
