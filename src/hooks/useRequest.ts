import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type UseRequestReturn = [
  data: string | null,
  isLoading: boolean,
  isSuccess: boolean,
  error: Error | AxiosError | null
];

export default function useRequest(url: string): UseRequestReturn {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | AxiosError | null>(null);

  const fetchData = () => {
    if (!url) return;

    setIsLoading(true);
    setIsSuccess(false);
    setError(null);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsSuccess(true);
        setIsLoading(false);
      })
      .catch((error: Error | AxiosError) => {
        setError(error);
        console.log(error);
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
