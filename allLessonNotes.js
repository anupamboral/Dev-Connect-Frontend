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
