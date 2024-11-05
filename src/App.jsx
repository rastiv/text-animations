import FlipTextExample from "./examples/FlipTextExample";
import TypeWriterExamples from "./examples/TypeWriterExamples";

function App() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-neutral-100 px-8 py-24">
      <div className="w-full max-w-xl space-y-6">
        <TypeWriterExamples />
        <hr className="border-neutral-650" />
        <FlipTextExample />
      </div>
    </div>
  );
}

export default App;
