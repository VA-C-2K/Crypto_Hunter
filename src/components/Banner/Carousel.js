import React,{useState,useEffect} from 'react';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../CoinsTable';




const Carousel = () => {
    const useStyles = makeStyles((theme) => ({
        carousel: {
          height: "50%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        },
        carouselItem: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        },
      }));
  
      const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };
    const classes = useStyles();
    const [trending,setTrending] = useState([]);
    const { currency,symbol } = CryptoState();
    
    const fetchTrendingCoins = async() =>{
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }; 
    useEffect(() => {
        fetchTrendingCoins();
    },[currency]);

   

    const items = trending.map((coin)=>{
        let profit = coin.price_change_24h >=0; 
        return(
            <Link
            className={classes.carouselItem}
            to={`/coins/${coin.id}`}
            >
            <img
          src={coin.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
            />
            <span>
          {coin.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
            </Link>
        )
    })

  return (
    <div className={classes.carousel}>
    <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  </div>
  )
}

export default Carousel