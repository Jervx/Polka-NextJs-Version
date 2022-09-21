import { useRouter } from "next/router";
import ThemeSelector from "./ThemeSelector";
const Navbar = () => {

  return (
    <nav className="navbar bg-base-100 shadow-md fixed top-0 z-10">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl text-orange-500">Polka</a>
      </div>
      <div className="flex-none">
        <ThemeSelector />
      </div>
    </nav>
  );
};

export default Navbar;
