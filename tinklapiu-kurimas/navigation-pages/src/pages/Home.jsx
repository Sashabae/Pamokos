import { Link } from "react-router";
export default function Home() {
  return (
    <>
      <h1>Welcome to the home page!</h1>
      <Link to="/about">
        <button>Go to About</button>
      </Link>
    </>
  );
}
