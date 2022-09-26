import ThemeSelector from "./ThemeSelector";
//import GoogleOneTapLogin from "react-google-one-tap-login";

import { useState, useEffect } from "react";

const Navbar = () => {
  //const CLID = process.env.CLID;
  //const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // const value = ('; '+document.cookie).split(`; g_state=`).pop().split(';')[0]
    // document.cookie = `g_state=${value}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // setMounted(true);
  }, []);

  return (
    <nav className="navbar bg-base-100 shadow-md fixed top-0 z-20">
      {/* {mounted && (
        <GoogleOneTapLogin
          onError={(error) => console.log(error)}
          onSuccess={(response) => console.log(response)}
          googleAccountConfigs={{ client_id: CLID }}
        />
      )} */}

      <div className="flex-1">
        <a
          href={"/"}
          className="btn btn-ghost normal-case text-2xl text-orange-500"
        >
          Polka
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="hidden md:block form-control">
          <input
            type="text"
            placeholder="Comming soon..."
            className="input input-sm input-bordered"
          />
        </div>
        <ThemeSelector />
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="userprofile" src="https://img1.ak.crunchyroll.com/i/spire2/f502d225e63d2dcf6ea9810c37048f971651090640_large.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">soon..</span>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Logout
                <span className="badge">soon..</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
