"use client";

import { FaFileAlt, FaFileExcel, FaFilePdf, FaFileWord, FaDownload } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function fileTypeIcon(fileType: string) {
  switch (fileType.toUpperCase()) {
    case "PDF":
      return <FaFilePdf className="text-red-500 w-5 h-5" />;
    case "WORD":
    case "DOCX":
      return <FaFileWord className="text-blue-500 w-5 h-5" />;
    case "EXCEL":
    case "XLSX":
      return <FaFileExcel className="text-green-500 w-5 h-5" />;
    default:
      return <FaFileAlt className="text-gray-500 w-5 h-5" />;
  }
}

export default function FileList({ files }: { files: File[] }) {
  // store summary text per file id
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  // loading state per file id
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleSummarize = (file: File) => {
    if (file.file_type.toUpperCase() !== "PDF") {
      toast.warning("Summarization only available for PDF files.");
      return;
    }

    setLoading((prev) => ({ ...prev, [file.id]: true }));
    setSummaries((prev) => ({ ...prev, [file.id]: "" }));

    const filename = file.file_path.split("/").pop();
    const fileUrl = `/home/noredine/public/uploads/${filename}`;

    const ws = new WebSocket("ws://localhost:8000/ws/summarize");
    ws.onopen = () => {
      ws.send(fileUrl);
    };
    ws.onmessage = (event) => {
      setSummaries((prev) => ({
        ...prev,
        [file.id]: (prev[file.id] || "") + event.data + "\n",
      }));
    };
    ws.onerror = () => {
      toast.error("WebSocket error occurred.");
      setLoading((prev) => ({ ...prev, [file.id]: false }));
    };
    ws.onclose = () => {
      setLoading((prev) => ({ ...prev, [file.id]: false }));
    };
  };

  return (
    <>
      {files.map((file) => {
        const filename = file.file_path.split("/").pop();
        const fileUrl = `http://127.0.0.1:6188/rust/api/uploads/${filename}`;

        return (
          <div key={file.id} className="flex flex-col gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {fileTypeIcon(file.file_type)}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium line-clamp-1">{filename}</span>
                  <Badge variant="outline" className="w-fit text-xs">{file.file_type}</Badge>
                </div>
              </div>

              <div className="flex gap-2">
                {/* View Link for non-PDF files */}
                {file.file_type.toUpperCase() !== "PDF" && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <FiExternalLink size={14} />
                      <span>View</span>
                    </a>
                  </Button>
                )}

                {/* Summarize button for PDFs */}
                {file.file_type.toUpperCase() === "PDF" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSummarize(file)}
                    disabled={loading[file.id]}
                  >
                    {loading[file.id] ? "Summarizing..." : "Summarize"}
                  </Button>
                )}

                {/* Download Button */}
                <Button variant="default" size="sm" asChild>
                  <a href={fileUrl} download className="flex items-center gap-1">
                    <FaDownload size={14} />
                    <span>Download</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Summary box below the file entry */}
            {summaries[file.id] && (
              <pre
                className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm max-h-60 overflow-auto"
                aria-live="polite"
              >
                {summaries[file.id]}
              </pre>
            )}
          </div>
        );
      })}
    </>
  );
}
