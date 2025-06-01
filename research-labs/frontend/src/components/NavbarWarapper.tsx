import Header from "./Header";
import { cookies } from "next/headers";

export default function HeaderWrapper() {

  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || null;
  const role = cookieStore.get("userRole")?.value || null;
  console.log("usususussu");
  console.log(role);
  console.log("usususussu");

  return <Header userId={userId} role={role} />;
}
