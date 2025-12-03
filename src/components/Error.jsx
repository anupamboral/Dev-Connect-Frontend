import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Error = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation(); //* to access the data sent by useNavigate hook"s navigate function as second arg
  // console.log(location.state);
  const navigate = useNavigate();
  const handleReload = () => {
    user ? navigate("/") : navigate("/login");
  };
  const { errorMessage, errorState } = location.state;
  return (
    <div className="   error-page flex mt-40 justify-center items-center flex-col gap-8">
      <h1>Oopsss!!!</h1>
      <h2>Something went wrong</h2>
      <h2>{`${errorState}:- ${errorMessage}`}</h2>
      <button className="btn btn-secondary ml-2" onClick={handleReload}>
        Reload
      </button>
    </div>
  );
};
export default Error;
