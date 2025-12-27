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

//! ⁢Season 2 - Episode - 16 - DevtinderUi Part-2
//! log in page, (useState for email and password)

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

//! ⁢Season 2 - Episode - 17 - DevtinderUi Part-2
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
 *     navigate("/error", {
 *       state: {
 *         errorMessage: err.response
 *           ? err.response.data.message + `(${err.response.statusText})`
 *           : err.message,
 *         errorState: err.response ? `Status ` + err.response.status : err.code,
 *       },
 *     });
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

//! feed page
//* to build the feed page we will go the the feed.jsx , and we will make a fetchFeed function and inside it make api call to the /user/feed api, and also send the cookies by setting withCredentials:true; and get feed data , like below:-
/*
 *      const res = await axios.get(BASE_URL + "/user/feed", {
 *        withCredentials: true,
 *      });
 *      console.log(res);
 */

//* now to store this feed data we will create a feedSlice, and add that to the store , like below:-
//! in userSlice.js
/*
* import { createSlice } from "@reduxjs/toolkit";

* const userSlice = createSlice({
*   name: "User",
*   initialState: null,
*   reducers: {
*     addUser: (state, action) => {
*       return action.payload;
*     },
*     removeUser: () => {
*       return null;
*     },
*   },
* });
* 
* export const { addUser, removeUser } = userSlice.actions;
* 
* export default userSlice.reducer;
*/

//! adding feedSlice to the store(appstore.js)
/*
! import feedSlice from "./feedSlice";
* const appStore = configureStore({
*   reducer: {
*     user: userSlice,
!     feed: feedSlice,
*   },
* });
* export default appStore;
*/

//* now inside the feed.jsx, inside fetchFeedData dispatch a addFeed action to add the data to the feedSlice, and now we will call this fetchFeedData inside useEffect hook inside with a empty dependency array so , so it only gets called when this feed page first time mounts, and now we will create a UserCard components and get a card from daisy ui , and then use that inside the UserCard, and now we will composition this UserCard inside the Feed component , and then on the top side of feed component we will subscribe to the store, and get the store data inside a constant named feed, and conditionally render the this UserCard depending on the feed coming from store, because if we don't write this condition then it will try to render the user even before getting the feed data from the store and that will throw an error , so writing it conditionally using && operator is important. , and also pass the one of the user data from the feed coming from the store, and pass it inside the UserCard as a prop, and then using that we will display all the user details in the userCard. , so right now, our feed looks like below:-
/*
 * const Feed = () => {
 *   const dispatch = useDispatch();
 *   const navigate = useNavigate();
 *   const feed = useSelector((store) => store.feed);
 *   const fetchFeedData = async () => {
 *     //! when we are making a get call, we don't pass anything inside body as it  is a get call , so second param for body which is a { } is not required, so for  get call second param will be object for options where can set the * withCredentials to true, but for post call always the second param will be for * request body, and third param will be for options.
 *     try {
 *       const res = await axios.get(BASE_URL + "/user/feed", {
 *         withCredentials: true,
 *       });
 *       console.log(res);
 *       //* adding data to the store(feedSlice)
 *       dispatch(addFeed(res.data));
 *     } catch (err) {
 *          navigate("/error", {
 *       state: {
 *         errorMessage: err.response
 *           ? err.response.data.message + `(${err.response.statusText})`
 *           : err.message,
 *         errorState: err.response ? `Status ` + err.response.status : err.code,
 *       },
 *     });
 *       console.error(err.message);
 *     }
 *   };
 *
 *   useEffect(() => {
 *     fetchFeedData();
 *     // eslint-disable-next-line react-hooks/exhaustive-deps
 *   }, []);//* empty dependency array to render it only on first mount
 *
 *   return (
 *     feed && (
 *       <div className="flex justify-center my-8">
 *         {<UserCard feed={feed.data[0]} />}
 *       </div>
 *     )
 *   );
 * };
 */
//* show toast feature in edit profile page 3 sec and write comments for edit Profile feature.

//! Profile (Edit profile page)
//* in the navbar we will first add the link to go to the profile page, using Link component and mention "/profile" to go to the profile page. in the page, we will we will get the logged'in user's profile data from the store by subscribing to the store, using useSelector hook, and we will create a new EditProfile component and export that , then import it to the profile.jsx and composition this EditProfile component inside the profile component, and also pass the user data as prop , and now we will build the edit profile component , so let's go inside it, inside it we will create some input fields like created for the log in page, we can also copy some data from the log in page, and add a input field every data about the user , except email because we won't allow the user to change the email, and and only for the gender option we will create a dropdown because database won't allow uppercase data for gender because of our validation so, we are creating a dropdown for it and then  all of this input field will be inside a div. and now for every data field(  firstName, lastName, about, age, skills, gender, photoUrl,) variable we will create a state variable and there initial value will be the value we received through the props(from the store), and all of the and we will use this state variable's value as the value of its corresponding input fields and also below this whole div we will create a new div and in this new div we will composition a  UserCard component and pass also this state variables inside a object as feed prop. and then for every input elm on the onChange event we will mention the set state functions corresponding to the input field, so then when ever the user will change something on the input field, as the set function will be called , so the live change will be also reflected on the userCard component, as we will put both side by side using display flex, and  the same same changing state variable is passed inside the UserCard as the prop. and remember only for the skills as it is a array, so when the user is inputting the data , we have to also convert it to a array , so for setSkill function we have write it like:-
/*
*      <legend className="fieldset-legend">Skills</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={skills}
!                  onChange={(e) => setSkills(e.target.value.split(","))}
*                 />
* </fieldset>
              */
