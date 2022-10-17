import { useState, useEffect } from 'react'
import axios from 'axios';

const useAxios = (url) => {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);

  const fetchAPI = async (url) => {
    // setLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data;
      setResponse(data);
      setLoading(false);
    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPI(url);
  }, [url])

  return {
    loading, response
  }
}

export default useAxios;