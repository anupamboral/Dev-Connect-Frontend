import { useState } from "react";

const Login = () => {
  //* state variables to keep track what user is typing(binding state with ui components)
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center mt-4">
      <div className="card bg-base-300 w-96 shadow-sm flex justify-center">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Log In</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">EmailId</legend>
            <input
              type="text"
              className="input"
              placeholder="email@.com"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="text"
              className="input"
              placeholder="TypeStrongPass@234"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          <div className="card-actions my-4  justify-center">
            <button className="btn btn-primary flex ">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
