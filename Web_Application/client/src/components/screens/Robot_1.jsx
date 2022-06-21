import { useState, useRef } from "react";
import Robot_1_Video_id_1 from "../../assets/Videos/Robot_1_Video_id_1.mp4";

const Robot_1 = () => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const videoElement = useRef();
  return (
    <div className="p-5 d-flex justify-content-center bg-dark">
      Robot 1
      <video
        className="video-div"
        style={{ width: "1000px" }}
        ref={videoElement}
        controls
        autoPlay
      >
        <source src={Robot_1_Video_id_1} type="video/mp4" />
      </video>
    </div>
  );
};

export default Robot_1;
