// Assets imports
import "./index.css";
import ProvikLogo from "../../assets/provikLogo.png";
import greekFlag from "../../assets/greekFlag.jpg";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="container-fluid p-3 bg-light">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={ProvikLogo}
              alt={"Provik's Logo"}
              className="header-image"
            />
          </div>
          {/* <div className="px-2">
            <img src={greekFlag} alt={"Greek Flag"} className="header-image" />
          </div> */}
        </div>
        <Navigation />
      </div>
      <hr />
    </div>
  );
};

export default Header;
