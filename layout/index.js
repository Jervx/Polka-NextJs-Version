import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="relative h-screen w-screen">
        <Navbar />
        <main className="">
          <div className="h-screen overflow-y-scroll p-5 md:p-10">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
