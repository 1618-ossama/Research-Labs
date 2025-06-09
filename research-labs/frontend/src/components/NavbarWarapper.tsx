import Header from "./navbar";
import { cookies } from "next/headers";

export default async function HeaderWrapper() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return <Header userid={userId || ''} />;
}
