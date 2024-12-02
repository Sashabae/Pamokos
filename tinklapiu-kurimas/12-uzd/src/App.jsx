import Header from "./components/Header";
import PostImage from "./components/PostImage";
import PostContent from "./components/PostContent";
import Box from "./components/Box";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header
            title="Labas, as mokausi"
            link="src/components/images/header-cat.jpg"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <PostImage link="src/components/images/cat.jpg" />
          <PostContent
            antraste="Meow"
            pastraipa="OoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOO"
          />
        </div>
        <div className="col-12 col-sm-6">
          <PostImage link="src/components/images/cat.jpg" />
          <PostContent
            antraste="Cat"
            pastraipa="OoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOOoOOOoOO"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 mb-2 col-sm-3">
          <Box background="red" />
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box background="yellow" />
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box background="blue" />
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box background="green" />
        </div>
      </div>
    </div>
  );
}
