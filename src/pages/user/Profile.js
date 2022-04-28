import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser, updateUser, upload } from "../../api";
import { Loading } from "../../components/global/Loading";
import { toast } from "react-toastify";

export const Profile = () => {

    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState();
    const [profilePicture, setProfilePicture] = useState();

    const handleProfilePicUpdate = async (e) => {
        e.preventDefault();
    
        const profPic = new FormData();
        profPic.append("file", profilePicture);
    
        const response = await upload(profPic);
        let updatedUser = {...userData};
        updatedUser.profilePicture = profilePicture;
        await updateUser(updateUser);
        toast.success("Successfully updated your profile picture!");
       
      };
  
    useEffect(() => {
      (async () => {
        const response = await getUser(user._id);
        setUserData(response.data);
        setProfilePicture(userData.profilePicture);
      })();
    }, [user, userData]);
  
    if (!userData) return <Loading />;

  return (
    <div className="flex h-[90vh]">
      <div className="border rounded-xl m-5 p-5 w-full lg:w-96 shadow-xl flex-col">
        <div className="avatar justify-center w-full">
          <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profilePicture} />
          </div>
        </div>
        <div className="flex flex-col">
        <form
          onSubmit={handleProfilePicUpdate}
          encType="multipart/form-data"
        ><label className="input-group">
    <input type="file" className=""  />
  </label>
        <button type="submit" className="btn btn-primary btn-sm mt-5">Change profile picture</button></form>
        
          <h2 className="justify-center">{userData.username}</h2>
          <div className="form-control">
          <label className="input-group">
            <span>Email</span>
            <input
              type="text"
              placeholder="info@site.com"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="input-group">
            <span>Password</span>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered"
            />
          </label>
        </div>
        </div>
      </div>
      <div className="border rounded-xl m-5 p-5 w-full shadow-xl flex-col">
     <h2>Your stats</h2>
     <h3>Decks</h3>
     <div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Total decks played</div>
    <div class="stat-value">{userData.decks.length}</div>
  </div> 
</div>
<h3>Cards</h3>
<div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Total cards seen</div>
    <div class="stat-value">{userData.cards.length}</div>
  </div> 
</div>
      </div>
    </div>
  );
};
