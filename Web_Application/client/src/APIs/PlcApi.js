const fetch_PLC_EventData = () =>
  fetch("/api/plc/events", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });

export { fetch_PLC_EventData };
