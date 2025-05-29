import Header from "./Header";
import { cookies } from "next/headers";

export default function HeaderWrapper() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || null;
  const role = cookieStore.get("role")?.value || null;

  return <Header userId={userId} role={role} />;
}
