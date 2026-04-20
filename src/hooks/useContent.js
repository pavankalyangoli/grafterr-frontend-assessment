import { useCallback, useEffect, useState } from "react";

export const useContent = (fetchFn) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);
            const res = await fetchFn();
            setData(res);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => {
        load();
    }, [load]);

    return { data, loading, error, retry: load };
};