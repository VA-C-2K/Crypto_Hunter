import { AppBar, Container, MenuItem, Select, Toolbar, Typography,InputLabel,FormControl} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import cryptocurrencies from './assests/cryptocurrencies.png'

const Header = () => {
    const history = useNavigate();
    const {currency,setCurrency} = CryptoState();
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          mode: "dark",
        },
      });
    const useStyles = makeStyles(()=>({
        title:{
          flex:1,
          color:"gold",
          fontFamily:"Mostserrat",
          fontWeight:"bold",
          cursor:"pointer",
        }
      })) 
    
      const classes = useStyles()
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <img src={cryptocurrencies} height="50" alt="cryptocurrencies" style={{ marginRight:"20"}}/>
          <Typography
            onClick={() => history(`/`)}
            variant="h6"
            className={classes.title}
          >
            Crypto Hunter
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="currency">Currency</InputLabel>
          <Select
            variant="outlined"
            labelId="currency"
            id="currency"
            label="Currency"
            value={currency}
            style={{ width: 105, height: 40,marginTop:8,marginLeft: 5}}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>
  )
}

export default Header