export default function PostContent(props) {
  console.log(props);
  return (
    <div>
      <h2>{props.antraste}</h2>
      <p>
        {props.pastraipa}
      </p>
    </div>
  );
}
