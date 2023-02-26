import { AppBar, IconButton, TextField, Toolbar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const BottomBar = ({ sendMsg, msgRef }) => {
  return (
    <AppBar position="sticky" sx={{ background: "#f0f2f5" }}>
      <Toolbar sx={{ px: "10px !important" }}>
        <TextField
          fullWidth
          sx={{ background: "white" }}
          placeholder="Type a message"
          inputRef={msgRef}
          onKeyDown={(e) => e.key === "Enter" && sendMsg(msgRef.current.value)}
          autoComplete="off"
        />
        <IconButton
          onClick={() => sendMsg(msgRef.current.value)}
          sx={{ ml: 1 }}
        >
          <SendIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default BottomBar;
