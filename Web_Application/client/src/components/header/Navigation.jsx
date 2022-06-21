import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faRobot } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <div className="my-auto d-inline-flex">
      <FontAwesomeIcon
        className="px-2 font-awesome-active"
        size="2x"
        icon={faDatabase}
      />

      <FontAwesomeIcon className="px-2 font-awesome" size="2x" icon={faRobot} />
      <FontAwesomeIcon className="px-2 font-awesome" size="2x" icon={faRobot} />
    </div>
  );
};

export default Navigation;
