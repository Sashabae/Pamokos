import { useState } from "react";

export default function LessText({ text, defaultLength }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <p>
        {isExpanded ? text : text.substring(0, defaultLength) + "..."}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Read less" : "Read more"}
        </button>
      </p>
    </>
  );
}
