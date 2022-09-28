import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-base-100 outline outline-1 outline-base-200 flex items-center justify-evenly z-20">
      <div className="flex justify-start gap-8">
        <a
          className="font-inter hover:font-extrabold hover:link hover:text-primary drop-shadow-md shadow-accent hover:scale-110 duration-200"
          onClick={() => {
            router.push("/?tab=0");
          }}
        >
          Shared
        </a>
        <a
          className="font-inter hover:font-extrabold hover:link hover:text-primary drop-shadow-md shadow-accent hover:scale-110 duration-200"
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
      </div>
      <div className="flex justify-end items-center">
        <AiOutlineCopyrightCircle className="mr-2" />
        <a href="https://github.com/Jervx" className="hover:underline">
          {" "}
          2022 Jervx
        </a>
      </div>
    </footer>
  );
};

export default Footer;
