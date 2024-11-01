import TypeWriter from "./components/TypeWriter";

function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-100 px-8 py-24">
      <div className="w-full max-w-xl space-y-6">
        <TypeWriter
          label="Questions"
          examples={[
            "1. Can I pay one-time for a lifetime access?",
            "2. How does the free trial work?",
            "3. Can I pause my membership without losing my data?",
            "4. What is your refund policy?",
          ]}
        />
      </div>
    </div>
  );
}

export default App;
