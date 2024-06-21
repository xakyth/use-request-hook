import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type UseRequestReturn = [
  data: string | null,
  isLoading: boolean,
  isSuccess: boolean,
  error: string | null
];
interface ErrorResponse {
  message: string;
}

export default function useRequest(url: string): UseRequestReturn {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    if (!url) return;

    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    axios
      .get('/fetch-html', { responseType: 'json', params: { url } })
      .then((response) => {
        setData(response.data);
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        setError(
          `Error (${error.response?.status}): ${error.response?.data?.message}`
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const debouncedFetch = useDebouncedCallback(fetchData, 500);

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch, url]);

  return [data, isLoading, isSuccess, error];
}
