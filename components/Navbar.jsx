import { useSession, signIn, signOut } from "next-auth/react";

import ThemeSelector from "./ThemeSelector";

import { MdHelp } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
          className="btn btn-ghost normal-case text-2xl text-orange-500 hidden md:block"
        >
          Polka
        </a>
      </div>
      <div className="flex-none justify-evenly gap-2 sm:gap-8">
        <div className="hidden md:block form-control">
          {/* <input
            type="text"
            placeholder="Coming soon..."
            className="hidden md:block input input-sm input-bordered ring-2 ring-base-100 duration-150 focus:ring-accent hover:ring-accent"
          /> */}
        </div>
        <a
          className="md:hidden font-inter hover:font-extrabold hover:link hover:text-primary drop-shadow-md shadow-accent hover:scale-110 duration-200"
          onClick={() => {
            router.push("/?tab=0");
          }}
        >
          Shared
        </a>
        <a
          className="md:hidden font-inter hover:font-extrabold hover:link hover:text-primary drop-shadow-md shadow-accent hover:scale-110 duration-200"
          onClick={() => {
            router.push("/?tab=1");
          }}
        >
          Yours
        </a>
        <a
          className="font-inter hover:font-extrabold hover:link hover:text-primary drop-shadow-md shadow-accent hover:scale-110 duration-200"
          href="https://Jervx.github.io/Polka-NextJs-Version"
          target={"_blank"}
          rel="noreferrer"
        >
          Docs
        </a>
        <ThemeSelector />
        {session ? (
          <>
            <div className="tooltip tooltip-bottom" data-tip={session.user.name}>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 hover:scale-110 duration-200 ease-out rounded-full hover:ring-1 ">
                    <img alt={session.user.name} src={session.user.image} />
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
                    <a
                      onClick={() => {
                        signOut();
                      }}
                      className="justify-between"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <button
            className="btn btn-sm btn-active"
            onClick={() => {
              signIn();
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
