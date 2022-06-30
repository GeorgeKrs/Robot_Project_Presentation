const videoMetrics = (data, robot_id) => {
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

export default videoMetrics;
