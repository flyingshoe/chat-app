import { useEffect } from "react";

let ws;

const useWebSocket = (handleOnMessage) => {
  // Establish web socket connection
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    ws = new WebSocket(
      `ws://localhost:${process.env.REACT_APP_SERVER_PORT}/getChatList${
        userId ? "?userId=123123" : ""
      }`
    );
    ws.onmessage = handleOnMessage;
  }, []);

  return { ws };
};

export default useWebSocket;
