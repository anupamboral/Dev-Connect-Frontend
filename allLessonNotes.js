//! ⁢Season 2 - Episode - 15 - DevtinderUi Part-1
//* we created this project using command -  npm create vite@latest dev-connect-frontend -- --template react
//* to design our ui we will use tailwind css and diasy ui(a component library compatible with daisy ui.)
//* then installed tailwind seeing it's doc.
//* only after installing we can daisy as it's is interconnected , so let's go to daisy ui 's website and install daisy ui.using the command :-npm i -D daisyui@latest and in the css file we have to add:- @plugin "daisyui";
//* in the left side navigation of daisy ui we will find navbar inside the components , so we will go inside the navbar and and see there is a "Navbar with search input and dropdown" so we will copy the jsx code of that (not html),and paste that inside the app.jsx file. and we will see a that in the ui the navbar is added into our ui.
//* to change colors we can go to left side nav bar and go inside colors and all color guide in there,
//* For Navbar we will create a separate component and put the code inside it, and then import that component inside the app.jsx and inside the app component we will put the navbar component.

//* Routing(using declarative mode)
//* we will add routing using react router so lets install this using the command:- npm i react-router-dom
//* routing can be created in the root level of the application, so we will be doing all the routing in the app.jsx file, so we will create a BrowserRouter which is imported from react-router-dom.and provide a baseName="/" param inside this component so basically this all routes will relative to this path'/'.This tis the base of all rotes.Like below:-
<BrowserRouter basename="/"></BrowserRouter>;
//* now we will create multiple roues inside our BrowserRouter.To do that we have to use:<Routes></Routes> component this basically a wrapper for different routes, and inside it we will create small small single route using route.
//* so for this project we will also use component based design. For our base route our path will be "/" and it will render Body component and inside this body all other components will stay as child components. So let's create a body component and and shift Navbar component inside the body component.
/*
 *<BrowserRouter basename="/">
 *        <Routes>
 *          <Route path="/" element={<Body />}></Route>
 *        </Routes>
 *      </BrowserRouter>
 */
//* In route component we have to mention the path , as body will be default page which will include all child paths so we mentioned the path "/". and inside the element param we mention the Body element as inside {} , and remember we shifted the navbar inside the body component.Now inside the this Body Route we will create children routes.
//* once we create route should not change the route after we add the app to production because whatever route we created at first google will use that route for indexing not the new changed route , so for seo we should not change rotes after production code is uploaded.
//* after creating a basic login page and profile page now using these we will add children route inside the Body route , present inside App.jsx.Like below:-
/*
 *<Route path="/" element={<Body />}>
 *            <Route path="/login" element={<Login />}></Route>
 *            <Route path="/profile" element={<Profile />}></Route>
 * </Route>
 */
//* but now if we go to browser and go to this path:- http://localhost:5173/login still we will not see the login page on the ui because inside the body component we have given any place to render the child components , so to make it work we have to go inside the body component and add a  Outlet component, below the navbar so other child components render inside it, and as navbar will be present inside the Body always , so inside other components we don't need to write navbar component.

//* And we have also created a footer to added that below the Outlet component so every page will have a footer.
//* write comments about log in page, (useState for email and password)

//* in the log in page , to keep track of what the user is typing we will create a useState variable for both email and password like below,
//*  const [emailId, setEmailId] = useState("");
//*  const [password, setPassword] = useState("");

//*  then use this variable inside the input fields like below:-
/*
 * <input
 *   type="text"
 *   className="input"
 *   placeholder="email@.com"
 *   value={emailId}
 *   onChange={(e) => {
 *     setEmailId(e.target.value);
 *   }}
 * />;
 * <input
 *   type="text"
 *   className="input"
 *   placeholder="TypeStrongPass@234"
 *   value={password}
 *   onChange={(e) => {
 *     setPassword(e.target.value);
 *   }}
 * />;
 */
//* this will keep track of what the user is typing;

//* now to make a api call to our server we will use a library named axios, previously we used  fetch api to make api calls , but this time we will use another library name axios for making api call, actual the axios syntax for making api call is smaller that fetch api call , first in the button of sign in , we will write a onclick handler and mention a handle login function, like below:-
/*
 <button className="btn btn-primary flex " onClick={handleLogin}>
              Log In
            </button>
            */
