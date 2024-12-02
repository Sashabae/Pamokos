import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NewBook from "./components/NewBook";
import EditBook from './components/EditBook';
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <NavBar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-book" element={<NewBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
      </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
