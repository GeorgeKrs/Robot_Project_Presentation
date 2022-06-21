const fetch_Video_HistoryData = () =>
  fetch("/api/videos/historydata", {
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

export { fetch_Video_HistoryData };
