import { useState, useEffect } from "react";

const EventTable = () => {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState(true);

  async function getData() {
    await fetch("http://127.0.0.1:3001/api/videos/historydata", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDataFromApi(data))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData().then(setLoading(false));
  }, [fetchingData, setFetchingData]);

  return (
    <div>
      <h4 className="header-text">Videos History Table</h4>
      {loading ? (
        <div className="d-inline-flex">
          <div className="spinner-border text-dark"></div>
          <div className="px-1 text-dark">
            <b>Fetching history video data.</b>
          </div>
        </div>
      ) : (
        <table className="mt-2 table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Robot id</th>
              <th>Video id</th>
              <th>Video Done Playing</th>
              <th>Date | Time</th>
            </tr>
          </thead>

          <tbody>
            {dataFromApi.map((record, index) => (
              <tr key={record.history_id.toString()}>
                {/* <th>{index + 1}</th> */}
                <th>{record.history_id}</th>
                <td>{record.robot_id}</td>
                <td>{record.video_id}</td>
                <td>{record.video_done_playing}</td>
                <td>
                  {record.history_date_recorded
                    .replace("T", " | ")
                    .replace(".000Z", " ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventTable;