//* in the above portion now we will create this handle login function:-
//* so if we would create it using fetch api it would look like:-
/*
 *const handleLogin = async () => {
 *  try {
 *    const requestOptions = {
 *      method: "POST",
 *      credentials: "include", //* for setting up/storing cookies(token) in  *browser
 *      headers: {
 *        "Content-Type": "application/json",
 *      },
 *      body: JSON.stringify({
 *        emailId: emailId,
 *        password: password,
 *      }),
 *    };
 *    const res = await fetch("http://localhost:3000/signin", requestOptions);
 *    const data = await res.json();
 *    console.log(data);
 *  } catch (err) {
 *    console.error(err.message);
 *  }
 *};
console.log(handleLogin);
*/
//* but if we create this handleLogIn function using axios then it will look like(but it will not set cookies in the browser):-
//* import axios from "axios";
/*
 * const handleLogin2 = async () => {
 *   try {
 *     const data = await axios.post("http://localhost:3000/signin", {
 *       emailId,
 *       password,
 *     });
 *     console.log(data.data);
 *   } catch (err) {
 *     console.error(err.message);
 *   }
 * };
 */
//* see how the syntax is smaller than fetch api, axios library automatically sets header , automatically converts the data to json format while sending to server , and when the server returns data in json format , it automatically converts in to string format from json. so it is more easier.

//! WhiteListing our url and setting up credentials to store the cookies in the browser
//* now we will see that we save successful received the data from the server and also see that in the headers we also got the token , but but this token is not saved into our  browser, so we have to go to "applications" tab in the browser developer console and then cookies => http://localhost:5173/ , and see no cookies is saved , it is happening because of the cookies are coming from a unauthorized url and it is not https , so in the backend first we have to whitelist our frontend url and and also set credentials to true because this Accept credentials (cookies) sent by the client, so when we will send the the token to verify server will allow it, so lets go to our cors middleware and mention these options: like below:-
/*
*app.use(
*  cors({
*    origin: "http://localhost:5173/", //*(Whatever your frontend url is)
*    credentials: true, // *<= Accept credentials (cookies) sent by the client
*  })
);*/

//* but if we try again still it will not set the cookies in the browser, so one more setting in the frontend code it still left,so we will go to our login page code in the frontend where we are making the api call using axios and there after the url have to pass an object set withCredentials to true inside it and it will then send the cookies when it will make an api call and also store cookies in  the browser, now it will save the cookies to the browser.So it will look like:-
/*
* const handleLogin = async () => {
*    try {
*      const data = await axios.post(
*        "http://localhost:3000/signin",
*        {
*          emailId,
*          password,
*        },
!       { withCredentials: true }
*      );
*      //* setting this withCredentials to true is important to save the cookies *into browser.either it will send cookies but not save in the browser.
*      console.log(data.data);
*    } catch (err) {
*      console.error(err.message);
*    }
*  };
  */
//* if we would use fetch api then we had to use, credentials: "include",inside the options , below method:"POST",as property.

//* now to save the data of logged in user we will user redux toolkit, so we have tro search it and go to it's doc, and go to quick start option. there we can see we have to install twr packages redux toolkit and react redux. using the command, npm install @reduxjs/toolkit react-redux
//* then we create a utils folder and inside it we will create a utils folder,and create a appStore.js inside it now inisde this file we will create store like this:-
/*
 *import { configureStore } from "@reduxjs/toolkit";
 * creating the store
 *const appStore = configureStore({
 *  reducer: {
 *  },
 *});
 *export default appStore;
 */
//* and we have to provide the store to the whole app , so we have to go to App.jsx, and and import the Provider component and provide  the store like below:-
/*
! import appStore from "./utils/appStore";
* function App() {
*   return (
*     <>
!       <Provider store={appStore}>
*         <BrowserRouter basename="/">
*           <Routes>
*             <Route path="/" element={<Body />}>
*               <Route path="/" element={<Feed />}></Route>
*               <Route path="/login" element={<Login />}></Route>
*               <Route path="/profile" element={<Profile />}></Route>
*             </Route>
*           </Routes>
*         </BrowserRouter>
!       </Provider>
*     </>
*   );
* }
  */
//* now we have to create a slice for the user so we will create a usersLice.js file inside utils folder and inside the file we will create the userSlice, which will have two action one for adding the user and one for removing the user , and the initial value will be null.like below:-
/* inside userSlice.js
* import { createSlice } from "@reduxjs/toolkit";
* 
* const userSlice = createSlice({
*   name: "User",
*   initialState: null,
!   reducers: {
!     addUser: (state, action) => {
*       return action.payload;
*     },
!     removeUser: () => {
*       return null;
*     },
*   },
* });
* 
* export const { addUser, removeUser } = userSlice.actions;
* 
! export default userSlice.reducer;
*/
//* now we will add this slice into the store,lik below:-
/*
* import { configureStore } from "@reduxjs/toolkit";
! import userSlice from "./userSlice";
* //* creating the store
* const appStore = configureStore({
*   reducer: {
!     user: userSlice,
*   },
* });
* export default appStore;
*/

