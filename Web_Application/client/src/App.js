import { useState, useEffect } from "react";

import Header from "./components/header/index";
import PLC from "./components/plc_information/index";
import Videos from "./components/video_information/index";

function App() {
  return (
    <div className="bg-light">
      <Header />
      <div className="mt-5 d-flex justify-content-around">
        <PLC />
        <Videos />
      </div>
    </div>
  );
}

export default App;
