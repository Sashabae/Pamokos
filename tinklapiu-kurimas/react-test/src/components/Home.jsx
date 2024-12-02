import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="card-container">
        <div className="row">
          {data.map((book) => (
            <div key={book.id} className="col-2">
              <div className="card">
                <img src={book.cover} alt={book.title} />
                <div className="card-body">
                  <ul className="list-group list-group-flush list-unstyled">
                    <li><h5>{book.title}</h5></li>
                    <li>{book.author}</li>
                    <li>{book.price} $</li>
                    <li className="list-group-item">
                      <Link
                        className="btn btn-light btn btn-outline-dark"
                        to={`/edit-book/${book.id}`}
                      >
                        Edit Book
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <button className="btn btn-light btn btn-outline-dark">
                        {book.reserved ? "Return" : "Take book"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
