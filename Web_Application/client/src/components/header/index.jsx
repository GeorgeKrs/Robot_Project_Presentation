// Assets imports
import "./index.css";
import ProvikLogo from "../../assets/provikLogo.png";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="container-fluid p-3 bg-primary">
      <div className="d-flex justify-content-between">
        <div>
          <img
            src={ProvikLogo}
            alt={"Provik's Logo"}
            className="header-image"
          />
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
