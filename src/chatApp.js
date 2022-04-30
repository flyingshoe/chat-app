import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";

let ws;

export default function ChatApp() {
  const [chatList, setChatList] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [username, setUsername] = useState("");
  const msgRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    ws = new WebSocket(
      `ws://localhost:${process.env.REACT_APP_SERVER_PORT}/getChatList`
    );
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
    <Container
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "100%",
          position: "relative",
          height: "90vh",
        }}
      >
        <AppBar position="absolute" sx={{ top: 0, background: "#f0f2f5" }}>
          <Toolbar>
            <TextField
              fullWidth
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Toolbar>
        </AppBar>
        <div
          style={{ overflow: "auto", height: "calc(90vh - 130px)", marginTop: 60 }}
          ref={listRef}
        >
          {chatList.map((chat) => (
            <List
              key={chat.id}
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{chat.name[0]?.toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    background: "#f0f2f5",
                    padding: "15px 30px",
                    borderRadius: "20px",
                  }}
                  primary={chat.name}
                  secondary={chat.msg}
                />
              </ListItem>
            </List>
          ))}
        </div>
        <AppBar
          position="absolute"
          sx={{ top: "auto", bottom: 0, background: "#f0f2f5" }}
        >
          <Toolbar>
            <TextField
              sx={{ background: "white", width: "100%" }}
              placeholder="Type a message"
              ref={msgRef}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
            />
            <IconButton onClick={sendMsg}>
              <SendIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Paper>
    </Container>
  );
}
