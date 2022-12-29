import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
