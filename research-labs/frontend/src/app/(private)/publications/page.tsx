import {
  Publication,
  PublicationsList,
} from "@/components/publication/publications-list";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function PublicationsPage() {
  const res = await fetch("http://127.0.0.1:3009/api/publications", {
    cache: "no-store", // Prevents Next.js from caching the request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch publications");
  }

  const data: Publication[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Publications</h1>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Publications</h1>
        <Link href="/publications/create">
          <Button>Create Publication</Button>
        </Link>
      </div>
      <PublicationsList data={data} />
    </div>
  );
}