//* and now we will create a handleUpdateProfile , and this will be called when save profile button will clicked , so on onClick event, this will be called, and inside the handleUpdateProfile function we will use the the patch method , as the update api is a patch api, in the body we will pass all state variable values, and in options we will set withCredentials to true to send token for validation, and with the returned response we will updated the store data  , so the store also gets updated, and now when this api gets called we want that a saved profile profile message should be displayed to show the user,that his data is successfully updated, so from the daisy ui we will copy the top showing toast , and add that in the as a div, no matter where we add it it will be shown in the top, and the we want this to show only for three seconds , so we will create a state variable named showToast and setShowToast function, its initial value will be false, and depending on this showToast this toast will be displayed , as initially it will be false , when the user update his profile ans click on save this setShowToast will get set to true we will write it inside handler function, and then using setTimeOut function we will set it false again after 3 secs.

//!  buttonDisplay={false} and  emailDisplay={true} prop in UserCard component
//* when we are composition this userCard inside the EditProfile page, as the UserCard component had a ignored and interested button, but here in the user's own profile, we don't these buttons, so we created this button display prop and passing false as it's value , and we will receive this prop inside the userCard component and depending on this prop we will display the buttons, so as we are passing false from here it will not display those buttons , but from the feed page we will pass true so then for the feed page the userCard will display the buttons, and we created another prop named emailDisplay , because in the editProfile page , we want to show the loggedInUser's profile , so we are passing this props value to true, and depending on the prop we are displaying the emailId of the user in the edit profile page, but when we from the feed page we will pass false because we will not display other user;s email to the loggedInUser.
//*So the whole whole profile comp and editProfile comp will look like below:-
//* Profile component
/*
 * function Profile() {
 *   const user = useSelector((store) => store.user);
 *
 *   return (
 *     user && (
 *       <div>
 *         <EditProfile user={user} />
 *       </div>
 *     )
 *   );
 * }
 */
//* EditProfile component
/*
* const EditProfile = ({ user }) => {
*   console.log(user);
*   const [error, setError] = useState("");
*   //* importing dispatch function
*   const dispatch = useDispatch();
*   const emailId = user?.data?.emailId;
*   //* state variables to keep track what user is typing(binding state with ui * components)
!   const [firstName, setFirstName] = useState(user?.data?.firstName);
!   const [lastName, setLastName] = useState(user?.data?.lastName);
!   const [about, setAbout] = useState(user?.data?.about);
! 
!   const [skills, setSkills] = useState(user?.data?.skills);
!   const [age, setAge] = useState(user?.data?.age);
!   const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl);
!   const [gender, setSelectedGenderValue] = useState(user?.data?.gender);
! 
!   const [showToast, setShowToast] = useState(false);
* 
!   const handleUpdateProfile = async () => {
*     try {
!       setError(""); //* if error happened because of some validation error and * after correcting the error if the user retry then the old error message should * be cleared , that's why at the top to this handler we cleared the error first.
!       const res = await axios.patch(
*         BASE_URL + "/profile/edit",
*         {
*           firstName,
*           lastName,
*           age,
*           about,
*           skills,
*           photoUrl,
*           gender,
*         },
*         { withCredentials: true }
*       );
!       dispatch(addUser(res.data));
*
!       //* showing toast only for 3 sec
!       setShowToast(true);
!       setTimeout(() => {
!         setShowToast(false);
!       }, 3000);
*     } catch (err) {
!       setError(err?.response?.data?.message + "!!!!");
*     }
*   };
*   return (
*     <>
*       <div className="lg:flex lg:flex-row  items-center sm:flex-col  justify-* center lg:grow-0 mt-4 mb-8 ">
*         <div className="flex justify-center lg:mr-6 mb-6">
*           <div className="card bg-base-300 w-96 shadow-sm flex justify-center">
*             <div className="card-body">
*               <h2 className="card-title justify-center text-2xl">
*                 Edit Profile
*               </h2>
*               <fieldset className="fieldset">
*                 <legend className="fieldset-legend">First Name</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={firstName}
*                   onChange={(e) => setFirstName(e.target.value)}
*                 />
*               </fieldset>
*               <fieldset className="fieldset">
*                 <legend className="fieldset-legend">Last Name</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={lastName}
*                   onChange={(e) => setLastName(e.target.value)}
*                 />
*               </fieldset>
*               <fieldset className="fieldset">
*                 <legend className="fieldset-legend">About</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={about}
*                   onChange={(e) => setAbout(e.target.value)}
*                 />
*               </fieldset>
*               <fieldset className="fieldset">
*                 <legend className="fieldset-legend">Age</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={age}
*                   onChange={(e) => setAge(e.target.value)}
*                 />
*               </fieldset>
!               <fieldset className="fieldset">
!                 <legend className="fieldset-legend text-sm" htmlFor="my-select">
!                   Select gender:
!                 </legend>
!                 <select
!                   id="my-select"
!                   value="Please choose an option"
!                   onChange={(e) => setSelectedGenderValue(e.target.value)}
!                   className="bg-base-300"
!                 >
!                   <option value="">--Please choose an option--</option>
!                   <option value="male">male</option>
!                   <option value="female">female</option>
!                   <option value="others">others</option>
!                 </select>
!                 <p className="input">{gender}</p>
!               </fieldset>
* 
*               <fieldset className="fieldset">
*                 <legend className="fieldset-legend">PhotUrl</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={photoUrl}
*                   onChange={(e) => setPhotoUrl(e.target.value)}
*                 />
*               </fieldset>
*               <fieldset className="fieldset">
!                 <legend className="fieldset-legend">Skills</legend>
*                 <input
*                   type="text"
*                   className="input"
*                   value={skills}
!                   onChange={(e) => setSkills(e.target.value.split(","))}
*                 />
*               </fieldset>
*               <p className="text-sm text-red-500">{error}</p>
*               <div className="card-actions my-4  justify-center">
*                 <button
*                   className="btn btn-primary flex "
*                   onClick={handleUpdateProfile}
*                 >
*                   Save Profile
*                 </button>
*               </div>
*             </div>
*           </div>
*         </div>
!         <div className="lg:self-start sm:self-center flex justify-center">
!           <UserCard
!             feed={{
!               firstName,
!               lastName,
!               about,
!               age,
!               skills,
!               gender,
!               photoUrl,
!               emailId,
!             }}
!             buttonDisplay={false}
!             emailDisplay={true}
!           />
!         </div>
*       </div>
!       {showToast && (
!         <div className="toast toast-top toast-center">
!           <div className="alert alert-success">
!             <span>Profile updated successfully</span>
!           </div>
!         </div>
!       )}
*     </>
*   );
* };
*/

