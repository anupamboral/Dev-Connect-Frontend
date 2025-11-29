import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user);
  const [error, setError] = useState("");
  //* importing dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //* state variables to keep track what user is typing(binding state with ui components)
  const [firstName, setFirstName] = useState(user?.data?.firstName);
  const [lastName, setLastName] = useState(user?.data?.lastName);
  const [about, setAbout] = useState(user?.data?.about);
  const [gender, setGender] = useState(user?.data?.gender);
  const [skills, setSkills] = useState(user?.data?.skills);
  const [age, setAge] = useState(user?.data?.age);
  const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl);

  const handleUpdateProfile = async () => {
    try {
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
    } catch (err) {}
  };
  return (
    <>
      <div className="flex gap-2  justify-center grow-0 mt-4">
        <div className="flex justify-center  ">
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
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
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
                  onChange={(e) => setSkills(e.target.value)}
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
        <div className="self-start">
          <UserCard
            feed={{ firstName, lastName, about, age, skills, gender, photoUrl }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
