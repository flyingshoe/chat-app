import { Container, Paper } from "@mui/material";

const ChatContainer = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        height: "95vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "100%",
          height: "95%",
        }}
      >
        {children}
      </Paper>
    </Container>
  );
};

export default ChatContainer;
