import { useState, useRef } from "react";
import video_id_20 from "../../assets/Videos/Robot_1/video_id_20.mp4";

const Robot_2 = () => {
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const videoElement = useRef();
  return (
    <div className="p-5 d-flex justify-content-center bg-dark">
      <video
        className="video-div"
        style={{ width: "1000px" }}
        ref={videoElement}
        controls
        autoPlay
      >
        <source src={video_id_20} type="video/mp4" />
      </video>
    </div>
  );
};

export default Robot_2;
