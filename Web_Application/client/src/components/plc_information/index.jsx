import { useState, useEffect } from "react";
import EventTable from "./EventTable";
import { fetch_PLC_EventData } from "../../APIs/PlcApi";

const PLC = () => {
  const [dataFromApi, setDataFromApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingData, setFetchingData] = useState(true);

  async function getData() {
    setDataFromApi(await fetch_PLC_EventData());
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
export default PLC;
