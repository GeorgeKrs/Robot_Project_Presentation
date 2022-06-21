import { useState, useEffect } from "react";
import EventTable from "./EventTable";
import { fetch_Video_HistoryData } from "../../APIs/VideoApi";

const VideosInformation = () => {
  const [dataFromApi, setDataFromApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState(true);

  async function getData() {
    setDataFromApi(await fetch_Video_HistoryData());
  }

  useEffect(() => {
    if (fetchingData) {
      getData().then(setFetchingData(false)).then(setLoading(false));
    }
  }, [fetchingData, setFetchingData]);

  return (
    <div>
      <EventTable data={dataFromApi} />
    </div>
  );
};
export default VideosInformation;
