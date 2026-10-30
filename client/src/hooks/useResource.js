import { useCallback, useEffect, useRef, useState } from 'react';

const useResource = (fetcher, { deps = [], immediate = true } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(Boolean(immediate));
  const fetcherRef = useRef(fetcher);

  fetcherRef.current = fetcher;

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetcherRef.current();
      setData(result);
      return result;
    } catch (caught) {
      setError(caught.message || 'حدث خطأ غير متوقع');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!immediate) return undefined;
    let active = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetcherRef.current();
        if (active) setData(result);
      } catch (caught) {
        if (active) setError(caught.message || 'حدث خطأ غير متوقع');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, error, loading, refetch: run };
};

export default useResource;
