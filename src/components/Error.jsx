import { useLocation } from "react-router-dom";

const Error = () => {
  const location = useLocation(); //* to access the data sent by useNavigate hook"s navigate function as second arg
  // console.log(location.state);
  const { errorMessage, errorState } = location.state;
  return (
    <div className="error-page flex mt-40 justify-center items-center flex-col gap-8">
      <h1>Oopsss!!!</h1>
      <h2>Something went wrong</h2>
      <h2>{`${errorState}:- ${errorMessage}`}</h2>
    </div>
  );
};
export default Error;
