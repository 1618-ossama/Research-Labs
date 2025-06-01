import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import PublicationClient from "@/components/publication/publication-client";

export default async function PublicationPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const userRole= cookieStore.get("userRole")?.value;

  const [pubRes, filesRes] = await Promise.all([
    fetch(`http://127.0.0.1:3009/api/publications/${params.id}`, {
      cache: "no-store",
    }),
    fetch(`http://127.0.0.1:3009/api/publication-files/${params.id}`, {
      cache: "no-store",
    }),
  ]);

  if (!pubRes.ok) return notFound();

  const publication = await pubRes.json();
  const files = filesRes.ok ? await filesRes.json() : [];

  return (
    <PublicationClient
      publication={publication}
      files={files}
      userId={userId || ""}
      userRole={userRole|| ""}
    />
  );
}
