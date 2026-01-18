# 🚀 Dev-Connect (Frontend) 💻✨

[![React Version](https://miro.medium.com/v2/resize:fit:120/format:webp/1*TjqzfCJHJR8N_sMs_mQuYQ.png)](https://react.dev/)
[![Tailwind CSS](https://miro.medium.com/v2/resize:fit:120/format:webp/1*06aiW0D5wbI1PBjSfMJlYw.png)](https://tailwindcss.com/)
[![Redux Toolkit](https://miro.medium.com/v2/resize:fit:120/format:webp/1*U9PxBg3vOytwuWO3IBiEVA.png)](https://redux-toolkit.js.org/)

**Dev-Connect** is a dynamic, full-stack social networking platform built for the developer community. This frontend provides a sleek, responsive user interface for networking, real-time messaging, and subscription management.

---

## 🛠️ Technical Stack

- **Framework:** [React.js](https://react.dev)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) (Mobile-first, responsive design)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org) (Global state & async thunks)
- **Real-time Interaction:** [Socket.io-client](https://socket.io)
- **Payment Gateway:** [Razorpay Web Integration](https://razorpay.com)
- **HTTP Client:** [Axios](https://axios-http.com)

---

## 🌟 Key Features

### 🧑‍💻 Networking Hub

- **Dynamic Profiles:** View developer portfolios, including bio, skills, and professional details.
- **Connection Requests:** Seamlessly send, accept, or reject requests to build your developer circle.
- **Intelligent Feed:** Browse a curated feed of potential connections filtered for relevance.

### 💬 Real-Time Chat Experience

- **Instant Messaging:** Real-time chat powered by **Socket.io**.
- **Presence Tracking:** View **Online** and **Last Seen** status of your connections.
- **Auto-Scroll:** Smooth UI that automatically scrolls to the newest message.
- **Smart Loading:** Initially loads the last 30 messages to ensure performance, with an option to fetch older history.

### 💎 Premium Experience

- **Verified Blue Tick:** Instantly gain a **Blue Verified Badge** 🔵 on your profile upon purchasing a subscription.
- **Razorpay Flow:** A complete frontend checkout experience for Gold and Silver tiers (Test Mode enabled).

---

## 📂 Frontend Architecture

### **State Management (Redux Toolkit)**

The application uses Redux Toolkit to handle complex global states, including:

- **Auth State:** Manages user sessions and profile persistence.
- **Feed State:** Handles loading and updating the developer discovery feed.
- **Connection State:** Real-time updates for accepted/rejected requests.

### **UI Components & Optimization**

- **Responsive Design:** Fully optimized for mobile, tablet, and desktop using Tailwind utility classes.
- **Conditional Rendering:** Sophisticated UI states for loaders, empty feeds, and verified badges.

---

## 📥 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com
cd Dev-Connect-Frontend
```

2. Install Dependencies

```bash
npm install
```

3. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
```

## 🔗 Project Links

- **Backend Repository:** [Dev-Connect-Backend](https://github.com/anupamboral/Dev-Connect-Backend)
- **Live Demo:** [Dev-Connect App](https://dev-connect1234.netlify.app/)

### 🌟 Acknowledgments

- A special thanks to **Akshay Saini 🚀** for the **Namaste React and Namaste Node.js** series, which provided the expertise to build this comprehensive **full-stack application**.
- Developed with **❤️** by **_Anupam Boral_**
