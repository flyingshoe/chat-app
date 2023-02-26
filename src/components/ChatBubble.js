import React from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
const ChatBubble = ({ side = "left", chat }) => {
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
          secondary={chat.msg}
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
