import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TypeWriter = ({ examples, swapDelay = 5500, label = "" }) => {
  const LETTER_DELAY = 0.025;
  const BOX_FADE_DURATION = 0.125;
  const FADE_DELAY = 5;
  const MAIN_FADE_DURATION = 0.25;

  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((prev) => (prev + 1) % examples.length);
    }, swapDelay);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 uppercase">
      {label && <span className="pr-1.5">{label}:</span>}
      <span className="font-light">
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span
            key={`${exampleIndex}-${i}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * LETTER_DELAY, duration: 0 }}
            >
              {l}
            </motion.span>
            <motion.span
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default TypeWriter;
