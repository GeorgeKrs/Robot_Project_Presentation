const EventTable = (props) => {
  let editedData = null;
  if (props.data === null || props.data === undefined) {
    return;
  } else {
    editedData = props.data.map((record, index) => (
      <tr key={record.event_id.toString()}>
        {/* <th>{index + 1}</th> */}
        <th>{record.event_id}</th>
        <td>{record.event_description}</td>
        <td>
          {record.event_date_recorded.replace("T", " | ").replace(".000Z", " ")}
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <h4 className="header-text">PLC Status Table</h4>
      <table className="mt-2 table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Event Description</th>
            <th>Date | Time</th>
          </tr>
        </thead>

        <tbody>{editedData}</tbody>
      </table>
    </div>
  );
};

export default EventTable;
