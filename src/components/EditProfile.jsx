import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user);
  const [error, setError] = useState("");
  //* importing dispatch function
  const dispatch = useDispatch();
  const emailId = user?.data?.emailId;
  //* state variables to keep track what user is typing(binding state with ui components)
  const [firstName, setFirstName] = useState(user?.data?.firstName || "");
  const [lastName, setLastName] = useState(user?.data?.lastName || "");
  const [about, setAbout] = useState(user?.data?.about || "");

  const [skills, setSkills] = useState(user?.data?.skills || []);
  const [age, setAge] = useState(user?.data?.age || 18);
  const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl || "");
  const [gender, setSelectedGenderValue] = useState(user?.data?.gender || "");

  const [showToast, setShowToast] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      setError(""); //* if error happened because of some validation error and after correcting the error if the user retry then the old error message should be cleared , that's why at the top to this handler we cleared the error first.
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          skills,
          photoUrl,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      //* showing toast only for 3 sec
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message + "!!!!");
    }
  };
  return (
    <div className="mb-4">
      <div className="lg:flex lg:flex-row  items-start md:flex-col-reverse  justify-center lg:grow-0 mt-4  ">
        <div className="edit-profile flex justify-center lg:mr-6 mb-6">
          <div className="card bg-base-300 w-96 shadow-sm flex justify-center">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl">
                Edit Profile
              </h2>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  className="input"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm" htmlFor="my-select">
                  Select gender:
                </legend>
                <select
                  id="my-select"
                  value="Please choose an option"
                  onChange={(e) => setSelectedGenderValue(e.target.value)}
                  className="bg-base-300"
                >
                  <option value="">--Please choose an option--</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="others">others</option>
                </select>
                <p className="input">{gender}</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotUrl</legend>
                <input
                  type="text"
                  className="input"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  type="text"
                  className="input"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value.split(","))}
                />
              </fieldset>
              <p className="text-sm text-red-500">{error}</p>
              <div className="card-actions my-4  justify-center">
                <button
                  className="btn btn-primary flex "
                  onClick={handleUpdateProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="view-profile lg:self-start sm:self-center flex justify-center">
          <UserCard
            feed={{
              firstName,
              lastName,
              about,
              age,
              skills,
              gender,
              photoUrl,
              emailId,
            }}
            buttonDisplay={false}
            emailDisplay={true}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className="text-black">Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
