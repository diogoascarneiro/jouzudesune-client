import { useState } from "react";
import { signup, upload } from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const profPic = new FormData();
    profPic.append("file", profilePicture);

    const response = await upload(profPic);

    await signup({
      username,
      email,
      password,
      profilePicture: response.data.fileUrl,
    });
    toast.success("Successfully created new account");
    navigate("/");
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/3">
        <h1 className="text-4xl">Sign up</h1>
        <div className="avatar flex justify-center">
          <div className="w-32 mask mask-squircle">
            <img className="" src={profilePicture ? URL.createObjectURL(profilePicture) : "./placeholderProfilePic.png"} />
          </div>
        </div>
        <form
          className="flex flex-col"
          onSubmit={handleSubmitForm}
          encType="multipart/form-data"
        >
        <div className="form-control">
  <label className="label">
    <span className="label-text">Your user name</span>
  </label> 
  <label className="input-group">
    <span className="text-sm w-1/4">User name</span>
    <input type="text" placeholder="User name" className="input input-bordered w-3/4" onChange={(e) => setUsername(e.target.value)}/>
  </label>
</div> 
<div className="form-control">
  <label className="label">
    <span className="label-text">Your Email</span>
  </label>
  <label className="input-group">
    <span className="text-sm w-1/4">Email</span>
    <input type="email" placeholder="info@site.com" className="input input-bordered w-3/4" onChange={(e) => setEmail(e.target.value)} />
  </label>
</div>
 <div className="form-control">
  <label className="label">
    <span className="label-text">Your password</span>
  </label>
  <label className="input-group">
    <span className="text-sm w-1/4">Password</span>
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

          <button className="btn" type="submit">Sign up</button>
        </form>
        <p>Already have an account? </p>
        <Link to={"/login"}>Log In</Link>
      </div>
    </div>
  );
};
