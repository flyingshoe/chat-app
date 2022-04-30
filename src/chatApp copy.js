import "./chatApp.css";
import { useEffect, useState, useRef } from "react";

let ws;

export default function ChatApp() {
  const [chatList, setChatList] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [username, setUsername] = useState("");
  const msgRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    ws = new WebSocket(`ws://localhost:${process.env.REACT_APP_SERVER_PORT}/getChatList`);
    ws.onmessage = (e) => {
      setChatList(JSON.parse(e.data));
    };
  }, []);

  //scroll to bottom of chat when use chat is added
  useEffect(() => {
    listRef.current.scrollTo(0, listRef.current.scrollHeight);
  }, [chatList]);

  function sendMsg() {
    ws.send(JSON.stringify({ name: username, msg: newMsg }));
    setNewMsg("");
    msgRef.current.focus();
  }

  return (
    <div className="container">
      <div className="chat-box">
        <div>
          Username:{" "}
          <input
            className="user-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="chat-list" ref={listRef}>
          {chatList.map((chat) => (
            <div>
              {chat.name}: {chat.msg}
            </div>
          ))}
        </div>
        <div className="new-msg">
          <input
            className="msg-input"
            ref={msgRef}
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMsg()}
          />
          <button className="msg-btn" onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
