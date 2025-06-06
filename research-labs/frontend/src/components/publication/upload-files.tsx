"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid"; // for generating file ids

interface UploadFilesProps {
  publicationId: string;
}

export default function UploadFiles({ publicationId }: UploadFilesProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setError(null);
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("Please select files to upload.");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      for (const file of Array.from(selectedFiles)) {
        // Step 1: Upload to /public/uploads (you need an endpoint or manual copy)
        const uploadForm = new FormData();
        uploadForm.append("file", file);

        const uploadRes = await fetch(`http://127.0.0.1:3009/api/upload`, {
          method: "POST",
          body: uploadForm,
        });

        if (!uploadRes.ok) throw new Error("File upload failed.");

        const { filePath } = await uploadRes.json(); // backend returns path

        // Step 2: Send metadata to Rust backend
        const fileType = file.type.split("/")[1] || "UNKNOWN";

        const res = await fetch(`http://127.0.0.1:3009/api/publication-files`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // to send userId cookie
          body: JSON.stringify({
            id: uuidv4(),
            file_type: fileType.toUpperCase(),
            file_path: filePath,
            publication_id: publicationId,
          }),
        });

        if (!res.ok) throw new Error("Metadata upload failed.");
      }

      setSuccess(true);
      setSelectedFiles(null);
    } catch (err: any) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <Input
        type="file"
        multiple
        onChange={handleFileChange}
        disabled={uploading}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">Files uploaded successfully!</p>
      )}
      <Button
        onClick={handleUpload}
        disabled={uploading || !selectedFiles || selectedFiles.length === 0}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </Button>
    </div>
  );
}
