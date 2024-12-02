import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Card() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container marketing">
      <div className="row">
        {userData.map((user) => (
          <div className="col-lg-4">
            <img
              src={user.avatar_url}
              className="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
            ></img>
            <h2 className="fw-normal">{user.login}</h2>
            <p>
              <Link to={`/users/${user.id}`}>
                <button className="btn btn-secondary">
                  View details &raquo;
                </button>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
