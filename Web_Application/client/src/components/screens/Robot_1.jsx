import { useState, useEffect, useRef } from "react";

//video imports
import video_id_10 from "../../assets/Videos/Robot_1/video_id_10.mp4";
import video_id_20 from "../../assets/Videos/Robot_1/video_id_20.mp4";
import video_id_30 from "../../assets/Videos/Robot_1/video_id_30.mp4";

const Robot_1 = () => {
  const [fetchingData, setFetchingData] = useState(true);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [dataFromApi, setDataFromApi] = useState([]);

  const videosArray = [video_id_10, video_id_20, video_id_30];

  const videoElement = useRef("Video_Div");
  console.log(videosArray);
  async function getData() {
    await fetch("http://127.0.0.1:3001/api/videos/fetchLast_Robot_1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDataFromApi(data))
      .then(() => console.log(dataFromApi));
    // .then(
    //   () =>
    //     dataFromApi[0].video_done_playing === 0 && videoElement.current.play()
    // );
  }

  async function videoFinished() {
    // const id = dataFromApi[0].history_id;
    // await fetch("/api/videos/updateVideo/Robot_1", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: id }),
    // })
    //   .then((res) => res.json())
    //   .then(() => console.log("VIDEO UPDATED"));
  }

  useEffect(() => {
    if (fetchingData) {
      getData().then(() => setFetchingData(false));
    }
  }, [dataFromApi]);

  return (
    <div className="p-5 d-flex justify-content-center bg-dark">
      <video
        className="video-div"
        style={{ width: "1000px" }}
        ref={videoElement}
        controls
        autoPlay={false}
        onEnded={videoFinished}
      >
        <source src={video_id_30} type="video/mp4" />
      </video>
    </div>
  );
};

export default Robot_1;
