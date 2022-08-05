import { useState, useEffect, useRef } from "react";
import { Videos_Robot_1 } from "../../constants/videosArray";
import { useNavigate } from "react-router";
import Card from "../general/Card";
import CompanyInformation from "./CompanyInformation";

const Robot_2 = () => {
  const [dataFromApi, setDataFromApi] = useState([
    {
      history_id: 0,
      robot_id: 0,
      video_id: 0,
      video_done_playing: 1,
      history_date_recorded: "",
    },
  ]);

  const [IndexOfVideoToPlay, setIndexOfVideoToPlay] = useState(0);

  const videoElement = useRef("Video_Div");

  async function getData() {
    await fetch(`http://127.0.0.1:3001/api/videos/fetchLast/robot_id=${2}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDataFromApi(data))
      .then(() => setIndexOfVideoToPlay(dataFromApi[0].video_id / 10 - 1));
  }

  async function videoFinished() {
    await fetch(
      `http://127.0.0.1:3001/api/videos/fetchLast/history_id=${dataFromApi[0].history_id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then((window.location.href = window.location.href));
  }

  useEffect(() => {
    getData();

    if (dataFromApi[0].video_done_playing === 0) {
      setTimeout(function () {
        videoElement.current.load();
        videoElement.current.play();
      }, 150);
    }

    setTimeout(function () {
      if (
        videoElement.current.currentTime < 0.25 ||
        videoElement.current.currentTime === undefined
      ) {
        console.log("fetch inside use effect");
        setIndexOfVideoToPlay(Math.random() * 100);
      }
    }, 3000);
  }, [IndexOfVideoToPlay]);

  return (
    <div className="p-5 d-flex justify-content-center bg-dark">
      {dataFromApi[0].video_done_playing !== 1 ? (
        <video
          className="video-div"
          ref={videoElement}
          controls
          autoPlay={false}
          onEnded={videoFinished}
        >
          <source src={Videos_Robot_1[IndexOfVideoToPlay]} type="video/mp4" />
        </video>
      ) : (
        <div className="waiting-div">
          <Card
            header={"Company Information:"}
            borderColor={"dark"}
            headerBackgroundColor={"primary"}
            headerTextColor={"white"}
          >
            <CompanyInformation />
          </Card>
        </div>
      )}
    </div>
  );
};

export default Robot_2;
