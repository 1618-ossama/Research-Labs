import Header from "./navbar";
import { cookies } from "next/headers";

export default async function HeaderWrapper() {

  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value || null;
  const role = cookieStore.get("userRole")?.value || null;
  console.log("usususussu");

  console.log(role);
  console.log("usususussu");

  return <Header userId={userId} role={role} />;
}
