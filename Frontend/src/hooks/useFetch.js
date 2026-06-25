import { useState, useEffect } from 'react';

function useFetch(apiFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const { data: result } = await apiFn();
        if (!cancelled) setData(result.data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Error!');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchData();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

export default useFetch;