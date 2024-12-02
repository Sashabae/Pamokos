import { Link } from "react-router";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/new-task-form" className="nav-link">
              Add New Task
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tasks" className="nav-link">
              View All Tasks
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
