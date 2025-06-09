import {
  Publication,
  PublicationsList,
} from "@/components/publication/publications-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function PublicationsPage() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('userId')?.value
  console.log('User ID from cookie:', userId);

  console.log(`backend :${process.env.NEXT_PUBLIC_GATEWAY_URL} `);
  const res = await fetch(`${process.env.NEXT_PUBLIC_RUST_GATEWAY_URL}/rust/api/publications`, {
    cache: "no-store", // Prevents Next.js from caching the request
  });


  if (!res.ok) {
    console.error('Failed to fetch publications:', res.statusText);
    redirect("/?error=failed_to_fetch_publications");
  }

  const data: Publication[] = await res.json();

  return (
    <div className="max-w-6xl mx-auto py-10">

      {/* <h1 className="text-3xl font-bold mb-6">Publications</h1> */}

      {/* <p>User ID: {userId ?? 'Not logged in'}</p> */}
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
