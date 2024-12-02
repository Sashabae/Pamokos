import { Routes, Route } from "react-router";
import Form from "./components/NewTask";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import AllTasks from './components/AllTasks';
import EditTask from './components/EditTask';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-task-form" element={<Form />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/tasks/:id" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