//* now after adding the slice, we will go to the login.js and dispatch action to add user into the store. so so at the top portion we will import the useDispatch hook like below
//*import { useDispatch } from "react-redux";
//*  const dispatch = useDispatch();

//* then inside the handleLogIn function we will dispatch action to add the fetched user into the store and then navigate the user to home page using the navigate function which we will get from useNavigator hook ,like below:-
//!import { addUser } from "../utils/userSlice";
//!import { useNavigate } from "react-router-dom";
/*
*  const handleLogin = async () => {
*     try {
*       const data = await axios.post(
*         BASE_URL + "/signin",
*         {
*           emailId,
*           password,
*         },
*         { withCredentials: true }
*       );
*       //* setting this withCredentials to true is important to save the cookies * into browser.either it will send cookies but not save in the browser.
*       console.log(data.data);
!       //* dispatching action to add the returned user data to the userSlice in * the redux store
!       dispatch(addUser(data.data));
!       //* navigating to feed(/) page
!       navigate("/");
*     } catch (err) {
*       console.error(err.message);
*     }
*   };
*   */

//* now in the home page(on "/" url) we will show the feed page, so make a basic feed component, , then to add the route o feed component we will go go App.jsx and add it as a child route inside body with only "/" path, remember body component is parent component with"/" path and this feed component is child component with "/" path , so when the path will be "/" inside the body outlet this feed component will be shown, like below:-
/*
* function App() {
*   return (
*     <>
*       <Provider store={appStore}>
*         <BrowserRouter basename="/">
*           <Routes>
!             <Route path="/" element={<Body />}>
!               <Route path="/" element={<Feed />}></Route>
*               <Route path="/login" element={<Login />}></Route>
*               <Route path="/profile" element={<Profile />}></Route>
*             </Route>
*           </Routes>
*         </BrowserRouter>
*       </Provider>
*     </>
*   );
* }
  */

//* now we will go inside the NavPage page, now to get the user data , we have to subscribe to the redux store, so we will import the useSelector hook, and select the user slice from the store inside the navbar.jsx. And conditionally render the user profile section in the right side of the nav bar using && operator , so we will only render it when user data is present in the redux store, otherwise this profile section will be hidden when the user is not logged in. and from the user data we will also show then first name and the user photo in the navbar. so as soon as the user logs in and gets redirected to the feed page , immediately the feed page will be loaded and and the profile section will be shown in the navbar with a greeting message like welcome user.
//* import { useSelector } from "react-redux";

/*
* const Navbar = () => {
!   selecting user slice from the store
!   const user = useSelector((store) => store.user);
*   return (
*     <div className="navbar bg-base-300 shadow-sm">
*       <div className="flex-1">
*         <a className="btn btn-ghost text-xl">Dev🤝Connect</a>
*       </div>
!       {user && (
*         <div className="flex gap-2">
!           <p className="mt-2">Welcome {user.data.firstName}</p>
*           <input
*             type="text"
*             placeholder="Search"
*             className="input input-bordered w-24 md:w-auto ml-4"
*           />
* 
*           <div className="dropdown dropdown-end mx-5">
*             <div
*               tabIndex={0}
*               role="button"
*               className="btn btn-ghost btn-circle avatar"
*             >
*               <div className="w-10 rounded-full">
!                 <img alt="user photo" src={user.data.photoUrl} />
*               </div>
*             </div>
*             <ul
*               tabIndex="-1"
*               className="menu menu-sm dropdown-content bg-base-100 rounded-box * z-1 mt-3 w-52 p-2 shadow"
*             >
*               <li>
*                 <a className="justify-between">
*                   Profile
*                   <span className="badge">New</span>
*                 </a>
*               </li>
*               <li>
*                 <a>Settings</a>
*               </li>
*               <li>
*                 <a>Logout</a>
*               </li>
*             </ul>
*           </div>
*         </div>
*       )}
*     </div>
*   );
* };
*/

