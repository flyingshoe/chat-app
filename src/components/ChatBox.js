import { List } from "@mui/material";
import ChatBubble from "./ChatBubble";

const ChatBox = ({ chatList, listRef, userId }) => {
  return (
    <div
      style={{
        overflow: "auto",
        height: "95%",
      }}
      ref={listRef}
    >
      {chatList.map((chat) => (
        <List
          key={chat.msgId}
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ChatBubble
            chat={chat}
            side={userId === chat.userId ? "right" : "left"}
          />
        </List>
      ))}
    </div>
  );
};

export default ChatBox;