//! ⁢Season 2 - Episode - 18 - DevtinderUi Part-4
//! connections page
//* to build the connections page , we created a connections link in the navbar, and added the link tag to go to the connections page , and add also in the the route in the app.jsx, then in the connections page , we will make a fetchConnection function to made a api call to user/connections api , with also sending the token by setting withCredentials to true ,and to save the data of the response we will create a connections slice inside utils/connections.js like below:-
/*
import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "Feed",
  initialState: null,
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
*/

//* and now we will add this connection slice into the store(appstore.js) , so then comeback to our connections component and inside the fetch connection function we will dispatch an addConnections action to add the data to the slice, and then in the top we will subscribe to the store and get the connections data and using the data we will render all of the connections in the in the page, so we will make a header connections and below that we will map the the connections array, and return a connection div for every connection, to build the connection div we get help help from daisy ui(tab - Alert with buttons + responsive) , and we are rendering a connection div for every connection, so the whole component will look like below:-
/*
* const Connections = () => {
*   const navigate = useNavigate();
*   const dispatch = useDispatch();
*   const connections = useSelector((store) => store.connections);
*   const fetchConnection = async () => {
*     try {
*       const res = await axios.get(BASE_URL + "/user/connections", {
*         withCredentials: true,
*       });
* 
*       dispatch(addConnections(res.data.data));
*     } catch (err) {
*       navigate("/error", {
*         state: {
*           errorMessage: err.response
*             ? err.response.data.message + `(${err.response.statusText})`
*             : err.message,
*           errorState: err.response ? `Status ` + err.response.status : err.code,
*         },
*       });
*       console.error(err.message);
*     }
*   };
*   useEffect(() => {
*     fetchConnection();
*     // eslint-disable-next-line react-hooks/exhaustive-deps
*   }, []);
* 
*   // console.log(user);
* 
*   if (!connections) return;
*   if (connections.length === 0) return <h1>No connection found</h1>;
*   return (
*     <div>
*       <div className=" flex justify-center">
*         <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text * text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
*           {" "}
*           Connections
*         </h1>
*       </div>
*       <div className="max-h-[1000px] min-h-[80dvh] max-w-[90dvw]  lg:mx-auto * overflow-scroll border-2 border-cyan-400 px-2 py-6">
*         {connections.map((connection) => {
*           return (
*             <div className="mb-4 lg:mx-24 bg-base-300 rounded-4xl mx-6">
*               <div className="flex  justify-start rounded-4xl">
*                 <div
*                   role="alert"
*                   className=" flex justify-around   alert bg-base-300 alert-* vertical sm:alert-horizontal"
*                 >
*                   <img
*                     className="h-36 w-36 rounded-4xl"
*                     src={connection.photoUrl}
*                     alt="Shoes"
*                   />
*                   <div className="flex flex-col  justify-start">
*                     <h2 className=" md:self-start  card-title">
*                       {connection.firstName + " " + connection.lastName}
*                     </h2>
*                     {connection.age && connection.gender && (
*                       <p>{`Age: ${connection.data.age} , ${connection.gender}`}* </p>
*                     )}
*                     <p className="text-white">{connection.about}</p>
*                   </div>
*                 </div>
*               </div>
*             </div>
*           );
*         })}
*       </div>
*     </div>
*   );
* };

*/
//!requests page
//* so we hav e added the link in the nav bar so we can go to the navigation page, and then to we created a requests.js file and created a requests component inside it we will create a fetchRequests function to fetch all the requests , where we are calling the /user/requests/received api with sending the token and then getting the response and to save this response we will make a requestSlice inside utils/requestsSlice.js , so there is a addRequest action which add all the requests in the state. and there is removeRequest action  which can remove a single request from the requests array if some request gets accepted or rejected , and return a new array which will not included the accepted or rejected request.and add the slice into the appStore(redux store) so the slice will look like below:-
/*
 * const requestsSlice = createSlice({
 *   name: "Feed",
 *   initialState: null,
 *   reducers: {
 *     addRequests: (state, action) => {
 *       return action.payload;
 *     },
 *     removeRequest: (state, action) => {
 *       //* from the state connection requests , this filter method will  remove * that connection request doc which id is matching with action.payload(connectionRequestId)(so * which request is accepted or rejected) and filter out all the requests which are * in pending state except the connection request that is accepted or rejected,so * newRequest will only include  the remaining pending requests.
 *       const newRequests = state.filter(
 *         (request) => request._id !== action.payload
 *       );
 *       return newRequests; //* returning updated requests(removed reviewed * request)
 *     },
 *   },
 * });
 *
 * export const { addRequests, removeRequest } = requestsSlice.actions;
 *
 * export default requestsSlice.reducer;
 */
