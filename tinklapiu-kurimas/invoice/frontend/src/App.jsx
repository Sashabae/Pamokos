import Navbar from "./components/Navbar";
import TableList from "./components/TableList";

function App() {
  return (
    <>
      <Navbar />
      <TableList />
    </>
  );
}

export default App;






// this is the code for using theme context

// import { ThemeContext } from "./contexts/ThemeContext";
// import { useContext } from "react";

// function App() {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <>
//       Switching theme using react context:
//       <div className={`app ${theme === "dark" ? "bg-blue-950 text-white" : "bg-white"}`}>
//         <Navbar />
//       </div>
//     </>
//   );
// }

// export default App;
