import PropTypes from "prop-types";
import { motion } from "framer-motion";

const STAGGER = 0.025;

const FlipText = ({ value, duration = 0.25, className = "" }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative inline-block overflow-hidden whitespace-nowrap ${className}`}
    >
      <div>
        {value.split("").map((c, i) => {
          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {value.split("").map((c, i) => {
          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

PropTypes.FlipText = {
  value: PropTypes.string.isRequired,
  duration: PropTypes.number,
  className: PropTypes.string,
};

export default FlipText;
