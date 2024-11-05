import PropTypes from "prop-types";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipText = ({ className, children }) => {
  if (typeof children !== "string") return;

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={`relative inline-block overflow-hidden whitespace-nowrap ${className}`}
    >
      <div>
        {children.split("").map((c, i) => {
          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
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
        {children.split("").map((c, i) => {
          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: DURATION,
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
  className: PropTypes.string,
  children: PropTypes.node,
};

export default FlipText;
