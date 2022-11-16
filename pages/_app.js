import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.js')
  }, []);

  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  )
}

export default MyApp
