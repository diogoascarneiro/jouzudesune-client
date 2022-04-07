import { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { toast } from "react-toastify";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] =  useState("");

    const {storeToken, authenticateUser} = useContext(UserContext);

    const navigate = useNavigate();
    const handleSubmitForm = async (e) => {
        e.preventDefault();
       try {
         const response = await login({username, password});
        storeToken(response.data.authToken);
        authenticateUser();
        toast.success("Logged in successfully!")
        navigate("/");
       }
       catch (e) {
        console.log(e);
        toast.error("Login failed, please try again.");
       }
    }

  return (
    <div>
        <h1>Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmitForm}>
            <label>Username</label>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account?</p>
        <Link to={"/signup"}>Sign up</Link>
    </div>
  )
}
