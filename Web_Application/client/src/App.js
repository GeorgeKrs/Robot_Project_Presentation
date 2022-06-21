import { useState, useEffect, useRef } from "react";

import Header from "./components/header/index";
import PLC from "./components/plc_information/index";
import Videos from "./components/video_information/index";

import Robot_1_Video_id_1 from "../src/assets/Videos/Robot_1_Video_id_1.mp4";

function App() {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const videoElement = useRef();

  return (
    <div className="bg-light">
      <Header />
      <div className="mt-5 d-flex justify-content-around">
        <PLC />
        <Videos />
      </div>
      <div className="d-flex justify-content-center bg-dark">
        <video style={{ width: "1000px" }} ref={videoElement} controls autoPlay>
          <source src={Robot_1_Video_id_1} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
