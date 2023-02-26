import { useEffect, useState, useRef } from "react";
import NameModal from "./components/NameModal";
import BottomBar from "./components/BottomBar";
import ChatContainer from "./components/ChatContainer";
import ChatBox from "./components/ChatBox";
import useNotification from "./hooks/useNotification";
import useWebSocket from "./hooks/useWebSocket";

export default function ChatApp() {
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState(() => {
    return window.localStorage.getItem("name") || "";
  });
  const msgRef = useRef(null);
  const listRef = useRef(null);
  const modalRef = useRef(null);

  // Hook to handle incoming notifications
  useNotification(chatList);

  // Establish web socket connection
  const { ws } = useWebSocket((e) => {
    const { userId, chatList } = JSON.parse(e.data);
    setUserId(userId); //Save userId to State
    window.localStorage.userId = userId; //Save userId to localstorage
    setChatList(chatList);
  });

  // Check local storage, if does exist open Name Modal
  useEffect(() => {
    try {
      if (!window.localStorage.getItem("name")) {
        modalRef.current.openModal();
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  //scroll to bottom of chat when use chat is added
  useEffect(() => {
    listRef.current.scrollTo(0, listRef.current.scrollHeight);
  }, [chatList]);

  function sendMsg(newMsg) {
    if (newMsg.trim() !== "") {
      ws.send(JSON.stringify({ name: name, msg: newMsg }));
      msgRef.current.value = "";
      msgRef.current.focus();
    }
  }

  const saveName = (name, ls) => {
    name = name.trim();
    setName(name);
    ls && window.localStorage.setItem("name", name);
  };

  return (
    <>
      <ChatContainer>
        <ChatBox chatList={chatList} listRef={listRef} userId={userId} />
        <BottomBar sendMsg={sendMsg} msgRef={msgRef} />
      </ChatContainer>
      <NameModal ref={modalRef} saveName={saveName} />
    </>
  );
}
