import TypeWriter from "../components/TypeWriter";

const questions = [
  "1. Can I pay one-time for a lifetime access?",
  "2. How does the free trial work?",
  "3. Can I pause my membership without losing my data?",
  "4. What is your refund policy?",
];

const TypeWriterExamples = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1.5">
        <span className="uppercase text-red-700">Questions:</span>
        <TypeWriter
          texts={questions}
          swapDelay={6000}
          textClassName="text-red-700 font-semibold"
          markerColor="bg-red-900"
        />
      </div>
      <div>-</div>
      <div className="flex gap-1.5">
        <span className="uppercase">Questions:</span>
        <div className="flex flex-col">
          {questions.map((q, i) => (
            <TypeWriter key={i} displayDelay={i * 3500} texts={[q]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeWriterExamples;
