import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../constants";

const useFetch = (endpoint, query, method = "GET", fetchOnCreate = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: method,
    url: `${api}/api/${endpoint}`,
    headers: {},
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnCreate) {
      fetchData();
    }
  }, []);

  return { data, isLoading, error, fetchData };
};

export default useFetch;
