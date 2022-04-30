import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser, updateUser, upload } from "../../api";
import { Loading } from "../../components/global/Loading";
import { toast } from "react-toastify";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [newProfilePicture, setNewProfilePicture] = useState();

  const handleProfilePicUpdate = async (e) => {
    e.preventDefault();

    const profPic = new FormData();
    profPic.append("file", newProfilePicture);
    const response = await upload(profPic);
    const updatedUser = { ...userData };
    updatedUser.profilePicture = response.data.fileUrl;
    console.log('updatedUser', updatedUser)
    const updateResponse = await updateUser(updatedUser);
    setProfilePicture(updateResponse.data.profilePicture);
    toast.success("Successfully updated your profile picture!");
  };

  useEffect(() => {
    (async () => {
      const response = await getUser(user._id);
      setUserData(response.data);
    })();
  }, [user]);

  
  useEffect(() => {
    (async () => {
      setProfilePicture(userData.profilePicture);
    })();
  }, [userData]);

  if (!userData) return <Loading />;

  return (
    <div className="flex min-h-[90vh]">
      <div className="border rounded-xl m-5 w-full lg:w-96 shadow-xl flex-col">
        <div className="border-hidden rounded-t-xl py-2 px-4 h-16 w-full bg-secondary relative left-0 top-0">
        <h3>Your profile info</h3>
        
        </div>
                <div className="px-5 py-2">
                <h4 className="justify-center">Hi {userData.username}!</h4>
                <i>You can change your profile details here.</i>
          <div className="avatar justify-center w-full">
            <div className="w-32 mt-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profilePicture} />
            </div>
          </div>
          <div className="flex flex-col">
            <form
              onSubmit={handleProfilePicUpdate}
              encType="multipart/form-data"
            >
              <label className="input-group">
                <input type="file" className="" onChange={(e) => setNewProfilePicture(e.target.files[0])}/>
              </label>
              <button type="submit" className="btn btn-primary btn-sm mt-5">
                Change profile picture
              </button>
            </form>
            <div className="form-control mt-3">
              <label className="input-group mb-3">
                <span className="text-sm w-2/5">Email</span>
                <input
                  type="text"
                  placeholder="info@site.com"
                  className="input input-bordered"
                />
              </label>
              <label className="input-group mb-3">
                <span className="text-sm w-2/5">Password</span>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-xl m-5 w-full shadow-xl flex-col">
        <h2 className="border rounded-t-xl px-4 h-16 w-full bg-secondary relative left-0 top-0">
          Your stats
        </h2>
        <div className="p-5">
          <h4>Decks</h4>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total decks played</div>
              <div className="stat-value">{userData.decks.length}</div>
            </div>
          </div>
          <h4>Cards</h4>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total cards seen</div>
              <div className="stat-value">{userData.cards.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
