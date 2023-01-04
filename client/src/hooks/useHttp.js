import { useState, useCallback } from 'react';
import axios from 'axios';
const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState([]);

    const sendRequest = useCallback(async (requestData) => {
        setIsLoading(true);
        try {
            if (requestData.method === 'GET') {
                const res = await axios(requestData.url);

                if (res.data.success) {
                    setData(res.data.data);
                    setIsLoading(false);
                }
            } else {
                throw new Error('Wrong method used');
            }
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }, []);

    return { isLoading, error, data, sendRequest };
};

export default useHttp;
