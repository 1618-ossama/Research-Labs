import Navbar from '@components/navbar'

export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      {children};

    </>
  )
}
