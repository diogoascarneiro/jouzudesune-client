import { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import { toast } from "react-toastify";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { storeToken, authenticateUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      storeToken(response.data.authToken);
      authenticateUser();
      toast.success("Logged in successfully!");
      navigate("/decks");
    } catch (e) {
      console.log(e);
      toast.error("Login failed, please try again.");
    }
  };

  // NOTE: NEED TO CHANGE USERNAME TO EMAIL FOR LOGIN VERIFICATION. JUST PERSONAL PREFERENCE
  return (
    <div className="flex justify-center mt-12">
      <div className="w-1/3">
        <h1>Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmitForm}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your user name</span>
            </label>
            <label className="input-group">
              <span className="text-sm w-1/4">User name</span>
              <input
                type="text"
                placeholder="User name"
                className="input input-bordered w-3/4"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your password</span>
            </label>
            <label className="input-group">
              <span className="text-sm w-1/4">Password</span>
              <input
                type="password"
                placeholder="**********"
                className="input input-bordered w-3/4"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button className="btn btn-primary my-5" type="submit">
            Login
          </button>
        </form>
        <p className="text-center">Don't have an account?</p>
        <Link className="btn btn-secondary w-full mt-5" to={"/signup"}>
          Sign up
        </Link>
      </div>
    </div>
  );
};
