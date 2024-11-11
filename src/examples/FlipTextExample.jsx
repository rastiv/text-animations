import FlipText from "../components/FlipText";

const FlipTextExample = () => {
  return (
    <FlipText
      value="Hover me"
      duration={0.35}
      className="text-3xl font-semibold text-blue-700 uppercase cursor-pointer"
    />
  );
};

export default FlipTextExample;
