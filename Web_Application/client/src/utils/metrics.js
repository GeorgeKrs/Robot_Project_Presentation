export const videoMetrics = (data, robot_id) => {
  let metricsData = {
    robot_1_totalVideos: 0,
    robot_2_totalVideos: 0,
  };

  metricsData.robot_2_totalVideos = data.filter(
    (item) => item.robot_id === 2
  ).length;

  metricsData.robot_1_totalVideos =
    data.length - metricsData.robot_2_totalVideos;

  return metricsData;
};

export const countVideos = (data) => {
  const Robot_1 = [
    { video_id: 10, counter: 0 },
    { video_id: 20, counter: 0 },
    { video_id: 30, counter: 0 },
    { video_id: 40, counter: 0 },
    { video_id: 50, counter: 0 },
    { video_id: 60, counter: 0 },
    { video_id: 70, counter: 0 },
    { video_id: 80, counter: 0 },
    { video_id: 90, counter: 0 },
    { video_id: 100, counter: 0 },
    { video_id: 110, counter: 0 },
    { video_id: 120, counter: 0 },
    { video_id: 130, counter: 0 },
    { video_id: 140, counter: 0 },
    { video_id: 150, counter: 0 },
  ];

  const Robot_2 = [
    { video_id: 160, counter: 0 },
    { video_id: 170, counter: 0 },
    { video_id: 180, counter: 0 },
    { video_id: 190, counter: 0 },
    { video_id: 200, counter: 0 },
    { video_id: 210, counter: 0 },
    { video_id: 220, counter: 0 },
    { video_id: 230, counter: 0 },
    { video_id: 240, counter: 0 },
    { video_id: 250, counter: 0 },
    { video_id: 260, counter: 0 },
    { video_id: 270, counter: 0 },
    { video_id: 280, counter: 0 },
    { video_id: 290, counter: 0 },
    { video_id: 300, counter: 0 },
  ];

  const counters = [Robot_1, Robot_2];

  data.forEach((element) => {
    if (element.video_id > 0 && element.video_id <= 150) {
      const index = element.video_id / 10 - 1;
      counters[0][index].counter++;
    } else if (element.video_id > 160 && element.video_id <= 300) {
      const index = element.video_id / 10 - 16;
      counters[1][index].counter++;
    }
  });

  return counters;
};

export const plcMetrics = (data) => {
  let plcData = {
    plc_disconnections: 0,
    pc_retries_to_connect: 0,
  };

  data.forEach((element) => {
    if (
      element.event_description ===
      "PC lost the connection to the PLC. Waiting for PLC response to connect again."
    ) {
      plcData.plc_disconnections++;
    } else if (
      element.event_description === "Unable to establish connection to the PLC."
    ) {
      plcData.pc_retries_to_connect++;
    }
  });

  return plcData;
};
