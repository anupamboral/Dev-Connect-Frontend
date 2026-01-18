export const BASE_URL = "https://dev-connect-backend-2-0pim.onrender.com";
// console.log(BASE_URL);
//* for test using localhost change the url to   "http://localhost:3000"; OTHER WISE , vercel HOSTED URL :-"https://dev-connect-backend-sand.vercel.app"
//* render hosted url :- https://dev-connect-backend-2-0pim.onrender.com

//* as for dev mode webhook url for razorpay we need to use ngrok url , so for dev mode use the below url here:-"http://localhost:3000";
//* and in the backend you have to run two commands while testing on ngrok:- ngrok config add-authtoken 378VodOLglTOv7N9w27wNubPyhX_7pPsrCWRJxL9EKXQ77KmE
//* ngrok http 3000
//* then run the backend dev server using npm run dev by adding another terminal, with ngork running in background. and as we already use the ngrok url in razorpay webhook settings so that is not needed.

/*
🚀 Excited to share my latest project: Dev-Connect! 💻✨

Most social platforms aren't built for the way developers actually work. They are either too noisy or lack the real-time collaboration we need.
That’s why I built Dev-Connect—a full-stack ecosystem designed to bridge the gap between "adding a connection" and actually collaborating.
Building this with the MERN Stack was more than just a coding exercise, it was a deep dive into solving high-concurrency challenges and scalable architecture.

How I optimized the experience:
• Performance First: Nobody likes a laggy chat. I implemented Limited Chat Loading—fetching the last 30 messages initially with a "Load Previous" trigger to keep the UI snappy even with massive histories.
• Real-Time Synergy: Using Socket.io, I built instant messaging with live "Online/Last Seen" status—because timing is everything in dev collaboration.
• The "Verified" Experience: Integrated a full Razorpay subscription flow (Test Mode). Pro users get the "Verified Blue Tick" instantly—simulating a real-world SaaS monetization model.
• Global State: Managed complex data flows seamlessly using Redux Toolkit.

🌟 Key Features:
💻 Networking Hub: Create a professional profile, send/accept/reject connection requests, and build your developer circle.
⚡Real-Time Chat: Integrated Socket.io for instant messaging, featuring Online/Last Seen status and auto-scroll functionality.
⚙️Optimized Performance: Implemented Limited Chat Loading. The app loads the last 30 messages initially, with a "Load Previous messages"  option to fetch older chats, ensuring smooth performance even with long histories.
💳 Premium Subscriptions: Integrated Razorpay (Test Mode). Users can experience the full Gold/Silver subscription flow. Once "purchased," a Verified Blue Tick is instantly added to the profile!


🛠️ Technical Stack:
Frontend: React.js, Tailwind CSS, Redux Toolkit
Backend: Node.js, Express.js
Database: MongoDB
Real-time: Socket.io
Payments: Razorpay API

🔗 Live Demo: https://dev-connect1234.netlify.app/
📂 Frontend Repo: https://github.com/anupamboral/Dev-Connect-Frontend
📂 Backend Repo: https://github.com/anupamboral/Dev-Connect-Backend

This project allowed me to tackle complex challenges like managing asynchronous states and optimizing database queries for chat pagination. I'd love for you to check it out and share your feedback!

Special thanks to Akshay Saini 🚀 to create "Namaste Node js" course which has given so much knowledge about full stack development and help me to build this great project , giving me new feature ideas which I have implemented.

#MERNStack #WebDevelopment #ReactJS #NodeJS #FullStackDeveloper #SocketIO #ReduxToolkit #PortfolioProject #CodingCommunity #Razorpay #MongoDB #SoftwareEngineering
*/
