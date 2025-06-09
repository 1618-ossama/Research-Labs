import HeaderWrapper from "@/components/NavbarWarapper";

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderWrapper />
      {children}
    </>
  );
}
