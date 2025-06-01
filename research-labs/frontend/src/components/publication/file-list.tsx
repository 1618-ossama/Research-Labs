"use client";

import { FaFileAlt, FaFileExcel, FaFilePdf, FaFileWord } from "react-icons/fa";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FiExternalLink } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";

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
  const [openPdf, setOpenPdf] = useState<string | null>(null);

  return (
    <>
      {files.map((file) => {
        const filename = file.file_path.split("/").pop();
        const fileUrl = `http://127.0.0.1:3009/api/uploads/${filename}`;

        return (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {fileTypeIcon(file.file_type)}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium line-clamp-1">
                  {filename}
                </span>
                <Badge variant="outline" className="w-fit text-xs">
                  {file.file_type}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2">


              {file.file_type.toUpperCase() === "PDF" ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenPdf(fileUrl)}
                      className="flex items-center gap-1"
                    >
                      <FiExternalLink size={14} />
                      <span>View</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden">
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                      <div>
                        <h2 className="text-lg font-semibold truncate max-w-[80%]">
                          {filename}
                        </h2>
                        <span className="text-sm text-muted-foreground">PDF Preview</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium flex items-center gap-1 hover:underline"
                        >
                          <FiExternalLink size={14} />
                          Open in New Tab
                        </a>
                        <a
                          href={fileUrl}
                          download
                          className="text-sm font-medium flex items-center gap-1 hover:underline"
                        >
                          <FaDownload size={14} />
                          Download
                        </a>
                      </div>
                    </div>
                    <iframe
                      src={openPdf ?? ""}
                      className="flex-1 w-full h-full"
                    />
                  </DialogContent>
                </Dialog>

              ) : (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <FiExternalLink size={14} />
                    <span>View</span>
                  </a>
                </Button>
              )}

              <Button variant="default" size="sm" asChild>
                <a
                  href={fileUrl}
                  download
                  className="flex items-center gap-1"
                >
                  <FaDownload size={14} />
                  <span>Download</span>
                </a>
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
