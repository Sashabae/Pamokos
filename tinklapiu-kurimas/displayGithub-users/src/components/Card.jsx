import { useState, useEffect } from "react";

export default function Card() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div class="container marketing">
      <div class="row">
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
              <a className="btn btn-secondary" href={user.html_url}>
                View details &raquo;
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
