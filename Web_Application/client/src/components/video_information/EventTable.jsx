const EventTable = (props) => {
  let editedData = null;
  if (props.data === null || props.data === undefined) {
    return;
  } else {
    editedData = props.data.map((record, index) => (
      <tr key={record.history_id.toString()}>
        {/* <th>{index + 1}</th> */}
        <th>{record.history_id}</th>
        <td>{record.robot_id}</td>
        <td>{record.video_id}</td>
        <td>
          {record.history_date_recorded
            .replace("T", " | ")
            .replace(".000Z", " ")}
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <h4 className="header-text">Videos History Table</h4>
      <table className="mt-2 table table-dark table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Robot id</th>
            <th>Video id</th>
            <th>Date | Time</th>
          </tr>
        </thead>

        <tbody>{editedData}</tbody>
      </table>
    </div>
  );
};

export default EventTable;
