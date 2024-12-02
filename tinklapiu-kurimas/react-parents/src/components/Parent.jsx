import Child from "./Child";

export default function Parent() {
  const items = ["React", "Javascript", "CSS"];
  return (
    <div>
      <h1>Items List</h1>
      <Child items={items} />
    </div>
  );
}
