import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import registerSlice from "@/store/Slices/registerSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  p: 4,
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#ff6000",
  color: "#ffffff",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
};

const titleStyle = {
  color: "#333333",
  fontWeight: "bold",
  fontSize: "18px",
};

const descriptionStyle = {
  color: "#666666",
  marginTop: "10px",
  fontSize: "14px",
};

const inputStyle = {
  marginTop: "10px",
  width: "100%",
};

export default function BasicModal() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const register = useSelector((state: RootState) => state.register);

  const handleClose = () => {
    dispatch(
      registerSlice.actions.isForgetPasswordModuleOpenChangeHandler(false)
    );
    console.log(register.isForgetPasswordModuleOpen);
  };
  const OldPasswordChangeHandler = (e: any) => {
    setOldPassword(e.currentTarget.value);
  };
  const NewPasswordChangeHandler = (e: any) => {
    setNewPassword(e.currentTarget.value);
  };

  return (
    <div>
      <Modal
        open={register.isForgetPasswordModuleOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" sx={titleStyle}>
            Şifre değiştirme
          </Typography>
          <Typography id="modal-modal-description" sx={descriptionStyle}>
            Lütfen eski ve yeni şifrenizi girin.
          </Typography>
          <TextField
            label="Eski Şifre"
            type="text"
            variant="outlined"
            sx={inputStyle}
            value={oldPassword}
            onChange={OldPasswordChangeHandler}
          />
          <TextField
            label="Yeni Şifre"
            type="text"
            variant="outlined"
            sx={inputStyle}
            value={newPassword}
            onChange={NewPasswordChangeHandler}
          />
          <Button style={buttonStyle} onClick={handleClose}>
            Gönder
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
