import { useEffect, useState, useCallback } from "react";
import { getFiles } from "../services/files.service";
import type { IFileUploadResponse } from "../types";

function useFetchFilesById(id: string) {
  const [data, setData] = useState<IFileUploadResponse | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getFiles(id);
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

export default useFetchFilesById;
