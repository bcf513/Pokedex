import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T>(url: string | string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      setLoading(true);
      setData(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Erro na solicitação");
        const responseData = (await response.json()) as T;
        setData(responseData);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]); // Dependency array to watch for changes in the URL.

  return { data, loading, error };
}

export default useFetch;
