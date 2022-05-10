import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { getUser, updateUser, upload } from "../../api";
import { Loading } from "../../components/global/Loading";
import { toast } from "react-toastify";
import { DefaultTransition } from "../../components/global/DefaultTransition";

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [newProfilePicture, setNewProfilePicture] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleUpdateDataForm = async (e) => {
    e.preventDefault();

    const updatedUser = { ...userData };
    const updatedUserContext = {...user};
    if (newProfilePicture) {
      const profPic = new FormData();
      profPic.append("file", newProfilePicture);
      const response = await upload(profPic);
    // Just wanted to try this below. Neat!
      [updatedUser.profilePicture, updatedUserContext.profilePicture] = Array(2).fill(response.data.fileUrl);
    }
    if (email) {updatedUser.email = email}
    if (password) {updatedUser.password = password}
    const updateResponse = await updateUser(updatedUser);
    setProfilePicture(updateResponse.data.profilePicture);
    setUser(updatedUserContext);
    toast.success("Successfully updated your user data!");
  };

  useEffect(() => {
    (async () => {
      const response = await getUser(user._id);
      setUserData(response.data);
      setEmail(response.data.email);
    })();
  }, [user]);

  
  useEffect(() => {
    (async () => {
     setProfilePicture(userData.profilePicture);
    })();
  }, [userData]);

  if (!userData) return <Loading />;

  return (
    <DefaultTransition>
    <div className="flex flex-wrap lg:flex-nowrap min-h-[90vh]">
      <div className="border rounded-xl m-5 w-full lg:w-2/4 shadow-xl flex-col">
        <div className="border-hidden rounded-t-xl py-2 px-4 h-16 w-full bg-secondary">
        <h3>Your profile info</h3>
        
        </div>
                <div className="px-5 py-2 flex flex-col grow h-full">
                <h4 className="">Hi {userData.username}!</h4>
                <i>You can change your profile details here.</i>
          <div className="avatar justify-center w-full">
            <div className="w-36 mt-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profilePicture} alt="Your profile picture"/>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <form
              onSubmit={handleUpdateDataForm}
              encType="multipart/form-data" className="flex flex-col w-2/4"
            >
              <label className="input-group mb-5">
                <input type="file" className="" onChange={(e) => setNewProfilePicture(e.target.files[0])}/>
              </label>
              <label className="input-group my-3">
                <span className="text-sm w-2/5">Email</span>
                <input
                  type="text"
                  placeholder={email}
                  className="input input-bordered w-3/5" onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="input-group mb-3">
                <span className="text-sm w-2/5">Password</span>
                <input
                  type="password"
                  placeholder="********"
                  className="input input-bordered w-3/5" onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-primary btn-block ">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border rounded-xl m-5 w-full lg:w-2/4 shadow-xl flex-col">
        <h2 className="border rounded-t-xl px-4 h-16 w-full bg-secondary">
          Your stats
        </h2>
        <div className="p-5">
        <h4 className="w-fit border-0 rounded-xl py-2 px-4 bg-primary">Decks</h4>
        <div className="flex w-full justify-center">
          <div className="stats shadow bg-secondary my-5 w-full text-center">
            <div className="stat p-10 ">
              <div className="stat-title">Total decks played</div>
              <div className="stat-value">{userData.decks.length}</div>
            </div>
            <div className="stat p-10">
              <div className="stat-title">Average deck score</div>
              <div className="stat-value">{userData.decks.length}</div>
            </div>
          </div>
          </div>
          <h4 className="w-fit border-0 rounded-xl py-2 px-4 bg-primary">Cards</h4>
          <div className="flex w-full justify-center">
          <div className="stats shadow bg-secondary my-5 w-full text-center">
            <div className="stat p-10">
              <div className="stat-title">Total cards seen</div>
              <div className="stat-value">{userData.cards.length}</div>
            </div>
            <div className="stat p-10">
              <div className="stat-title">Average card score</div>
              <div className="stat-value">{userData.cards.length}</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </DefaultTransition>
  );
};
