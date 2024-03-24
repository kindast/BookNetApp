import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint, query, method = 'GET') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: method,
    url: `https://65f4b0a2f54db27bc02239e2.mockapi.io/api/${endpoint}`,
    headers: {},
    params: {...query},
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      if (response.data.length === 1) {
        setData(response.data[0]);
      } else {
        setData(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {data, isLoading, error, refetch};
};

export default useFetch;
