// @ts-nocheck
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { getFormattedLastSeen } from "../utils/lastSeenTimeAgo";
import { formatChatTimestamp } from "../utils/chatTimeStampFormater";
// Optimized import: only loads the throttle logic (~2KB vs ~70KB for full lodash)
const Chat = () => {
  const { targetUserId, friendUserName } = useParams(); //* to gets access to the params sent through the url path
  // console.log(targetUserId);
  const [newMessage, setNewMessage] = useState(""); //* to get the value user is typing in the input box
  const [messages, setMessages] = useState([]); //* though we wanted the initial value to be empty array, but only writing [] means vs code will interpret to never[] which will let set any value to to it so , it don;t assume it never[] , that's why we written  a object , we can also write any other thing inside the [] , so it does not assume it as never[], which will restrict us to  add any value.

  const user = useSelector((store) => store.user);
  const userId = user?.data?._id; //* writing optional chaining is important here react, render every in multiple cycles that;s why as initially the value of user store will be empty so, if we don't write optional chaining then it will through error
  // console.log(user);
  // console.log(userId);

  //! //////////////////////////////////////////
  //! (1. function to load previous chats ,2.Maintain Scroll Position after Prepending History, 3. New implementation of scroll to bottom when new message gets added )

  //* skip state variable to send the messages skip value , depending on this skip value and LIMIT constant value ,we will fetch the chat history , also for initial chat load and also for when user will click on "Load Previous Messages" button.
  const [skip, setSkip] = useState(30); //* while fetching messages in the initial component mount we will  manually pass the  skip  value as 0 , inside a useEffect with empty dependency array to call it when ever the chat component loads first time to fetch the chat messages, but when but first history load will happen then the skip should be 30 to skip first 30 messages which are already fetched in the previous call, and in every call of fetchChatMessages function we will also update the skip value by adding the currentSkip+LIMIT , currentSkip is parameter of fetchChatMessages function .
  const LIMIT = 30; //* to set the number of messages we want to fetch in single chat api call.
  const [hasMore, setHasMore] = useState(true); //* To track either any messages are remaining to fetch or not, initially it will be true , so we can display the "Load Previous Messages" button , to load more messages , but whenever the chat api call will happen either in the initial component mount or while prepending the history on click of the button, every time we will check , if the returned chat messages array length is shorter that LIMIT we passed on the api call, if it is shorter that means there are no more messages remaining the db to fetch, so we will set this hasMore state variable's value false , because database has no more messages to send , and when hasMore's value is false , we will display at the top that it is the "starting of the chat" instead of  "Load Previous Messages" button .

  const scrollRef = useRef(null); //* to keep track of chat container , so scroll bottom can happen when new messages gets added into chat container, and also to  maintain Scroll Position without scrolling after Prepending History(both scrollRef and previousScrollHeightRef declared below will be used to maintain it )
  const previousScrollHeightRef = useRef(0); //* to maintain Scroll Position without scrolling after Prepending History on click  of "Load Previous Messages" button
  const isHistoryLoading = useRef(false); //* to track if we are prepending history on click of "Load Previous Messages" button, if we are prepending history then we will set it to true , because when it will be true , in that case we will not do scroll bottom of the container as it is not required, but in other case , as it will be false then only scroll bottom can happen because that case will either the adding of new message or initial chat load which happens on chat component mount.

  //!1. function to load previous chats
  const fetchChatMessages = async (currentSkip, isInitial = true) => {
    console.log(currentSkip);
    const chat = await axios.get(
      BASE_URL +
        "/chat/" +
        targetUserId +
        "?skip=" +
        currentSkip +
        "&limit=" +
        LIMIT,
      {
        withCredentials: true,
      }
    );
    console.log(chat.data);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;

      //* to convert time utc format to indian format, while fetching old messages and when we are live sending messages then we will just display current time and not data because obviously it will be current day, so only showing current time is enough
      const utcTimeString = createdAt;
      const date = new Date(utcTimeString);
      const istFormatTime = date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Set to false if you want 24-hour format
      }); //* Example Output: "30/12/2025, 01:27 pm"
      //////////////////*
      const { date: formattedDate, time: formattedTime } =
        formatChatTimestamp(istFormatTime);
      console.log(formattedDate);

      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text: text,
        time: formattedTime,
        date: formattedDate ? formattedDate : null,
      };
    });
    //* when we will fetch old messages using the "Load Previous Messages" button , then if the returned response contains less messages than the Limit we set then setting hasMore State variable to false, and using this hasMore state variable , we will Show In Ui that it is the begging of the messages, otherwise we will show the "load previous messages button".
    if (chatMessages.length < LIMIT) setHasMore(false);
    // console.log(chatMessages);
    //* adding all chat messages to the state variable
    // setMessages(chatMessages);

    if (isInitial) {
      //* initial chat messages loading block{}
      // console.log("IsInitial");
      setMessages(chatMessages);
    } else {
      //* PREPEND history block{}
      // console.log("prepending");
      //* setting isHistoryLoading ref value to true so scroll does not happen we will prepend history on click of "Load Previous Messages" button
      isHistoryLoading.current = true;
      //* keeping track of container scroll position before prepending messages , so after prepending messages the scroll position can be same (implementation inside the useLayoutEffect() hook below)
      previousScrollHeightRef.current = scrollRef.current.scrollHeight;
      // console.log(isHistoryLoading.current);
      const newLoadedChatHistory = chatMessages; //* when fetchChatMessages function is called by clicking on Load Previous messages button, then the value of chatMessages will the be the old messages that's why this else block is triggered,and for understand it better we saved the old messages into a constant first then below we prepended old messages before the already present messages

      //* this is how we prepend newLoadedChatHistory messages before the already present messages , this is receiving already present messages below - (messages)=> and then as it is a array so inside the array we are spreading ...newLoadedChatHistory(array of objects)  and after that we are spreading already present messages(array of objects) in the array, basically we are prepending the ...newLoadedChatHistory messages (objects)  before already present messages (objects) .
      setMessages((prev) => [...newLoadedChatHistory, ...prev]);
    }
    //* updating the skip the value
    setSkip(currentSkip + LIMIT); //* currentSkip value is parameter of this function , LIMIT is the constant we are using to tell backend how many messages it should send, we are also using LIMIT and currentSkip value to update the skip value after every fetchChatMessages function call.
    // console.log(user?.data?.firstName);
  };

  //* useEffect with empty dependency array to call it when ever the page loads first time to fetch the chat messages.
  useEffect(() => {
    fetchChatMessages(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //! 2. Maintain Scroll Position after Prepending History
  useLayoutEffect(() => {
    //* notes also added for useLayoutEffect hook in allLessonNotes file
    if (isHistoryLoading.current && scrollRef.current) {
      const container = scrollRef.current; //* the div container containing all of the messages , as we require the scroll height from this container.
      // console.log(container);
      // console.log(
        // "previousScrollHeightRef.current" + previousScrollHeightRef.current
      // );
      //* Calculating how much the height increased and adjusting scroll position, so the user sees the same scroll position in the chat even after prepending old messages.
      container.scrollTop =
        container.scrollHeight - previousScrollHeightRef.current;
      // console.log("container scroll top" + container.scrollTop);
    }
  }, [messages]);

  //! 3.New implementation of scroll to bottom when new message gets added or initial chat load:- Auto-Scroll to Bottom when new messages gets added or initial chat load(not when we are prepending  history gets loaded onClick of "Load previous messages") button
  const scrollToBottom = (behavior = "smooth") => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
      // console.log("scrollToBottom called");
    }
  };
  useEffect(() => {
    //* If we aren't prepending history( when isHistoryLoading.current has false value that's why in below condition we mention not! operator),we are assuming this change as adding a NEW message and doing the scroll or it is a initial chat load.
    // console.log("ishistoryloading " + isHistoryLoading.current);
    if (!isHistoryLoading.current) {
      scrollToBottom("smooth"); //* only gets called either it is initial chat component mount and we are loading chat messages (not prepending history) or we are adding a new message .
    }
  }, [messages]);

  //! ////////////////////////////////////////////////

  //* /////////////////////////////////////

  //! for lastSeen feature and online status feature
  //* state variable to store chat pat partner's online status and lastSeen data
  const [partnerStatus, setPartnerStatus] = useState({
    status: "offline",
    lastSeen: null,
  });

  //* useEffect which will be called whenever userId or targetUserId changes when this component receives the targetUserId value from params and userId value coming from the subscribed userSlice,
  useEffect(() => {
    //* creating socket connection
    const socket = createSocketConnection();
    // Notify server you are online
    socket.emit("setup", userId);

    // ASK the server for the current status of the partner immediately
    socket.emit("get-user-status", targetUserId);

    // Listen for the specific initial response
    socket.on("initial-status-response", (data) => {
      if (data.userId === targetUserId) {
        setPartnerStatus(data);
      }
    });

    // 4. Listen for real-time broadcasts
    socket.on("user-status-change", (data) => {
      if (data.userId === targetUserId) setPartnerStatus(data);
    });

    // CLEANUP: Essential to prevent status "stuck" online
    return () => {
      // console.log("useEffect unmounted");
      socket.off("user-status-change");
      socket.off("initial-status-response");
      socket.disconnect(); // Triggers server 'disconnect'
    };
  }, [targetUserId, userId]);

  useEffect(() => {
    //* written to see partner status state variable's value when it updates
    // console.log(partnerStatus);
  }, [partnerStatus]);
  //* ////////////////////////////////////////////////////////////////

  useEffect(() => {
    //* written to see the updated value of messages because  In React, state updates are asynchronous and reference-based.Because setMessages is asynchronous, the value of messages will not change immediately on the very next line of code. so to see it's updated value we written this  useEffect which show the value messages get updated
    // console.log("Updated messages:", messages);
  }, [messages]);
  //* ////////////////////////////////////////////

  //! //////////////////////////////////////
  //! code to 1.joining the chat creating a socket connection and emitting join chat event ,2.receiving/listening the messageReceived event emitted from backend to receive the messages 3, clean up function to disconnect the socket connection when chat component unmounts
  //* useEffect which will be called whenever userId or targetUserId changes when this component receives the targetUserId value from params and userId value coming from the subscribed userSlice,
  useEffect(() => {
    if (!userId) {
      return;
    } //* if the userId is not yet loaded do early return so it does not through any error
    // console.log(userId, targetUserId);
    //* creating connection with backend
    const socket = createSocketConnection();

    //* as soon as the page loaded, the socket connection is made and join chat event is emitted, to connecting two users
    socket.emit("joinChat", {
      firstName: user?.data?.firstName,
      userId,
      targetUserId,
    });
    // * receiving/listening the message other side user has sent, by receiving the emit message event mingh
    socket.on(
      "messageReceived",
      ({ firstName, lastName, text, newMessageTiming }) => {
        const date = new Date(newMessageTiming); //* converting time string to readable format
        const istFormatTime = date.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Set to false if you want 24-hour format
        }); //* Example Output: "30/12/2025, 01:27 pm"
        const { date: formattedDate, time: formattedTime } =
          formatChatTimestamp(istFormatTime);
        //////////////////*
        isHistoryLoading.current = true;
        //* this is how we add a new message after the already present messages , this is  how we are receiving already present messages below - (messages)=> and then as it is a array so inside the array we are spreading already present ...messages(array of objects) inside the array and after that we are adding the new messages object inside the array, basically we are appending the new message object at last.
        setMessages((messages) => [
          ...messages,
          {
            firstName,
            lastName,
            text,
            time: formattedTime,
            date: formattedDate ? formattedDate : null,
          },
        ]);
        // console.log(messages);
      }
    );
    //* if authentication error happens then to receive error on frontend when error happens and disconnecting the socket as in
    socket.on("connect_error", (err) => {
      console.error("Connection Error:!", err); // "Authentication failed"
      socket.disconnect();
    });
    //* clean up function for disconnecting the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, targetUserId]);
  //! ///////////////////////////////////////////////////

  //* //////////////////////////////////////////////////
  //! function to send message to server on click of send message icon
  const sendMessage = () => {
    const socket = createSocketConnection(); //* creating the socket connection
    //* sending name,userId,targetUserId,text to the server
    socket.emit("sendMessage", {
      firstName: user?.data?.firstName,
      lastName: user?.data?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    //* after sending the message setting the input element empty
    setNewMessage("");
  };
  //* //////////////////////////////////////////////////////

  //! function to trigger sendMessages function when user types some messages and pressing enter button instead of pressing the send chat button
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  //* ////////////////////////////////////////////////////

  return (
    <div className=" mb-[-1720px] pb-4">
      <div className="p-2">
        <div className=" main-container max-h-[1000px]  lg:min-h-[70dvh] min-h-[80dvh] lg:max-w-[70dvw] mt-4  mx-auto  border-2 border-cyan-400 px-2 py-1">
          <div className="heading-div flex flex-col justify-center border-b border-b-cyan-400">
            <h1 className="self-center  w-62 font-bold text-2xl text-center my-1 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500">
              {friendUserName}
            </h1>
            <p className="self-center text-sm pb-2">
              {partnerStatus.status === "online" ? (
                <span className="text-green-400">● Online</span>
              ) : (
                <span className="text-shadow-gray-400">
                  Last seen:{" "}
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-300 to-fuchsia-500 ">
                    {getFormattedLastSeen(partnerStatus.lastSeen)}
                  </span>
                </span>
              )}
            </p>
          </div>
          <div
            ref={scrollRef}
            className="chat-message flex-1 overflow-scroll border-b-2 lg:h-[52dvh] h-[64dvh] border-amber-50 p-4 pl-2 m-2"
          >
            {hasMore ? (
              <button
                onClick={() => fetchChatMessages(skip, false)}
                className="w-full text-fuchsia-500 border border-cyan-400 p-2 hover:bg-base-200 active:bg-base-300"
              >
                Load Previous Messages
              </button>
            ) : (
              <p className="flex justify-center   text-xl text-center my-1 bg-clip-text text-transparent bg-linear-to-r from-fuchsia-500 to-cyan-500 border-b border-b-fuchsia-500">
                Start of the chat
              </p>
            )}
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={
                    "chat my-2" +
                    (user?.data?.firstName === message.firstName
                      ? " chat-end"
                      : " chat-start")
                  }
                >
                  <div className="chat-header">
                    {`${message.firstName} ${message.lastName}`}
                    <time className="text-xs opacity-50">{message.time}</time>
                  </div>
                  <div className="chat-bubble">{message.text}</div>

                  <div className="chat-footer opacity-50">
                    {message.date ? `Seen on ${message.date}` : `Seen Today`}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex">
            <input
              className="inline p-2 m-2 lg:w-[94%] w-[85%] border-2 border-amber-50"
              type="text"
              onKeyDown={handleKeyDown}
              value={newMessage}
              placeholder="Type a message"
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
            <span onClick={sendMessage} className="mt-4 ml-1 cursor-pointer ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 48 48"
                id="Mail-Send-Email-Message--Streamline-Plump"
                height="30"
                width="30"
              >
                <desc>
                  Mail Send Email Message Streamline Icon:
                  https://streamlinehq.com
                </desc>
                <g id="mail-send-email-message--send-email-paper-airplane-deliver">
                  <path
                    id="Subtract"
                    fill="#8fbffa"
                    d="M3.99 7.33c-0.908 -2.236 1.144 -4.368 3.424 -3.578 7.73 2.679 22.423 8.422 35.323 17.184a3.683 3.683 0 0 1 0 6.127c-12.9 8.761 -27.594 14.505 -35.323 17.184 -2.28 0.79 -4.332 -1.343 -3.425 -3.579 1.95 -4.803 4.178 -9.412 5.287 -11.643a3.906 3.906 0 0 1 2.178 -1.93L20 23.999l-8.546 -3.095a3.906 3.906 0 0 1 -2.178 -1.93c-1.109 -2.231 -3.337 -6.84 -5.287 -11.644Z"
                    stroke-width="3"
                  ></path>
                  <path
                    id="Subtract_2"
                    stroke="#2859c5"
                    stroke-linejoin="round"
                    d="M3.988 7.331c-0.907 -2.236 1.145 -4.368 3.425 -3.578 7.73 2.679 22.423 8.422 35.323 17.184a3.683 3.683 0 0 1 0 6.127c-12.9 8.761 -27.593 14.505 -35.323 17.184 -2.28 0.79 -4.332 -1.343 -3.425 -3.579 1.95 -4.803 4.178 -9.412 5.287 -11.643a3.907 3.907 0 0 1 2.178 -1.93L20 24l-8.547 -3.095a3.907 3.907 0 0 1 -2.178 -1.93c-1.109 -2.231 -3.337 -6.84 -5.287 -11.644Z"
                    stroke-width="3"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
