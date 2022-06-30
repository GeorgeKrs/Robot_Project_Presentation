const Card = (props) => {
  return (
    <div className={`card border-${props.borderColor} mb-3`}>
      <div
        className={`bg-${props.headerBackgroundColor} text-${props.headerTextColor} card-header`}
      >
        {props.header}
      </div>
      <ul className="list-group">{props.children}</ul>
    </div>
  );
};

export default Card;
