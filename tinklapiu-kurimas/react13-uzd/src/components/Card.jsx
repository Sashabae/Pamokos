import { useState } from "react";

export default function Card() {
  const [color, setColor] = useState(false);
  const changeColor = () => {
    setColor(!color);
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {color ? "Task is done!" : "Task is not done!"}
        </h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button
          onClick={changeColor}
          type="button"
          className={`btn ${color ? "bg-success" : "bg-danger"} text-white`}
        >
          {color ? "Done" : "Mark as done"}
        </button>
      </div>
    </div>
  );
}
