import axios from "axios";
import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { makeStyles } from '@mui/styles';
import { Button, LinearProgress, Typography } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from '../components/CoinsTable';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState("");
  const { currency, symbol,user,watchlist,setAlert } = CryptoState();
  const fetchCoinData = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoinData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        borderBottom: "2px solid grey",
        borderRight: "0px solid grey",
        marginBottom:20,
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop:0,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 15,
      paddingBottom:0,
      paddingTop:0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
        
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
        
      },
    },
    addToWatchlist:{
        width:"100%",
        height:40,
        [theme.breakpoints.down("md")]: {
          width:"75%",
          margin:10,
        },
        [theme.breakpoints.down("sm")]: {
          width:"80%",
          marginTop:17,
          marginBottom:10,
        },
        [theme.breakpoints.down("xs")]: {
          width:"100%",
          marginTop:17,
          marginBottom:10,
        },
    },
    addToWatchlistspan:{
      fontSize:20,
      [theme.breakpoints.down("md")]: {
        fontSize:18,
      },
      [theme.breakpoints.down("sm")]: {
        fontSize:16,
      },
      [theme.breakpoints.down("xs")]: {
        fontSize:14,
      },
    },
  }));
  
  const inWatchlist =watchlist.includes(coin.id);
  const addToWatchlist = async() =>{
    const coinRef = doc(db,"watchlist",user.uid);
    try{
      await setDoc(coinRef,
        {coins:watchlist ? [...watchlist,coin.id]:[coin.id],
        });
        setAlert({
          open:true,
          message:`${coin.name} Added to the Watchlist !`,
          type:"success",
        }); 
    }catch(error){
      setAlert({
        open:true,
        message:error.message,
        type:"error",
      });
    }
    }
    const removeFromWatchlist = async() =>{
      const coinRef = doc(db,"watchlist",user.uid);
      try{
        await setDoc(coinRef,
          {coins:watchlist.filter((watch)=>watch !== coin.id),
          },
          { merge:'true'}
          );
          setAlert({
            open:true,
            message:`${coin.name} Removed from the Watchlist !`,
            type:"success",
          }); 
      }catch(error){
        setAlert({
          open:true,
          message:error.message,
          type:"error",
        });
      }
      }
  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img src={coin.image.large} alt={coin.name} height="200" style={{ marginBottom: 20 }} />
       
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display:"flex"}}>
          <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            variant="h5"
            style={{
              fontFamily:"Montserrat"
            }}
            >
              {numberWithCommas(coin.market_cap_rank)}
            </Typography>
          </span>
            <span style={{ display:"flex"}}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
            </span>
            <span style={{ display:"flex"}}>
            <Typography variant="h6" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6)
                )}
                &nbsp;
                {symbol === "₹" ? "L" : "M"}
            </Typography>
            </span>
            {user && <Button
              variant="outlined"
              className={classes.addToWatchlist}
              style={{
                backgroundColor:inWatchlist ? "#FF0000": "#EEBC1D",
                color:"#000",
                marginTop:5,
              }}
              onClick={inWatchlist ? removeFromWatchlist:addToWatchlist} 
            >
              <span className={classes.addToWatchlistspan}>{inWatchlist? "Remove from Watchlist":  "Add to Watchlist"} </span>
              </Button>}
        </div>
      
        </div>
        <CoinInfo coin={coin} />
      </div>
  )
}

export default Coinpage