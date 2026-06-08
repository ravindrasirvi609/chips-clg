import { useState } from "react";

interface UseCloudflareStorageReturn {
  uploadFile: (file: File) => Promise<string>;
  uploadProgress: number;
  isUploading: boolean;
  error: string | null;
}

export const useCloudflareStorage = (): UseCloudflareStorageReturn => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      setUploadProgress(10);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "folder",
        file.type.startsWith("image/") ? "images" : "abstracts"
      );

      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      setUploadProgress(75);

      const result = await response.json();

      if (!response.ok || !result.url) {
        throw new Error(result.message || "Failed to upload file");
      }

      setUploadProgress(100);
      return result.url;
    } catch (err) {
      setError("Failed to upload file");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, uploadProgress, isUploading, error };
};