//* so after fetching the requests we will add all requests in the store by dispatching the addRequests() action , then we will subscribe to the store to get all the requests and then using the data we will display all the requests using map() and looping the requests data, so every request will have a accept and reject btn on the ui, and when the user will click on these buttons we will call a function named handleReviewRequest(status, connectionRequestId); so we will make this function and this function will take args one is the status, which can be accepted or rejected depending on the button, so we will be hanrd coding while passing it the to function and the second srg will the connection request id which we will get from the the request we are displaying using the map method so request._id. and this handleReviewRequest function make a api call to the /request/review/:status/:connectionRequestId , api, where we will pass this status and connectionRequestId we we got from the args , and then it will return the connectionRequest doc which is now updated as accepted or rejected , and now we will remove the request from the existing pending request, present in out request slice's state , using the removeRequest action, so we will pass the response doc while calling the action, and the removeRequest slice will filted using this connection request doc, so , the removeRequest action will filter all other docs which not matching with this doc's _id , and give a filtered array of pending request, so the state of the store will be updated and the ui will only display the pending requests, so the whole requests api will look like below:-
/*
* const Requests = () => {
*   const navigate = useNavigate();
*   const dispatch = useDispatch();
*   const requests = useSelector((store) => store.requests);
* 
!   const handleReviewRequest = async (status, connectionRequestId) => {
*     try {
*       const res = await axios.post(
!         BASE_URL + "/request/review/" + status + "/" + connectionRequestId,
!         {},
!         { withCredentials: true }
*       );
*       console.log(res.data.data);
!       dispatch(removeRequest(connectionRequestId));
*     } catch (err) {
*       navigate("/error", {
*         state: {
*           errorMessage: err.response
*             ? err.response.data.message + `(${err.response.statusText})`
*             : err.message,
*           errorState: err.response ? `Status ` + err.response.status : err.code,
*         },
*       });
*       console.error(err.message);
*     }
*   };
* 
!   const fetchRequests = async () => {
!     try {
!       const res = await axios.get(BASE_URL + "/user/requests/received", {
!         withCredentials: true,
*       });
*       console.log(res.data.data);
!       dispatch(addRequests(res?.data?.data || []));
*     } catch (err) {
*       navigate("/error", {
*         state: {
*           errorMessage: err.response
*             ? err.response.data.message + `(${err.response.statusText})`
*             : err.message,
*           errorState: err.response ? `Status ` + err.response.status : err.code,
*         },
*       });
*       console.error(err.message);
*     }
*   };
* 
!   useEffect(() => {
*     fetchRequests();
*     // eslint-disable-next-line react-hooks/exhaustive-deps
!   }, []);
* 
!   if (!requests) return; //*early return
!   if (requests.length === 0)
*     return <h1 className="text-center text-3xl">No connection found</h1>;
* 
!   return (
!     requests && (
*       <div>
*         <div className=" flex justify-center mx-auto">
*           <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text * text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
*             Requests
*           </h1>
*         </div>
*         <div className="max-h-[1000px] max-w-[90dvw] min-h-[80dvh] lg:mx-auto * overflow-scroll border-2 border-cyan-400 px-2 py-6">
!           {requests.map((request) => {
*             return (
*               <div
!                 key={crypto.randomUUID()}
*                 className="mb-4 lg:mx-24 bg-base-300 rounded-4xl mx-6"
*               >
*                 <div className=" bg-base-300 rounded-4xl">
*                   <div
*                     role="alert"
*                     className="  alert bg-base-300 alert-vertical sm:alert-* horizontal"
*                   >
*                     <div className=" self-start">
*                       <img
*                         className="h-36 w-36 rounded-4xl"
*                         src={request.fromUserId.photoUrl}
*                         alt="Shoes"
*                       />
*                     </div>
*                     <div className="flex flex-col  align-">
*                       <h2 className="self-center md:self-start  card-title">
*                         {request.fromUserId.firstName +
*                           " " +
*                           request.fromUserId.lastName}
*                       </h2>
!                       {request.fromUserId.age && request.fromUserId.gender && (
*                         <p className="text-xs uppercase font-semibold opacity-* 60">{`Age: ${request.fromUserId.age} , ${request.fromUserId.gender}`}</p>
*                       )}
*                       <p className="text-white">{request.fromUserId.about}</p>
*                     </div>
*                     <div className="flex md:flex-col ">
*                       <button
!                         onClick={() => {
!                           handleReviewRequest("accepted", request._id);
*                         }}
*                         className="btn btn-sm btn-secondary lg:mt-2 my-2  mx-2"
*                       >
*                         Accept
*                       </button>
*                       <button
!                         onClick={() => {
!                           handleReviewRequest("rejected", request._id);
*                         }}
*                         className="btn btn-sm btn-primary my-2 mx-2"
*                       >
*                         Reject
*                       </button>
*                     </div>
*                   </div>
*                 </div>
*               </div>
*             );
*           })}
*         </div>
*       </div>
*     )
*   );
* };

*/

//! ⁢Season 2 - Episode - 19 - DevtinderUi Part-5
//! Connection request sending feature on the user feed
//* on the feed we are displaying UserCard components , with interested and ignore buttons , so as the same UserCard we are displaying on the profile edit page , so there we don't need these buttons so using a prop when we are displaying the user card component in the profile page we are not displaying the buttons but when we are displaying the card on the feed then we are displaying the buttons, so when we are on the feed page we want that, when the user click on the interested btn then a request should should send to him and when it gets ignored it gets saved with ignored status, so basically onClick of the button we will call the request sending api, to do that inside the userCard component we will create a handleSendRequest function this will received the status and the userId as arguments and then using the args it will call the api and then dispatch an action to remove the user so the to remove the user we will also add a action in the feed slice named removeFeedUser , which will remove that user from the feed array , so the handleSendRequest function in user card will look like:-
/*  const handleSendRequest = async (status, userId) => {
    console.log(userId);
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(removeFeedUser(userId));
    } catch (err) {
      navigate("/error", {
        state: {
          errorMessage: err.response
            ? err.response.data.message + `(${err.response.statusText})`
            : err.message,
          errorState: err.response ? `Status ` + err.response.status : err.code,
        },
      });
      console.error(err.message);
    }
};
  */
//* and the removeUser action in the feedSlice will look like:-

/* 
  * removeFeedUser: (state, action) => {
      //* returning all user objects except the user object to whom the connection request is sent(interested or ignored card). in action .payload we are sending the id of request sent user, and using the filter method we are filtering all the objects from feed array using the request sent user's id coming from action.payload, creating a new array where request sent user's object is not present. and returning the updated array.
*      const updatedFeed = state.filter((user) => user._id !== action.payload);
*      return updatedFeed;
    },*/