//* now we will do some refactoring, so when we are making api call to the server in the login page, then we should not write url directly , so we make a , constants file inside the utils folder and the we will write the , the BASE_URL as a constant and export it then import it in the login page and use that like :-         BASE_URL + "/signin",
//* and also we should not keep other components inside the src like this, so inside the src folder we will make a components folder inside src folder and and move other components inside the components folder except the app.jsx,main.jsx,index.css.So we will also update the imports , of these moved files.

//! keep logged in feature while refreshing the browser
//* So whenever we go to a website and log in then we come after some time Will still see that Our profile is logged in So it has not automatically logged out And that happens because The browser saves the token sent by The server and then using that token The browser again fetches the User data  and shows in the ui that we are logged in .
//*But In case of our website even Token is stored in the browser but still when we're reloading the browser Our Profile gets logged out so how can we implement the feature that when we reload the browser or come to our website after some time then still our profile Remains logged in So to implement this Feature As we know that Our token is present inside the browser  And When the user Will load Any page of our website I like the profile page or the feed page all of these pages will be loaded inside the body so basically to load every page Our body will be loaded So we have to go inside Our body component Where every other component loads inside the outlet component And inside this body component We will fetch the user Using the profile view api we built in the back end So we will create a function named fetchUser And inside it we'll call our /profile/view api And fetch the user From the server
//*So when we will make the api call Using the axios library As the first argument we will mention the url of the back end And then as the second argument we will pass a object and inside that object we will mention withCredentials property And its value will be true .So because of this withCredentials:true, if token present inside the browser will be sent to the server And we already know that our /profile/view api will  will only work when we send the token to the server so it verifies the User using the token frontend sends, So basically our front end will send the token present inside the browser and this token will be verified by the back end and only when the token is valid then only it will send the user data And as soon as we get the data in our Front As the response we will save that response inside Our Redux store using The add user action We built So when the Redux store will be updated We'll see that Logged in.
//* So this is how we can implement this feature But we have to call this function inside the body ,Because When the user reloads Our website it will be treated as a first time load of the website or even the user comes after some days and loads the website that will be again treated as the first time load for our website so basically When our body component gets mounted  to the page For the first time then we have to call This function and to do it we can use the Use effect hook With the empty array argument passed as the Second argument So as As we know that In the use effect hook , As the first argument we have to pass a callback function Inside this function We can mention the Fetch user Function call And then as the second argument if we pass an empty array that means whenever This body component will Mounted for the first time This use effect hook will be called And it will fetch the user And the user will see that his profile is still logged in Even he reloads the page or if even he comes after Some days before our token expires For the cookie expires So that is how We can implement the feature Using our profile view api, Our token present inside the browser And the use effect hook with an empty array, And The token is not valid or not present we know that The server will send A 401 status code Please login Message As we updated token failed error message , so it will send 401 status code which means unauthorized credentials With the error message please login,
//* So in the catch block When The server has responded With the 401 status code then we will use the use navigate hook and send the user To the login page And because of this Whenever some user Try to access any of our Website page Even it is the profile page or even it is the feed page All of these pages get loaded inside the Outlet component and the outlet component is present inside the body component so every time The body is mounted for the first Which happens when the user reloads the browser or loads the browser after some days Every time This huge effect will be called And it will try to validate the token and if the token is present then it will fetch the user and it will show the user that he is still logged in but when the user is not logged in And he tries load Our profile page or our feed page which should be only Loaded when the user is logged in So because of this token validation always the server will return the status code and  Because of this navigate book We will mention , he will always redirected to the log in page.
//* so in the body.jsx we have write below code
/*
 * const navigate = useNavigate();
 * const dispatch = useDispatch();
 * const fetchUser = async () => {
 *   try {
 *     //* fetching user data when user is logged in and token is valid that's why * we are setting withCredentials to true to send the token to server
 *     const res = await axios.get(BASE_URL + "/profile/view", {
 *       withCredentials: true,
 *     });
 *     //* saving data in to userSlice(redux stare)
 *     dispatch(addUser(res.data));
 *   } catch (err) {
 *     if (err.status === 401) {
 *       //* if token is not valid then then sending the user to login page
 *       return navigate("/login");//* writing return here is important to stop further execution.
 *     }
 *     //* if any other error happens(also sending error data because in * declarative mode of react router we can't use useRouterError hook )
 *     navigate("/error", {
 *       state: { errorMessage: err.message, errorState: err.state },
 *     });
 *     console.error(err.message);
 *   }
 * };
 *
 * //* calling useEffect hook with empty array , whenever this component will load * first time it will call this useEffect and the fetchUser function will be called * and if the token is present then the userData will be fetched and added to the * redux store , so even the user refresh the page , his profile will be still * logged in until the token or cookie expires. and if the token is expired then * user will be redirected to the login page.
 * useEffect(() => {
 *   fetchUser();
 * },[]);
 */

