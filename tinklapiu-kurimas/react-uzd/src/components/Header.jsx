import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1 className="header-title">Page Title</h1>
      <img src="./src/assets/cat2.jpg" alt="image" className="header-img w-100 object-fit-cover" />
    </header>
  );
}
