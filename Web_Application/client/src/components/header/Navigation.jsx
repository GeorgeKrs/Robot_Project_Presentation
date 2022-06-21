import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faRobot } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const history = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const handleRedirect = (url, tab_id) => {
    setActiveTab(tab_id);
    history(url);
  };

  return (
    <div className="my-auto d-inline-flex">
      <FontAwesomeIcon
        className={
          activeTab === 1 ? "px-2 font-awesome-active" : "px-2 font-awesome"
        }
        size="2x"
        icon={faDatabase}
        onClick={() => handleRedirect("/", 1)}
      />

      <FontAwesomeIcon
        className={
          activeTab === 2 ? "px-2 font-awesome-active" : "px-2 font-awesome"
        }
        size="2x"
        icon={faRobot}
        onClick={() => handleRedirect("/robot1", 2)}
      />
      <FontAwesomeIcon
        className={
          activeTab === 3 ? "px-2 font-awesome-active" : "px-2 font-awesome"
        }
        size="2x"
        icon={faRobot}
        onClick={() => handleRedirect("/robot2", 3)}
      />
    </div>
  );
};

export default Navigation;
