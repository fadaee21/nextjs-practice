import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const router = useRouter();
  const { user,logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" legacyBehavior>
          <a className="navbar-brand">webprog.io</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a
                  className={
                    router.pathname == "/" ? "nav-link active" : "nav-link"
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/posts" legacyBehavior>
                <a
                  className={
                    router.pathname == "/posts" ? "nav-link active" : "nav-link"
                  }
                >
                  Posts
                </a>
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {user ? (
              <>
                <span className="me-3">{user.name}</span>
                <button onClick={logout} className="btn btn-sm btn-dark">logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" legacyBehavior>
                  <a className="btn btn-sm btn-outline-secondary me-2">login</a>
                </Link>
                <Link href="/auth/register" legacyBehavior>
                  <a className="btn btn-sm btn-dark">register</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
