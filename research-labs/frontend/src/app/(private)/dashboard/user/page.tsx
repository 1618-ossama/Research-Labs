import { cookies } from "next/headers";

export default async function PublicationsPage() {
  const cookie = (await cookies()).get("session")?.value;
  console.log(cookie);
  return (
    <div className="max-w-4xl mx-auto py-10">
    </div>
  );
}
