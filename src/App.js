import { makeStyles } from '@mui/styles';
import React from 'react';
import { Route,Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import {
  useTheme,
  ThemeProvider,
} from "@mui/material";
import Alert from './components/Alert'; 
function App() {

  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:"#14161a",
      color:"white",
      minHeight:"100vh"
    }
  })) 
  const theme = useTheme();
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
    <div className={classes.App}>
      <Header/>
     <Routes>
      <Route path="/" element={<Homepage />} exact/>
      <Route path="/coins/:id" element={<Coinpage />} />
     </Routes>
    </div>
    <Alert/>
     </ThemeProvider>
  );
}

export default App;
