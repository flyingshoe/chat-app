import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default forwardRef(function NameModal({ saveName }, ref) {
  const [open, setOpen] = useState(false);
  const textRef = useRef();

  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
  }));

  const closeModal = () => {
    setOpen(false);
  };

  const handleSave = (name, ls) => {
    name = name.trim();
    if (name !== "") {
      saveName(name, ls);
      closeModal();
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open}>
      <DialogTitle>Please enter your name</DialogTitle>
      <DialogContent>
        <TextField inputRef={textRef} variant="standard" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => handleSave(textRef.current.value, true)}
        >
          That's me!
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleSave(`Alien${Date.now().toString().slice(8)}`)}
        >
          NO! I am from outer space!
        </Button>
      </DialogActions>
    </Dialog>
  );
});
