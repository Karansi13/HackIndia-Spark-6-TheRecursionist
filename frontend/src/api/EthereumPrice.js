import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EthereumPrice = ({onPriceChange }) => {
  const [ethPrice, setEthPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const price = response.data.ethereum.usd;
        setEthPrice(response.data.ethereum.usd);
        setLoading(false);
        if (onPriceChange) onPriceChange(price);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchEthPrice();

    // Fetch the price every 60 seconds
    const intervalId = setInterval(fetchEthPrice, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [onPriceChange]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching ETH price: {error.message}</div>;

  return <div>{ethPrice}</div>;
};

export default EthereumPrice;