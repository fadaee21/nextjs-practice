import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
//add bootstrap at top that,
//  override your styles to bootstrap
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