//* so the whole UserCard component will look like below:-
/*
const UserCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(props.feed);
  const {
    firstName,
    lastName,
    age,
    about,
    skills,
    photoUrl,
    gender,
    emailId,
    _id,
  } = props.feed;

  const { buttonDisplay, emailDisplay } = props;

  const handleSendRequest = async (status, userId) => {
    console.log(userId);
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(removeFeedUser(userId));
    } catch (err) {
      navigate("/error", {
        state: {
          errorMessage: err.response
            ? err.response.data.message + `(${err.response.statusText})`
            : err.message,
          errorState: err.response ? `Status ` + err.response.status : err.code,
        },
      });
      console.error(err.message);
    }
  };

  return (
    <div className="  self-center card bg-base-300 w-96 shadow-sm m-2">
      <figure>
        <img className="h-72 w-92" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {emailDisplay && <p className="text-white">Email id:- {emailId}</p>}
        {age && gender && (
          <p className="text-xs uppercase font-semibold opacity-60">{`Age: ${age} , ${gender}`}</p>
        )}
        <p className="text-white">{about}</p>

        <div className="mb-1">
          <ul className="menu menu-horizontal bg-base-200 rounded-box">
            <li className=" text-lg font-bold mr-1">Skills:-</li>
            {skills &&
              skills.map((skill) => (
                <li
                  key={crypto.randomUUID()}
                  className="btn-sm mb-1 mx-1 bg-green-400 text-black p-1 font-bold rounded  "
                >
                  {skill}
                </li>
              ))}
          </ul>
        </div>
        {buttonDisplay && (
          <div className="card-actions justify-center ">
            <button
              onClick={() => {
*               handleSendRequest("ignored", _id);
              }}
              className="btn btn-primary"
            >
              Ignore
            </button>
            <button
              onClick={() => {
*                handleSendRequest("interested", _id);
              }}
              className="btn btn-secondary ml-2"
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
*/
//* now in the feed component we will already written the logic of fetching the feed users, and saving the users array in the user slice, but this fetchFeedData function only fetch the data of 10 user so , when the feed array becomes empty,we need a condition to load again new feed users so we written then logic , to show  a skeleton card with button on click this skelton or btn it will again call the fetchFeedData function and update the feed, and also we have to write the logic when there are now new users remaining then api will respond empty array so then setting the feed to null, which will display , no new users found message .
//* so in the fetchFeedData function we added a condition , that if the api responded empty array then set the feed slice value to null, but when response array has data , then add feed users to the feed slice like below:-
/* in fetchFeedData function
 *     res.data.data.length === 0
 *        ? dispatch(addFeed(null))
 *        : dispatch(addFeed(res.data.data));
 */

//* logic to show the skeleton card  when feed array is empty , so fetch new users
/*
  if (feed.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center mx-auto">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          Load new users
        </h1>

        <div
          onClick={() => {
            fetchFeedData();
          }}
          className="flex w-74 flex-col gap-4 mt-4"
        >
          <div className="skeleton h-44 w-full"></div>

          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <button className="btn btn-primary bg-cyan-400 p-2 text-black ">
            Show New Users
          </button>
        </div>
      </div>
    );
  }
*/
//* logic to show no new users found when the api responded empty array and feed slice is set to null
/*
  if (!feed) {
    //* Early return
    return (
      <div className=" flex justify-center mx-auto">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          No new Users Found
        </h1>
      </div>
    );
  }
  */
//* so the whole feed component will look like:-
/*
 const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const fetchFeedData = async () => {
    //! when we are making a get call, we don't pass anything inside body as it is a get call , so second param for body which is a { } is not required, so for get call second param will be object for options where can set the withCredentials to true, but for post call always the second param will be for request body, and third param will be for options.
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      console.log(res);
      //* adding data to the store(feedSlice)(when there is no new user is found and api responded empty array them setting the feed state to null which will show no new users found message)
      res.data.data.length === 0
        ? dispatch(addFeed(null))
        : dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
      navigate("/error", {
        state: {
          errorMessage: err.response
            ? err.response.data.message + `(${err.response.statusText})`
            : err.message,
          errorState: err.response ? `Status ` + err.response.status : err.code,
        },
      });
      console.error(err.message);
    }
  };

*  useEffect(() => {
    fetchFeedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
*  }, []); //* empty dependency array to render it only on first mount

  if (!feed) {
    //* Early return
    return (
      <div className=" flex justify-center mx-auto">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          No new Users Found
        </h1>
      </div>
    );
  }

 * if (feed.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center mx-auto">
        <h1 className=" w-62 font-bold text-3xl text-center my-4 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
          Load new users
        </h1>

        <div
          onClick={() => {
            fetchFeedData();
          }}
          className="flex w-74 flex-col gap-4 mt-4"
        >
          <div className="skeleton h-44 w-full"></div>

          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <button className="btn btn-primary bg-cyan-400 p-2 text-black ">
            Show New Users
          </button>
        </div>
      </div>
    );
  }

  return (
*    feed && (
*      <div className="flex justify-center ">
*        <UserCard feed={feed[0]} buttonDisplay={true} emailDisplay={false} />
*      </div>
*    )
  );
};
*/
//! ⁢Season 3 - Episode - 7 - Payment gateway integration
//* this lesson is also written in the backend allLessonNotes.js file.
//* we will create a premium purchase feature where will integrate  razorpay to get the payments,, so mainly there are two steps one is creating the order, second is payment verification.
//* so every thing does not happen from the frontend , there is a secret key in the backend using which every thing happens.
//*then we will go to razorpay and sign up and provide the kyc details to verify, it is safe to provide.
//* razorpay payment process(see :-src\images\razorpay payment process.png)
//*1.when user click on pay now button on website, Frontend will make api call to backend to create a order in razorpay, because frontend can't directly talk to razorpay, because secret key is only available  on backend .
//*2.backends makes a api call, to razorpay with secret key to create a order
//*3. razorpay creates a order id and send back to backend
//*4. backend sends order id to the frontend,this order id is public is it is safe to send to frontend
//*6. when payment is done,then razorpay immediately notifies,the backend using a webhook and send a payment id with signature and backend verify  the payment using payment id and signature.
//*7. Then front end ask to Back end making an api call if the payment is completed Or not
//*8. Backend completed verification that time, it return frontend response to frontend that verification .
//*so first we will create a route for premium page in the frontend,we will create using some user cards for buying premium feature, then we will go to razorpay doc page. here:-https://razorpay.com/docs/payments/server-integration/nodejs/

