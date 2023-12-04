import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatsPage = () => {
  const [chats, setChats] = useState([]);

  const URI = "http://localhost:5000";
  
  const fetchChats = async () => {
    const { data } = await axios.get(`${URI}/api/chat`);
    setChats(data);
  };
  
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatsPage;
