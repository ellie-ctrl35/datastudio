import { useEffect,useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useDataFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      axios.get(url)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((error) => {
          toast.error("Error fetching data", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [url]);
  
    return { data, loading };
  };

  export default useDataFetch;