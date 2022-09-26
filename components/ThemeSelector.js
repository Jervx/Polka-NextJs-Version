import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { randomInt, loadTheme, setTheme } from "../helpers";

const ThemeSelector = () => {
  const themes = [
    { name: "light", type: "light" },
    { name: "dark", type: "dark" },
    { name: "cupcake", type: "light" },
    { name: "bumblebee", type: "light" },
    { name: "emerald", type: "light" },
    { name: "halloween", type: "dark" },
    { name: "bumblebee", type: "light" },
    { name: "black", type: "dark" },
    { name: "corporate", type: "light" },
    { name: "forest", type: "dark" },
    { name: "valentine", type: "light" },
    { name: "dracula", type: "dark" },
    { name: "fantasy", type: "light" },
    { name: "synthwave", type: "dark" },
    { name: "lofi", type: "light" },
    { name: "retro", type: "light" },
    { name: "cyberpunk", type : "light"},
    { name: "coffee", type: "dark" },
    { name: "pastel", type: "light" },
    { name: "garden", type: "light" },
    { name: "acid", type: "light" },
    { name: "wireframe", type: "light" },
    { name: "cmyk", type: "light" },
    { name: "autumn", type: "light" },
    { name: "winter", type: "light" },
    { name: "lemonade", type: "light" }
  ];
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(loadTheme());
  }, []);

  const changeTheme = () => {
    const rand = randomInt(themes.length);
    setTheme(themes[rand]);
    setSelected(themes[rand])
  };

  return (
    <div className="tooltip tooltip-bottom" data-tip="Random Theme">
    <button onClick={() => changeTheme()} className="btn btn-square btn-ghost">
      {selected && selected.type === "dark" ? (
        <MdDarkMode className="text-2xl" />
      ) : (
        <MdLightMode className="text-2xl" />
      )}
    </button>
    </div>
  );
};

export default ThemeSelector;
