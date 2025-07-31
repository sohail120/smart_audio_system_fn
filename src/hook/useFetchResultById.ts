import { useEffect, useState, useCallback } from "react";
import {  getResultFile } from "../services/files.service";
import type { TranscriptionData } from "../types";

function useFetchResultById(id: string) {
  const [data, setData] = useState<TranscriptionData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getResultFile(id);
      setData(response.data);
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export default useFetchResultById;
