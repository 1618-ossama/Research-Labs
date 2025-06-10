"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaFileAlt, FaFileExcel, FaFilePdf, FaFileWord, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import { FiUploadCloud, FiExternalLink } from "react-icons/fi";
import UploadFiles from "@/components/publication/upload-files";
import FileList from "@/components/publication/file-list";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface FileInfo {
  id: string;
  file_type: string;
  file_path: string;
  publication_id: string;
}

interface Publication {
  id: string;
  title: string;
  journal: string;
  doi: string;
  status: string;
  visibility: string;
  submitter_id: string;
  conference_id: string;
  submitted_at: string;
  abstract: string;
}

interface DoiMetadata {
  title?: string;
  authors?: string[];
  journal?: string;
  published?: string;
  link?: string;
}

const getDoiMetadata = async (doi: string): Promise<DoiMetadata | null> => {
  try {
    const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
    if (!res.ok) throw new Error("DOI fetch failed");
    const data = await res.json();
    const item = data.message;

    return {
      title: item.title?.[0],
      authors: item.author?.map((a: any) => `${a.given} ${a.family}`),
      journal: item["container-title"]?.[0],
      published: item.created?.["date-time"],
      link: `https://doi.org/${doi}`
    };
  } catch (e) {
    console.warn("Failed to fetch DOI metadata", e);
    return null;
  }
};

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

export default function PublicationClient({
  publication,
  files,
  userId,
  userRole,
}: {
  publication: Publication;
  files: FileInfo[];
  userId: string;
}) {
  const [summaryText, setSummaryText] = useState<string>("");
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

  const handleSummarize = () => {
    const pdfFile = files.find((f) => f.file_type.toUpperCase() === "PDF");
    if (!pdfFile) {
      toast.warning("No PDF file found to summarize.");
      return;
    }

    setIsSummarizing(true);
    setSummaryText("");

    const ws = new WebSocket("ws://localhost:8000/ws/summarize");

    ws.onopen = () => {
      ws.send(pdfFile.file_path);
    };

    ws.onmessage = (event) => {
      setSummaryText((prev) => prev + event.data + "\n\n");
    };

    ws.onerror = () => {
      toast.error("WebSocket error occurred.");
      setIsSummarizing(false);
    };

    ws.onclose = () => {
      setIsSummarizing(false);
    };
  };

  const router = useRouter();
  const isOwner = userId === publication.submitter_id || userRole === "ADMIN";
  const [doiMeta, setDoiMeta] = useState<DoiMetadata | null>(null);

  useEffect(() => {
    if (publication.doi) {
      getDoiMetadata(publication.doi).then(setDoiMeta);
    }
  }, [publication.doi]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:6188/rust/api/publications/${publication.id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("Publication deleted successfully");
        router.push("/publications");
        router.refresh();
      } else {
        throw new Error("Failed to delete publication");
      }
    } catch (error) {
      toast.error("Failed to delete publication");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <Link href="/publications" className="mt-6 inline-block text-blue-600 hover:underline">
        ← Back to publications
      </Link>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Publication Details</h1>
          {isOwner && (
            <div className="flex gap-2">
              <Button asChild variant="outline" className="gap-2">
                <Link href={`/publications/${publication.id}/edit`}>
                  <FaEdit size={14} />
                  Edit
                </Link>
              </Button>
              <Button
                variant="destructive"
                className="gap-2"
                onClick={handleDelete}
              >
                <FaTrash size={14} />
                Delete
              </Button>
            </div>
          )}
        </div>
        <p className="text-muted-foreground">
          View and manage publication details and associated files
        </p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{publication.title}</CardTitle>
          {publication.abstract && (
            <p className="text-muted-foreground mt-2 whitespace-pre-line">{publication.abstract}</p>
          )}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Journal</p>
              <p className="font-medium">{publication.journal || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Conference ID</p>
              <p className="font-medium">{publication.conference_id || "N/A"}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge variant="outline" className="capitalize">
                {publication.status.toLowerCase()}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <Badge variant="outline" className="capitalize">
                {publication.visibility.toLowerCase()}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Submitted At</p>
              <p className="font-medium">
                {new Date(publication.submitted_at).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DOI Information Card */}
      {publication.doi && publication.doi !== "0" && (
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              DOI Information
              <FiExternalLink className="text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {doiMeta ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">DOI Link</p>
                  <Link
                    href={doiMeta.link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline inline-flex items-center gap-1"
                  >
                    {publication.doi}
                    <FiExternalLink size={14} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="font-medium">{doiMeta.title || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Journal</p>
                    <p className="font-medium">{doiMeta.journal || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Published Date</p>
                    <p className="font-medium">
                      {doiMeta.published ? new Date(doiMeta.published).toLocaleDateString() : "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Authors</p>
                  <p className="font-medium">
                    {doiMeta.authors?.join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">DOI</p>
                <p className="font-medium">{publication.doi}</p>
                <p className="text-sm text-muted-foreground mt-2">Loading metadata or metadata not available...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <FileList files={files} />


      {isOwner && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiUploadCloud />
            Upload New Files
          </h2>
          <Card className="border-dashed border-2">
            <CardContent className="p-6">
              <UploadFiles publicationId={publication.id} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
