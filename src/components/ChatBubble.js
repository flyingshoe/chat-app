import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { AES, enc } from "crypto-js";

const ChatBubble = ({ side = "left", chat }) => {
  const decryptedMsg = AES.decrypt( chat.msg, process.env.REACT_APP_AES_KEY ).toString(enc.Utf8);
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: side === "left" ? "flex-start" : "flex-end",
      }}
    >
      <ListItem sx={{ overflowWrap: "break-word", maxWidth: "500px" }}>
        {side === "left" && (
          <ListItemAvatar>
            <Avatar>{chat.name[0]?.toUpperCase()}</Avatar>
          </ListItemAvatar>
        )}

        <ListItemText
          sx={{
            background: "#f0f2f5",
            padding: "15px 30px",
            borderRadius: "20px",
          }}
          primary={chat.name}
          secondary={decryptedMsg}
        />

        {side === "right" && (
          <ListItemAvatar>
            <Avatar sx={{ ml: "16px" }}>{chat.name[0]?.toUpperCase()}</Avatar>
          </ListItemAvatar>
        )}
      </ListItem>
    </div>
  );
};

export default ChatBubble;
