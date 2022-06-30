import { useState, useEffect } from "react";
import Card from "../general/Card";
import videoMetrics from "../../utils/metricsVideos";

const Metrics = () => {
  const [data, setData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const FetchData = async () => {
    setLoading(true);
    await fetch("http://127.0.0.1:3001/api/videos/fetchAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setMetricsData(videoMetrics(data, 1)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <h4 className="header-text">Metrics</h4>
      {loading && <div>LOADING</div>}
      <Card
        header={"Robot 1:"}
        borderColor={"dark"}
        headerBackgroundColor={"primary"}
        headerTextColor={"white"}
      >
        <li className="list-group-item">
          Total Videos Played: {metricsData.robot_1_totalVideos}
        </li>
      </Card>
      <Card
        header={"Robot 2:"}
        borderColor={"dark"}
        headerBackgroundColor={"warning"}
        headerTextColor={"white"}
      >
        <li className="list-group-item">
          Total Videos Played: {metricsData.robot_2_totalVideos}
        </li>
      </Card>
      <Card
        header={"PLC Status:"}
        borderColor={"dark"}
        headerBackgroundColor={"danger"}
        headerTextColor={"white"}
      >
        <li className="list-group-item">Total PLC disconnections:</li>
        <li className="list-group-item">Total PC disconnections:</li>
      </Card>
    </>
  );
};

export default Metrics;
