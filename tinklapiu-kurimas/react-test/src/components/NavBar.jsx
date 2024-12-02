import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/new-book" className="nav-link">
            New Book Registration
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}