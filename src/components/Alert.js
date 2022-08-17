import React from 'react'
import { CryptoState } from '../CryptoContext'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';const Alert = () => {
    const { alert,setAlert} = CryptoState();
    const posobj ={
      vertical:'bottom',
      horizontal:'center'
    }
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
        open:false
    });
  };
  return (
    <Snackbar open={alert.open} anchorOrigin={posobj}  autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert elevation={10}  variant="filled"
        onClose={handleClose}
        severity={alert.type}>
          {alert.message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Alert