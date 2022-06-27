import { useState, useEffect } from "react";

const EventTable = () => {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState(true);

  async function getData() {
    await fetch("http://127.0.0.1:3001/api/plc/events", {
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
      <h4 className="header-text">PLC Status Table</h4>
      {loading ? (
        <div className="d-inline-flex">
          <div className="spinner-border text-dark"></div>
          <div className="px-1 text-dark">
            <b>Fetching PLC status data.</b>
          </div>
        </div>
      ) : (
        <table className="mt-2 table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Event Description</th>
              <th>Date | Time</th>
            </tr>
          </thead>

          <tbody>
            {dataFromApi.map((record, index) => (
              <tr key={record.event_id.toString()}>
                {/* <th>{index + 1}</th> */}
                <th>{record.event_id}</th>
                <td>{record.event_description}</td>
                <td>
                  {record.event_date_recorded
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
