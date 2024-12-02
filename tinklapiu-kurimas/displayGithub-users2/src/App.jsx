import Card from "./components/Card";
import { Routes, Route } from "react-router";
import UsersPage from "./components/UsersPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/users/:id" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;
