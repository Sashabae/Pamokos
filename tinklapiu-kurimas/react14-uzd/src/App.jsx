import LessText from "./components/LessText";

function App() {
  return (
    <>
      <LessText
        text="Focused, hard work is the real key to success. Keep your eyes on the goal, and just keep talking the next step towards completing it."
        defaultLength={34}
      />
      <LessText
        text="Winners embrace hard work. They love the discipline of it, the trade-off they're making to win. Losers, on the other hand, see it as punishment. And that's the difference."
        defaultLength={35}
      />
    </>
  );
}

export default App;
