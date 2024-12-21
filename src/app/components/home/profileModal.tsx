import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import homeSlice from "@/store/Slices/home";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  p: 4,
};

const headerStyle = {
  backgroundColor: "#ff5722",
  color: "white",
  padding: "10px 16px",
  borderRadius: "8px 8px 0 0",
  textAlign: "center",
};

const buttonStyle = {
  marginTop: "20px",
  backgroundColor: "#ff5722",
  color: "white",
};

const userImageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "20px",
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default function ProfileModal() {
  const dispatch = useDispatch();
  const home = useSelector((state: RootState) => state.home);

  // Hardcoded user data (initial state)
  const [user, setUser] = useState({
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 555 123 45 67",
    photo: "https://via.placeholder.com/100", // Example user photo
  });

  const [editMode, setEditMode] = useState(false);

  const handleClose = () =>
    dispatch(homeSlice.actions.isProfileModalOpenedChangeHandler(false));

  const handleSave = () => {
    setEditMode(false);
    // Here you can dispatch an action or make an API call to save changes
    console.log("User data saved:", user);
  };

  return (
    <div>
      <Modal
        open={home.isProfileModalOpened}
        onClose={handleClose}
        aria-labelledby="modal-profile-title"
        aria-describedby="modal-profile-description"
      >
        <Box sx={style}>
          <div style={headerStyle}>
            <Typography id="modal-profile-title" variant="h6" component="h2">
              Kullanıcı Bilgileri
            </Typography>
          </div>
          <div style={contentStyle}>
            <img
              src={user.photo}
              alt="Kullanıcı Fotoğrafı"
              style={userImageStyle}
            />
            {editMode ? (
              <>
                <TextField
                  label="İsim"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="E-posta"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <TextField
                  label="Telefon"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  fullWidth
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  fullWidth
                  onClick={handleSave}
                >
                  Kaydet
                </Button>
              </>
            ) : (
              <>
                <Typography id="modal-profile-description" sx={{ mt: 2 }}>
                  <strong>İsim:</strong> {user.name || "Bilinmiyor"}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>E-posta:</strong> {user.email || "Bilinmiyor"}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Telefon:</strong> {user.phone || "Bilinmiyor"}
                </Typography>
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  fullWidth
                  onClick={() => setEditMode(true)}
                >
                  Düzenle
                </Button>
              </>
            )}
          </div>
          <Button
            variant="contained"
            sx={buttonStyle}
            fullWidth
            onClick={handleClose}
          >
            Kapat
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
