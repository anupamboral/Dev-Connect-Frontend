export const BASE_URL = "https://dev-connect-backend-2-0pim.onrender.com";
// console.log(BASE_URL);
//* for test using localhost change the url to   "http://localhost:3000"; OTHER WISE , vercel HOSTED URL :-"https://dev-connect-backend-sand.vercel.app"
//* render hosted url :- https://dev-connect-backend-2-0pim.onrender.com

//* as for dev mode webhook url for razorpay we need to use ngrok url , so for dev mode use the below url here:-"http://localhost:3000";
//* and in the backend you have to run two commands while testing on ngrok:- ngrok config add-authtoken 378VodOLglTOv7N9w27wNubPyhX_7pPsrCWRJxL9EKXQ77KmE
//* ngrok http 3000
//* then run the backend dev server using npm run dev by adding another terminal, with ngork running in background. and as we already use the ngrok url in razorpay webhook settings so that is not needed.
