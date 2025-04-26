import {
  Files,
  Publication,
  PublicationCard,
} from "@/components/publication/publication-card";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaFileAlt, FaFileExcel, FaFilePdf, FaFileWord } from "react-icons/fa";

const fileTypeIcon = (fileType: string) => {
  switch (fileType.toUpperCase()) {
    case "PDF":
      return <FaFilePdf className="text-red-600" />;
    case "WORD":
    case "DOCX":
      return <FaFileWord className="text-blue-600" />;
    case "EXCEL":
    case "XLSX":
      return <FaFileExcel className="text-green-600" />;
    default:
      return <FaFileAlt className="text-gray-600" />;
  }
};
function FileList({ files }: { files: FileInfo[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Associated Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between border p-3 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {/* Icon based on file type */}
              {fileTypeIcon(file.file_type)}

              <div className="flex flex-col gap-1">
                <Badge variant="secondary" className="w-fit">
                  {file.file_type}
                </Badge>
                <a
                  href={file.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {file.file_path}
                </a>
              </div>
            </div>
          </div>
        ))}
        {files.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No files found for this publication.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
interface FileInfo {
  id: string;
  file_type: string;
  file_path: string;
  publication_id: string;
}

interface PublicationPageProps {
  params: { id: string };
}

export default async function PublicationPage(
  { params }: PublicationPageProps,
) {
  const [pubRes, filesRes] = await Promise.all([
    fetch(`http://127.0.0.1:3009/api/publications/${params.id}`, {
      cache: "no-store",
    }),
    fetch(`http://127.0.0.1:3009/api/publication-files/${params.id}`, {
      cache: "no-store",
    }),
  ]);

  if (!pubRes.ok) return notFound();

  const publication: Publication = await pubRes.json();
  const files: FileInfo[] = filesRes.ok ? await filesRes.json() : [];

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Publication Details</h1>

      <PublicationCard publication={publication} />

      <FileList files={files} />
    </div>
  );
}
