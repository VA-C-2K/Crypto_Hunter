import React, { useState } from "react";
import Box from '@mui/material/Box';
import { makeStyles} from '@mui/styles';
import { CryptoState } from "../../CryptoContext";
import { Fade,Button,AppBar,Tabs,Tab,Modal } from '@mui/material';
import Login from './Login';
import Signup  from './Signup';
import { auth } from "../../firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "white",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setAlert } = CryptoState();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () =>{
    signInWithPopup(auth,googleProvider).then((res)=>{
      setAlert({
        open:true,
        message:`Sign Up Successful.Welcome ${res.user.email}`,
        type:"success"
      });
      handleClose();
    }).catch((error)=>{
      setAlert({
        open:true,
        message:error.message,
        type:"error",
      });
      return;
    });
  };


  return (
    <div>
      <Button variant="conatined"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}

        onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        closeAfterTransition
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <AppBar position="static"
          style={{ backgroundColor:"transparent",color:"white"}}>
            <Tabs
              value={value}
              onChange={handleChange}
              style={{ borderRadius:10}}
              variant="fullWidth"
              
            >
              <Tab label="Login" />
              <Tab label="Sign Up"/>
              
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose}/>}
          {value === 1 && <Signup handleClose={handleClose}/>}
          <Box className={classes.google}>
            <span>OR</span>
            <GoogleButton 
            style={{ width:"100%",outline:"none"}}
            onClick={signInWithGoogle}
            />
          </Box>
           </div>
        </Fade>
      </Modal>
    </div>
  );
}