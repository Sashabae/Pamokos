export default function Card({
  // id,
  company,
  logo,
  // new,
  // featured,
  position,
  // role,
  // level,
  postedAt,
  contract,
  location,
  // languages,
  // tools,
}) {
  return (
    <div className="row border">
      <div className="col-1">
        <img src={logo} alt={company} />
      </div>
      <div className="col">
        <p>{company}</p>
        <h6>{position}</h6>
        <p>
          {postedAt}
          {contract}
          {location}
        </p>
      </div>
    </div>
  );
}