//* here they mentioned we have to first install razorpay package in the backend using command - npm i razorpay
//* then backend , we will create a payment.js route in  routes folder and create create a route and export it.and then create a api named /payment/create post api.
//*then we will go to razorpay doc page. here:-https://razorpay.com/docs/payments/server-integration/nodejs/

//* here they mentioned we have to first install razorpay package in the backend using command - npm i razorpay
//* we will create a payment.js route in side routes folder and create create a route and export it.and then create a api named /payment/create post api.
//* the here in this page they page integration steps:-https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/
//*1. Instantiate Razorpay :- inside the utils folder we will create a razorpay .js config file, and there we will write this code:-
/*const instance= require("razorpay")
var instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});
module.exports = instance;
*/
//* we get the keys from accounts and setting in razorpay
//* now we will go to payment.js import this instance and then create an order inside the api, and save that to database and send the response to ui, ,so to save the order in db we created a a schema inside model/payments.js like below:-

/*const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentId: {
      type: String,
      sparse: true,
    },

    notes: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      membershipType: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
*/
//* and the payment api will look like below in routes/payments.js
/*const express = require("express");
const razorpayInstance = require("../utils/razorpay");
const paymentRouter = express.Router();
const Payment = require("../models/payment");
const { userAuth } = require("../middlewares/auth");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    //*creating an order
    const order = await razorpayInstance.orders.create({
      amount: membershipAmounts[membershipType], //* amount in the smallest currency unit/* this is coming from constants.js file, depending on what membership user chosen in frontend
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        membershipType: membershipType,
      },
    });
    //*save it in my database
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      notes: order.notes,
    });
    const savedPayment = await payment.save();
    //*send order details to frontend
    res.json({
      ...savedPayment.toJSON(),
    });
  } catch (err) {
    res.status(400).json({ message: "something went wrong:-" + err.message });
  }
});
module.exports = paymentRouter;
*/
//* in the frontend in premium.jsx we will create a handleBuyClick click function and call on buy gold or silver btn click like below:-
/*  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: plan },
      { withCredentials: true }
    );
    console.log(order);
  }*/
/*      <button
                onClick={() => {
*                  handleBuyClick("silver");
                }}
                className="btn btn-primary btn-block"      Buy silver
              </button>
              >*/

/*
<button
                onClick={() => {
*                  handleBuyClick("gold");
                }}
                className="btn btn-secondary btn-block"
              >
                Buy Gold
              </button>*/

//* in the frontend index.html we have to add this script
//*  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>,this will access to the razorpay object using window.Razorpay that we will need after some time,
//* then in the frontend handleBuyClick function after getting the order from backend we will call the razorpay checkout method to open the razorpay payment window like below:-const handleBuyClick = async (plan) => {
/*
  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: plan },
      { withCredentials: true }
    );
    console.log(order);

    //* opening payment diallage box 
    const { amount, currency, keyId, notes, orderId } = order.data;
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits.
      currency: currency,
      name: "Dev Connect",
      description: "Test Transaction",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#0000cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
*/
//* now we can test the feature of opening the dialog box;

//! payment verification using webhook
//* to verify the payment we will use webhook feature of razorpay, so whenever a payment is done successfully, razorpay will send a post request to our webhook url with the payment details.
//*what is webhook:- A webhook is a way for an application to provide other applications with real-time information. A webhook delivers data to other applications as it happens, meaning you get data immediately. Unlike typical APIs where you would need to poll for data very frequently in order to get it real-time. So basically whenever a payment is done successfully razorpay will send a post request to our webhook url with the payment details, then we can verify the payment using the signature sent by razorpay in the headers of the request using crypto module of nodejs.

//* so first we will create a webhook url inside razorpay dashboard, to do that  we have to go to the - Razorpay Dashboard > Settings > Webhooks > Add New Webhook. So here we will add our webhook url like :- http://yourbackenddomain.com/payment/webhook (for local testing we can use ngrok to create a public url for our localhost) , and add a password and select payment failed & payment capture option and click on create webhook. so whenever there will be successful transaction this webhook will be called by razorpay with payment details.
//* so to use this webhook we will go to razorpay doc :- https://razorpay.com/docs/webhooks/validate-test/#validate-webhooks
//* click on node js option so we will see the sample code and we will copy it and use it to build our webhook api,
//*we will come to the backend and open routes/payments.js file and create a post api named same as the route we used while creating the webhook,and we will not mention userAuth in this api because this will be called by razorpay server not by the user .
//* as we can't see the webhook req.body in localhost without ngrok , so we to see how the request body will look like we can use go to this razorpay link and see the sample payload:- https://razorpay.com/docs/webhooks/payments/#payment-authorised
//* so our api will look like below:-
/*
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"]; //* getting the signature sent by razorpay in headers

    //* below function validateWebhookSignature will return true or false
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    ); //*first param webhook body, will sent by razorpay in req.body , second param is signature sent by razorpay in headers, third param is our secret key which we have set in env file. if someone tries to send some malicious information to our webhook endpoint then this validateWebhookSignature

    //* if webhook is not valid then we will return 400 status code
    if (!isWebhookValid) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }
    //!updating the payment status in our database
    const paymentDetails = req.body.payload.payment.entity; //* getting payment details from webhook payload.we can see the how req.body looks like in razorpay doc :- https://razorpay.com/docs/webhooks/payments/#payment-authorised
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id }); //* finding the payment in our database using orderId.
    if (payment) {
      //* if payment found then we will update the payment status in our database.
      payment.status = paymentDetails.status; //* updating the payment status
      await payment.save(); //* saving the updated payment
    }

    //* updating the user as premium user
    if (paymentDetails.status === "captured") {
      const user = await User.findOne({ _id: payment.userId });
      user.isPremiumUser = true;
      user.membershipType = payment.notes.membershipType;
      await user.save();
    }

    //* sending 200 status code to razorpay to acknowledge that we have received the webhook (important step otherwise razorpay will keep sending the webhook again and again)
    res.status(200).json({ message: "Webhook received successfully" });
  } catch (err) {
    res.status(400).json({ message: "something went wrong:-" + err.message });
  }
});
*/
//*---------------------------------------
//* after updating the the database , we will now also have to mark the user as premium user, so we will go to user model and add a new field named isPremiumUser with default value false and memberShipType field with no default value in the User Schema
/*
    isPremiumUser: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
    */
