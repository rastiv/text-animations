import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TypeWriter = ({
  texts,
  displayDelay = 0,
  swapDelay = 5500,
  textClassName = "font-light",
  markerColor = "bg-neutral-950",
}) => {
  const LETTER_DELAY = 0.025;
  const BOX_FADE_DURATION = 0.125;
  const MAIN_FADE_DURATION = 0.25;

  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId =
      texts.length > 1
        ? setInterval(
            () => setTextIndex((prev) => (prev + 1) % texts.length),
            swapDelay
          )
        : null;

    return () => clearInterval(intervalId);
  }, []);

  if (texts.length === 0) return null;

  return (
    <p className="uppercase">
      <span className={textClassName}>
        {texts[textIndex].split("").map((l, i) => (
          <motion.span
            key={`${textIndex}-${i}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: texts.length > 1 ? 0 : 1 }}
            transition={{
              delay: (swapDelay - 500) / 1000,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: displayDelay / 1000 + i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              className={`absolute bottom-[3px] left-[1px] right-0 top-[3px] ${markerColor}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: displayDelay / 1000 + i * LETTER_DELAY,
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

PropTypes.TypeWriter = {
  texts: PropTypes.array.isRequired,
  displayDelay: PropTypes.number,
  swapDelay: PropTypes.number,
  textClassName: PropTypes.string,
  markerColor: PropTypes.string,
};

export default TypeWriter;
