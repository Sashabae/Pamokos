// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Header from "./components/Header";
import PostImage from "./components/PostImage";
import PostContent from "./components/PostContent";
import Box from "./components/Box";

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Header />
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <PostImage />
          <PostContent />
        </div>

        <div className="col-6">
          <PostImage />
          <PostContent />
        </div>
      </div>

      <div className="row">
        <div className="col-3">
          <Box />
        </div>
        <div className="col-3">
          <Box />
        </div>
        <div className="col-3">
          <Box />
        </div>
        <div className="col-3">
          <Box />
        </div>
      </div>
    </div>
  );
}

export default App;
