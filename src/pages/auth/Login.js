import React from 'react'

export const Login = () => {
   
    const [username, setUsername] = useState("");
    //const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLoginFormSubmit () => {
      //new user api call here
    } 

  return (
    <div>
        <form onSubmit={handleLoginFormSubmit}>
            <label labelfor="username">Username</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            {/* <label labelfor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/> */}
            <label labelfor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Log in</button>
        </form>
    </div>
}