//* and then only we can update the user and call the api.

//*-----------------
//! now after updating the payments details and user details in the database and sending back the response to razorpay server with status 200 we will create a api to verify the membership status of the loggedInUser,WE WILL CALL THIS FROM THE FRONTEND.like below:-
/*paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  try {
    const user = req.user.toJson(); //* toJson() method will give plain js object
    //* check if the user is premium user and send the response to frontend
    if (user.isPremiumUser) {
      return res.json({
        isPremiumUser: true,
        membershipType: user.membershipType,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "something went wrong:-" + err.message });
  }
});
*/
//* in the frontend , now we now we will premium.jsx and write verifyPremiumUser  function like below:-
/*
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      if (res.data.isPremiumUser) {
        setIsPremiumUser(true);
        setPremiumStatus(res.data.membershipType);
      }
    } catch (error) {
      console.error("Error verifying premium user:", error);
    }
  };*/
//* and inside the handlebuyclick function which we already created, after opening the razorpay dialog box we will call this verifyPremiumUser function to update the premium status of the user in the frontend after successful payment , so in the options we will just mention the handler:verifyPayment function like below. and it will be automatically called.  like below:-
/*
  const handleBuyClick = async (plan) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: plan },
      { withCredentials: true }
    );
    console.log(order);

    //* opening payment diallage box
    const { amount, currency, keyId, notes, orderId } = order.data;
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount: amount, // Amount is in currency subunits.
      currency: currency,
      name: "Dev Connect",
      description: "Test Transaction",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
      },
      theme: {
        color: "#0000cc",
      },
!      handler: verifyPremiumUser,//* this will be automatically called after payment is verified
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
*/
//* and inside the verifyPayment function when as we got the response if the user premium, we created a state variable named isPremiumUser and set it to true and also set the membershipType state variable to the membershipType received from backend.like below:-
/*
      if (res.data.isPremium) {
        setIsPremiumUser(true);
        setPremiumStatus(res.data.membershipType);
      }
      */
//* and depending the value of this isPremiumUser state variable we will show premium badge profile page of the user. and also if the user goes to premium section then also he will see that he is a premium user.
//* and in the premium.jsx page we will also write a useEffect to call this verifyPremiumUser function when the component is mounted for first time so whenever the user is again opening the website later some time this useEffect will be called and it will fetch the premium status i th user is already a premium user  ,  like below:-
// useEffect(() => {
//   verifyPremiumUser();
// }, []); //* to run only once on component mount and load the premium status
//* but as we implemented , the verified tick for premium user, so let's say the user is opening the website after some days, ,so in his profile section and in the nav bar, if the user is premium user already then before even opening the premium page we want still want to show the , premium badge, so in the nav bar component we subscribed both the user slice and the premium slice, so either the user just activating the subscription or already a premium user and and coming after some time in both cases the badge gets displayed, and in the edit profile section we only subscribed to premium slice, because when we first activating the subscription then only premium slice updates , so to display the badge in navbar adding both slices is required, but in editProfile section that is not required.
//!ScrollingToTop component
//* when we were in the connection component then when we were scrolling to the middle portion to find any connection and open chat of that connection then while chat page was opening chat page also opening from the middle portion but we wanted that when the route change happen then the chat page should open from the top and not scrolled , so we added a scrollingToTop component inside components folder, and written below code:-
/*
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Use 'instant' for no animation
    });
  }, [pathname]); // Re-run the effect when the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
*/
//* then in app.jsx file we added this ScrollingTo top component and now it is working as expected, we written the ScrollToTop component in app.jsx like below:-
/*
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
!          <ScrollingToTop /> //* always we have to write it here above,<Routes></Routes> component
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/error" element={<Error />}></Route>
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/requests" element={<Requests />}></Route>
              <Route path="/premium" element={<Premium />}></Route>
              <Route path="/chat/:targetUserId" element={<Chat />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
*/

//! ⁢Season 3 - Episode - 8 - Building Real-time Live Chat Feature
//* season 3 other episodes are about hosting the backend and frontend  , sending emails using aws ses,payment gateway integration with razorpay, so we will host in another place as aws want credit card details, and razorpay we have integrated , so we will build the live chat feature using socket.io .
//*What is Socket.IO ?
//*Socket.IO is a library that enables low-latency, bidirectional and event-based communication between a client and a server.
//* remember these three words ,it enables low latency, bidirectional, event based communication.
//* low latency means the connection is fast,
//* Bidirectional sockets allow data to flow both ways (send/receive) over a single connection, ideal for real-time interaction (like chats, WebSockets), while unidirectional sockets permit data flow in only one direction, used for simpler tasks like monitoring or logging where one side sends data and the other just listens.
//*Event-based communication in socket connections means it uses an event-driven model where the client and server exchange named events (like 'userTyping', 'messageReceived') over an open, persistent connection (often WebSockets) instead of traditional request/response, allowing for real-time, low-latency, bidirectional data flow, ideal for chat apps or collaborative tools. It relies on an event loop: waiting for events, executing handlers (like socket.on('event', handler)), and emitting new events (like socket.emit('event', data)).
//* in the connections page of frontend, we will build a chat feature so, we will need a separate component for that, so first we will create a chat component, add the route link of the chat component in the app.js file as /chat:targetUserId ,here targetUserId will be dynamic,for each user so we can mark with which user the logged in user is chatting so the targetUserId is the id of user we will chat, let's say we want to chat with mark zukerberg to so in that case targetUserId will be the userId of mark, , in the connections page , for every user , we will add a chat btn, which will take us to the chat page and we will send the user's id dynamically,like below:-
/* <Link to={"/chat/" + connection._id}>
                    <button className="btn btn-secondary" type="button">
                      Chat
                    </button>
                  </Link>
*/
//* then in the chat component , we will receive this userId using the useParams hook
//*  const targetUserId = useParams(); //* to gets access to the params sent through the url path,
//* websocket is connection between server and client so it's bidirectional connection and that's why socket.io gives us two kind of docs one for client and one for server , so one is server api and one client api.
//* in backend
//* first we will write code for backend, so we will require the http module already available on node in app.js
//* for socket io connection requiring http module
//! const http = require("http");
//* then before app.listen() we will create a server using http module
//* creating a server for socket io connection using the http.createServer() and passing the express app into it.
//! const server = http.createServer(app); //* after creating it instead of app.listen() now we will can server.listen(),
//* then we will create a server.js file inside utils folder , and initialize socket inside socket.js like below:-

