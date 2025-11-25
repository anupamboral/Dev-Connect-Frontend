//! ⁢Season 2 - Episode - 15 - DevtinderUi Part-1
//* we created this project using command -  npm create vite@latest dev-connect-frontend -- --template react
//* to design our ui we will use tailwind css and diasy ui(a component library compatible with daisy ui.)
//* then installed tailwind seeing it's doc.
//* only after installing we can daisy as it's is interconnected , so let's go to daisy ui 's website and install daisy ui.using the command :-npm i -D daisyui@latest and in the css file we have to add:- @plugin "daisyui";
//* in the left side navigation of daisy ui we will find navbar inside the components , so we will go inside the navbar and and see there is a "Navbar with search input and dropdown" so we will copy the jsx code of that (not html),and paste that inside the app.jsx file. and we will see a that in the ui the navbar is added into our ui.
//* to change colors we can go to left side nav bar and go inside colors and all color guide in there,
//* For Navbar we will create a separate component and put the code inside it, and then import that component inside the app.jsx and inside the app component we will put the navbar component.

//* Routing
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
<input
  type="text"
  className="input"
  placeholder="email@.com"
  value={emailId}
  onChange={(e) => {
    setEmailId(e.target.value);
  }}
/>;
<input
  type="text"
  className="input"
  placeholder="TypeStrongPass@234"
  value={password}
  onChange={(e) => {
    setPassword(e.target.value);
  }}
/>;
//* this will keep track of what the user is typing;

//* now to make a api call to our server we will use a library named axios, previously we used  fetch api to make api calls , but this time we will use another library name axios for making api call, actual the axios syntax for making api call is smaller that fetch api call , first in the button of sign in , we will write a onclick handler and mention a handle login function, like below:-
/*
 <button className="btn btn-primary flex " onClick={handleLogin}>
              Log In
            </button>
            */
//* in the above portion now we will create this jandle login function:-
//* so if we would create it using fetch api it would look like:-
const handleLogin = async () => {
  try {
    const requestOptions = {
      method: "POST",
      credentials: "include", //* for setting up/storing cookies(token) in browser
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailId: emailId,
        password: password,
      }),
    };
    const res = await fetch("http://localhost:3000/signin", requestOptions);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
};

//* but if we create this handleLogIn function using axios then it will look like(but it will not set cookies in the browser):-
import axios from "axios";

const handleLogin2 = async () => {
  try {
    const data = await axios.post("http://localhost:3000/signin", {
      emailId,
      password,
    });
    console.log(data.data);
  } catch (err) {
    console.error(err.message);
  }
};
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
//* if we would use fetch api then we had use, credentials: "include",inside the options , below method:"POST",as property.
