import "../styles/globals.css";


import { useEffect } from "react";
import { loadTheme } from "../helpers"

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  const init = async () => {
    loadTheme();
  };

  useEffect(() => {
    init();
  }, []);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
