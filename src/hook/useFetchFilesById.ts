import { useEffect, useState } from "react";
import { getFiles } from "../services/files.service";
import type { IFileUploadResponse } from "../types";

function useFetchFilesById(id: string) {
  const [data, setData] = useState<IFileUploadResponse|null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFiles(id);
        setData(response.data);
      } catch (err) {
        setError(`${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, isLoading, error };
}

export default useFetchFilesById;