//*initializing the the socket
/*
const initializeSocket = (server) => {
  //* initializing the socket connection by passing the server and cors configuration
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  });
  //* listening for the socket requests
  io.on("connection", (socket) => {
    //*handling events
    socket.on("joinChat", () => {
      
    });
    socket.on("sendMessage", () => {
      
    });
    socket.on("disconnect", () => {
      
    })
  })
};*/
//* exporting this function
//* module.exports = initializeSocket

//* then we will comeback to app.js and import the initializeSocket function and  after where we created server using httpCreateServer, we will call this initializeSocket function and pass the server as argument like below:-
//!initializeSocket(server); //* after creating this initializeSocket function inside utils/sockets.js we imported in app.js and called it with passing the server as argument.

//* then instead of app.listen() using server.listen()
/*
!server.listen(port, () => {
  console.log("server is listening successfully on port 3000");
}); */ //! as we created socket io connection we provided app(express app) into http.createServer(app), then only instead of app.listen() we can write server.listen(), if we don't need socket io connection then we can still write app.listen , it will still work but socket will not work.

//* this is the configuration we need for socket, so the server we created using http.createServer(app),

//* ------------------frontend
//* now we have to back to the frontend and install the frontend socket io package in frontend , using the npm install socket.io-client
//*then documentation we can go to client api option, beside server api. so as mentioned in doc, we will come back to the frontend then inside utils folder we will create a socket.js file and then we will import it , and create a socket connection like below:-
//* import { io } from "socket.io-client";
//*import { BASE_URL } from "./constants";

/*export const createSocketConnection = () => {
  return io(BASE_URL)
};*/
//* then comeback to the chat.js file and write a useEffect with  dependency array where we will mention userId and targetUserId so whenever any of this changes this useEffect gets called and then import the createSocketConnect and then call it inside the useEffect then save its value into a socket constant then, below it we will emit and event . so the event name should be same as we written in the backend , so in the backend we written a event jointChat so we will call that event and and mention and targetUserId and the loggedInUser's id , and also write a clean up function to disconnect the connection when the user leaves the chat , so when the chat component gets unmounted,  like below:-
/*
const user = useSelector((store) => store.user);
  const userId = user?._id; //* writing optional chaining is important here react, render every in multiple cycles that;s why as initially the value of user store will be empty so, if we don;t write optional chaining then it will through error

  //* creating connection with backend and then emitting event to jointChat ans passing both targetUserid amd loggedinUserId,
  useEffect(() => {
    if (!userId) return; //* if the userId is not yet loaded do early retrun so it does not through any error
    const socket = createSocketConnection();
    //* as soon as the page loaded, the socket connection is made and join chat event is emitted
    socket.emit("jointChat", { userId, targetUserId });

    //* clean up function for disconnecting the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);
   */

///**--------backend */
//* in the backend we will go to the utils/socket.js inside joinChat event handler we will write code to create a separate room to having the chat between two users like below:
/*
    socket.on("joinChat", ({ userId, targetUserId }) => {
      //* like two have a conversation between two people there should separate room , similarly we need to create separate roomId to chat using socket io, which should be unique, because we can't mix, other people's conversation that's why we are getting the targetUserId and userId to create a separate roomId,

      const roomId = [userId, targetUserId].sort().join("_");
      console.log("Room Id:" + roomId);
      socket.join(roomId);
    });
    */
//* so, when two people are chatting the roomId should same then only they can chat , and as we written .sort method before .join method then only it will be same .like this:-  const roomId = [userId, targetUserId].sort().join("_");
//* now it will work as expected , so both roomIds are same because of sort() method;
//* as the roomId is same for both user's so they can connect with each other ,safely , and the chat will not connect to others , it will be between two users only,
//* now we can add a state variable in chat component then add that as the input value like below:-
/*
 * const [newMessage, setNewMessage] = useState("");//* to get the value user is typing in the input box
       <input
              className="inline p-2 m-2 lg:w-[94%] w-[85%] border-2 border-amber-50"
              type="text"
!              value={newMessage}
!             onChange={(e)=>{setNewMessage(e.target.value)}}
            />
*/
//* now we will write a sendMessage function which will be called when the user will click on send message icon ,
//* function to send message to server on click of send message icon
/* const sendMessage = () => {
    const socket = createSocketConnection();
    //* sending name,userId,targetUserId,text to the server
    socket.emit("sendMessage", {
      firstName: user?.data?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };*/
//*---------backend
//* now in backend socket.js we will receive , the this event and that same id so the message can reach to the same user, and also emit a new event to send it another user the text message
/*
socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      //* client is sending the message through this sendMessage event now we have send it to another user we have to send this message another user so  we have again send it to the same room
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName + " " + text);
      //* sending message from the server to another client in the same roomId  by emitting this new "messageReceived" event, and we are sending the firstName and the message.
      io.to(roomId).emit("messageReceived" + [firstName, text]);
    });*/

//! for production upload, change the constants url to actual one, before making the dist folder
