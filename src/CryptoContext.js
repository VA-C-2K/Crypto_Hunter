import axios from 'axios';
import React, { createContext, useContext,useState,useEffect} from 'react';
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "./firebase";
const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser ] = useState(null);
    const [alert, setAlert ] = useState({
        open:false,
        messge:"",
        type:"success",
    });
    
    const [watchlist, setWatchlist ] = useState([]);
    useEffect(() => {
        if (user) {
          const coinRef = doc(db, "watchlist", user.uid);
          var unsubscribe = onSnapshot(coinRef, (coin) => {
            if (coin.exists()) {
              console.log(coin.data().coins);
              setWatchlist(coin.data().coins);
            } else {
              console.log("No Items in Watchlist");
            }
          });
    
          return () => {
            unsubscribe();
          };
        }
      }, [user]); 

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    useEffect(() =>{
        if(currency === "INR") setSymbol("₹")
        else if(currency === "USD") setSymbol("$")
        else if(currency === "EUR") setSymbol("€")
        else if(currency === "RUB") setSymbol("₽ ")
        else if(currency === "AUD") setSymbol("$")
        else if(currency === "GBP") setSymbol("£")
        else if(currency === "AED") setSymbol("د.إ")
        else if(currency === "CHF") setSymbol("CHF")
        else if(currency === "BTC") setSymbol("₿")
        else if(currency === "ETH") setSymbol("Ξ")
    } ,[currency]);
    
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    return (
        <Crypto.Provider value={{ currency,symbol,setCurrency,coins,loading,fetchCoins,alert,setAlert,user,watchlist}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}