//! Error Handling in declarative mode.
//* So as we are using The declarative mode in react router Because of this mode we can't use the use router error hook We used in the previous projects So to access the error in the error page First of all we will Error file And in the App jsx file we will add the path "/error" with the element <Error/> , And now We can come back to the Body.jsx, So in the catch block , We navigated The user to the login page when the status code is 401 But when the status quo is something else so some other error has happened In that scenario Redirect the user To the error Using the Navigate hook so we'll first get navigate using Use navigate hook and then we will use this navigate function To navigate the user To the error page But as the useRouterError hook is not present, So we have to use another way to send this error status and error message to the Error component So when we Calling the navigate function As the first argument we are mentioning The path of the error page Now as a second argument we can also pass Some data so we have to mention Object and inside that object we Use a status property and this status property can have a value which can be an object So inside this object we can pass our error message and the error status Now to This error message and the error status We have to go to the error compo End End Inside error .J S X We have Use a hook named useLocation() hook, And from this hook we can get Axis all of the data so first we have to Save this use location hooks value into a constant named location And then from this location we can destructure The status and from that status we can destructure The error message The error status code.
//! in body.jsx , catch block:-
/*
 *  navigate("/error", {
 *        state: {
 *          errorMessage:
 *            err.response.data.message + `(${err.response.statusText})`,
 *          errorState: `Status ` + err.response.status,
 *        },
 *      });
 */
//! in Error.jsx
/*
 * import { useLocation } from "react-router-dom";
 *
 *
 * const Error = () => {
 *   const location = useLocation();//* to access the data sent by useNavigate * hook"s navigate function as second arg
 *   // console.log(location.state);
 *   const { errorMessage, errorState } = location.state;
 *   return (
 *     <div className="error-page flex mt-40 justify-center items-center flex-col * gap-8">
 *       <h1>Oopsss!!!</h1>
 *       <h2>Something went wrong</h2>
 *       <h2>{`${errorState}:- ${errorMessage}`}</h2>
 *     </div>
 *   );
 * };
 * export default Error;
 */

//* we have also added the redirection links to the profile option and the logo , using the <link> component(instead of anchor tag we have to use Link tag) like below:-
/*
 * <Link to="/" className="btn btn-ghost text-xl">
 *          Dev🤝Connect
 * </Link>
 * <Link to="/profile" className="justify-between">
 *           Profile
 *         <span className="badge">New</span>
 * </Link>
 */

//! Log out feature
//* we already built the logout api in the backend which basically set the token to null and expires the cookie immediately, so our logout button is present inside the the navbar component, so let's go inside the Navbar component and build a handleLogOut function , and this function will called when onClick event will happen on logout button,like below:-
//*  <a onClick={handleLogOut}>Logout</a>
// * inside the handleLogOut function we will call the logout api, which will expire the cookie and token, but the data is already present inside the redux store so we will dispatch an action using removeUser action to empty the redux store and then navigate the ue to the login page, as the user is logging out. like below:-
/*
*  const navigate = useNavigate();
*   const dispatch = useDispatch();
* 
*   const handleLogOut = async () => {
*     //* we don't need to show the successful logout message, so we have not * saved the returned response into any constant
*     await axios.post(
*       BASE_URL + "/logout",
*       {},
*       {
*         withCredentials: true,
*       }
*     ); //* first arg is for the url, second arg {} is for body , and we are not  sending any data for this api call, and third arg is for options , in this wew  are setting  withCredentials:true to send the cookies and token to the server
* 
*     //* dispatching action to empty the user data from the redux store
*     dispatch(removeUser());
* 
*     //*navigating user to login page
*     navigate("/login");
*   };
  */

//* in the log in page , if the user enter some wrong data then it will show the error in the developer console but we have noway to show the error in the ui, so let's add a p tag above the login button, where will show the error, and this button will be dynamic, so we will make state variable for error, and mention that state variable in this paragraph tag, and where we are fetching the data for login , so in the handleLogIn function 's catch block , we will use setError() function to set the error message, so initial error value will be empty, that's why the p tag will hidden , but whenever some error will happen it because of setError function the error variable's value will be set and error will display on the ui.