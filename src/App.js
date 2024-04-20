import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false',
      )
      .then((res) => {
        setCoins(res.data);
<<<<<<< HEAD
=======
        // console.log(res.data);
>>>>>>> fa467e617595de1d6b677821f1b5098408242c93
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="coin-app">
      <h1 className="coin-text">📈 Top 300 Crypto Currencies to Trade 📈 </h1>
      <h4 style={{ marginBottom: '25px' }}>
        developed & maintained by  {' '} 
        <a
          href="https://github.com/abolfazlchaman"
          target="_blank"
          rel="noopener noreferrer">
           Abolfazl Chaman
        </a>
      </h4>
      <div className="coin-search">
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search a coin 🔎..."
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
