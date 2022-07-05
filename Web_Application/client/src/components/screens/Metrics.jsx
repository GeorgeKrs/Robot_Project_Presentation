import { useState, useEffect } from "react";
import Card from "../general/Card";
import { videoMetrics, plcMetrics, countVideos } from "../../utils/metrics";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
} from "recharts";

const Metrics = () => {
  const [allVideoData, setAllVideoData] = useState([]);
  const [allPlcData, setAllPlcData] = useState([]);

  const [graphData, setGraphData] = useState([]);

  const [videoData, setVideoData] = useState({
    robot_1_totalVideos: 0,
    robot_2_totalVideos: 0,
  });

  const [plcData, setPlcData] = useState({
    plc_disconnections: 0,
    pc_retries_to_connect: 0,
  });
  const [loading, setLoading] = useState(true);

  const FetchData = async () => {
    await fetch("http://127.0.0.1:3001/api/videos/fetchAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAllVideoData(data))
      .then(() => setVideoData(videoMetrics(allVideoData, 1)))
      .then(() => setGraphData(countVideos(allVideoData)));
  };

  const FetchPlcData = async () => {
    await fetch("http://127.0.0.1:3001/api/plc/fetchAll", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAllPlcData(data))
      .then(() => setPlcData(plcMetrics(allPlcData)))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    FetchData().then(() => FetchPlcData());
  }, [loading]);

  return (
    <>
      <h4 className="header-text">Metrics</h4>
      <Card
        header={"Robot 1:"}
        borderColor={"dark"}
        headerBackgroundColor={"primary"}
        headerTextColor={"white"}
      >
        {loading && (
          <div className="py-2 d-flex justify-content-center">
            <div className="spinner-border text-dark"></div>
            <div className="my-auto px-1">Fetching Robot 1 Data...</div>
          </div>
        )}

        {!loading && (
          <li className="list-group-item">
            Total Videos Played: {videoData.robot_1_totalVideos}
          </li>
        )}
      </Card>
      <Card
        header={"Robot 2:"}
        borderColor={"dark"}
        headerBackgroundColor={"warning"}
        headerTextColor={"white"}
      >
        {loading && (
          <div className="py-2 d-flex justify-content-center">
            <div className="spinner-border text-dark"></div>
            <div className="my-auto px-1">Fetching Robot 2 Data...</div>
          </div>
        )}

        {!loading && (
          <li className="list-group-item">
            Total Videos Played: {videoData.robot_2_totalVideos}
          </li>
        )}
      </Card>
      <Card
        header={"PLC Status:"}
        borderColor={"dark"}
        headerBackgroundColor={"danger"}
        headerTextColor={"white"}
      >
        {loading && (
          <div className="py-2 d-flex justify-content-center">
            <div className="spinner-border text-dark"></div>
            <div className="my-auto px-1">Fetching PLC Data...</div>
          </div>
        )}

        {!loading && (
          <>
            <li className="list-group-item">
              Total PLC disconnections: {plcData.plc_disconnections}
            </li>
            <li className="list-group-item">
              Total PC retries to connect: {plcData.pc_retries_to_connect}
            </li>
          </>
        )}
      </Card>

      <hr className="mt-5" />
      <div className="mt-5">
        <Card
          header={"Graph Data Robot 1:"}
          borderColor={"dark"}
          headerBackgroundColor={"light"}
          headerTextColor={"dark"}
        >
          {loading && (
            <div className="py-2 d-flex justify-content-center">
              <div className="spinner-border text-dark"></div>
              <div className="my-auto px-1">Fetching Graph Data...</div>
            </div>
          )}

          {!loading && (
            <ResponsiveContainer height={400} width={"100%"}>
              <BarChart data={graphData[0]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="video_id">
                  <Label
                    value="Videos ID"
                    offset={35}
                    position="insideTopRight"
                  />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  name="Total Times Played"
                  dataKey="counter"
                  fill="var(--bs-primary)"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card
          header={"Graph Data Robot 2:"}
          borderColor={"dark"}
          headerBackgroundColor={"light"}
          headerTextColor={"dark"}
        >
          {loading && (
            <div className="py-2 d-flex justify-content-center">
              <div className="spinner-border text-dark"></div>
              <div className="my-auto px-1">Fetching Graph Data...</div>
            </div>
          )}

          {!loading && (
            <ResponsiveContainer height={400} width={"100%"}>
              <BarChart data={graphData[1]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="video_id">
                  <Label
                    value="Videos ID"
                    offset={35}
                    position="insideTopRight"
                  />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  name="Total Times Played"
                  dataKey="counter"
                  fill="var(--bs-warning)"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </>
  );
};

export default Metrics;
