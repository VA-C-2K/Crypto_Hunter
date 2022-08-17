import { AppBar, Container, MenuItem, Select, Toolbar, Typography,InputLabel,FormControl} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme,ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import cryptocurrencies from './assests/cryptocurrencies.png'
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const Header = () => {
    const history = useNavigate();
    const {currency,setCurrency,user} = CryptoState();
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
          <img src={cryptocurrencies} height="40" alt="cryptocurrencies" style={{ marginRight:"10"}}/>
          <Typography
            onClick={() => history(`/`)}
            variant="h6"
            className={classes.title}
          >
            Crypto Hunter
          </Typography>
          
          <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="currency">Currency</InputLabel>
          <Select
            variant="outlined"
            labelId="currency"
            id="currency"
            label="Currency"
            value={currency}
            style={{ width: 80, height: 40,marginTop:8,marginLeft: 5}}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"INR"}>INR</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"RUB"}>RUB</MenuItem>
            <MenuItem value={"AUD"}>AUD</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>
            <MenuItem value={"AED"}>AED</MenuItem>
            <MenuItem value={"CHF"}>CHF</MenuItem>
            <MenuItem value={"BTC"}>BTC</MenuItem>
            <MenuItem value={"ETH"}>ETH</MenuItem>
          </Select>
          </FormControl>
          {user ? <UserSidebar/>:<AuthModal/>}
        </Toolbar>
      </Container>
    </AppBar>
  </ThemeProvider>
  )
}

export default Header