import PLC from "../../components/plc_information/index";
import Videos from "../../components/video_information/index";

const Diagnostics = () => {
  return (
    <div className="mt-4" style={{ overflowX: "hidden" }}>
      <div className="px-3 row">
        <div className="col-lg-8 col-sm-12">
          <PLC />
          <Videos />
        </div>
        <div className="col-lg-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default Diagnostics;
