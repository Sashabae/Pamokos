import { useState } from "react";
import DisplayCounter from "./DisplayCounter";
import IncrementButton from "./IncrementButton";

export default function Parent() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);

  return (
    <div>
      <h1>Counter App</h1>
      <DisplayCounter count={count} />
      <IncrementButton increment={increment} />
    </div>
  );
}
