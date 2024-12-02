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
    <div className="cards-container">
      <div className="row border align-items-center">
        <div className="col-auto">
          <img src={logo} alt={company} />
        </div>
        <div className="col">
          <p>{company}</p>
          <h6>{position}</h6>
          <p>
          {postedAt}&nbsp;{contract}&nbsp;{location}
          </p>
        </div>
      </div>
    </div>
  );
}
