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
