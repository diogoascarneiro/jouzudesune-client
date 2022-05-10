import { useState } from "react";
import { signup, upload } from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export const Signup = () => {

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    navigate("/user/profile");
  }

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (profilePicture) {
    const profPic = new FormData();
    profPic.append("file", profilePicture);
    const response = await upload(profPic);
    await signup({
      username,
      email,
      password,
      profilePicture: response.data.fileUrl
    });
    } else {
      await signup({
        username,
        email,
        password
      });
    }
    toast.success("Successfully created new account");
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="lg:w-1/3">
        <h1 className="text-4xl">Sign up</h1>
        <div className="avatar flex justify-center">
          <div className="w-32 mask mask-squircle">
            <img className="" alt={profilePicture ? "Your profile Picture" :"Profile Picture placeholder"} src={profilePicture ? URL.createObjectURL(profilePicture) : "./img/placeholderProfilePic.png"} />
          </div>
        </div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmitForm}
          encType="multipart/form-data"
        >
        <div className="form-control mt-2">
  <label className="input-group">
    <span className="text-sm w-2/5 lg:w-1/4">User name</span>
    <input type="text" placeholder="User name" className="input input-bordered w-3/4" onChange={(e) => setUsername(e.target.value)}/>
  </label>
</div> 
<div className="form-control mt-2">
  <label className="input-group">
    <span className="text-sm w-2/5 lg:w-1/4">Email</span>
    <input type="email" placeholder="info@site.com" className="input input-bordered w-3/4" onChange={(e) => setEmail(e.target.value)} />
  </label>
</div>
 <div className="form-control mt-2">
  <label className="input-group">
    <span className="text-sm w-2/5 lg:w-1/4">Password</span>
    <input type="password" placeholder="**********" className="input input-bordered w-3/4" onChange={(e) => setPassword(e.target.value)} />
  </label>
</div>
 <div className="form-control">
  <label className="label">
    <span className="label-text">Profile picture</span>
  </label>
  <label className="input-group">
    <input type="file" className="" onChange={(e) => setProfilePicture(e.target.files[0])} />
  </label>
</div>

          <button className="btn btn-primary my-5" type="submit">Sign up</button>
        </form>
        <div className="divider">Already have an account?</div>
        <Link className="btn btn-secondary w-full mt-5" to={"/login"}>Log In</Link>
      </div>
    </div>
  );
};
