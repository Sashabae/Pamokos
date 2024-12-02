import "./Box.css";

export default function Box(props) {
  console.log(props);
  return <div className="box" style={{backgroundColor: props.background}}></div>;
}