import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }) {
  return (
    <>
      <SessionProvider session={children.session}>
        <div className="relative h-screen w-screen">
          <Navbar />
          <main className="">
            {/* <div className="h-screen p-5 md:p-10">{children}</div> */}
            {children}
          </main>
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}
