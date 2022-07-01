import PLC from "../../components/plc_information/index";
import Videos from "../../components/video_information/index";
import Metrics from "./Metrics";

const Diagnostics = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="mx-2 row">
        <div className="px-3 col-lg-7 col-sm-8">
          <Videos />
          <hr className="mt-4" />
          <PLC />
        </div>
        <div className="col-lg-5 col-sm-4">
          <Metrics />
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
