import PropTypes from "prop-types";
import { useAnimate } from "framer-motion";

const getNearestSide = (e) => {
  const box = e.currentTarget.getBoundingClientRect();

  const top = Math.abs(box.top - e.clientY);
  const bottom = Math.abs(box.bottom - e.clientY);
  const left = Math.abs(box.left - e.clientX);
  const right = Math.abs(box.right - e.clientX);

  const proximaties = [
    { proximity: top, side: "top" },
    { proximity: bottom, side: "bottom" },
    { proximity: left, side: "left" },
    { proximity: right, side: "right" },
  ].sort((a, b) => a.proximity - b.proximity);

  const side = proximaties[0].side;
  const value = Math.round(side === "top" || side === "bottom" ? left : top);

  return { side, value };
};

const getNearestAngle = (e) => {
  const box = e.currentTarget.getBoundingClientRect();

  const top = Math.abs(box.top - e.clientY);
  const bottom = Math.abs(box.bottom - e.clientY);
  const left = Math.abs(box.left - e.clientX);
  const right = Math.abs(box.right - e.clientX);

  const yAxis = top < bottom ? "top" : "bottom";
  const xAxis = left < right ? "left" : "right";

  return `${yAxis}${xAxis}`;
};

const getRaduis = (e) => {
  const { offsetHeight: a, offsetWidth: b } = e.target;
  return Math.ceil(Math.sqrt(a * a + b * b));
};

const getClipPathRectangle = (side, isEntry) => {
  const FULL_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  const paths = {
    top: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    bottom: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    left: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    right: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
  };

  if (isEntry) {
    return [paths[side], FULL_CLIP];
  } else {
    return [FULL_CLIP, paths[side]];
  }
};

const getClipPathPolygon = (angle, isEntry) => {
  const FULL_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  const paths = {
    topleft: "polygon(0 0, 100% 0, 0 0, 0 100%)",
    topright: "polygon(0 0, 100% 0, 100% 100% , 100% 0)",
    bottomleft: "polygon(0 0, 0 100%, 100% 100%, 0 100%)",
    bottomright: "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)",
  };

  if (isEntry) {
    return [paths[angle], FULL_CLIP];
  } else {
    return [FULL_CLIP, paths[angle]];
  }
};

const getClipPathCircle = (side, value, radius, isEntry) => {
  let x = `${value}px`;
  if (side === "left") x = 0;
  if (side === "right") x = "100%";
  let y = `${value}px`;
  if (side === "top") y = 0;
  if (side === "bottom") y = "100%";

  if (isEntry) {
    return [`circle(0 at ${x} ${y})`, `circle(${radius}px at ${x} ${y})`];
  } else {
    return [`circle(${radius}px at ${x} ${y})`, `circle(0 at ${x} ${y})`];
  }
};

const getClipPathLine = (side, value, isEntry) => {
  const FULL_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
  const paths = {
    top: `polygon(${value}px 0, ${value}px 0, ${value}px 100%, ${value}px 100%)`,
    bottom: `polygon(${value}px 0, ${value}px 0, ${value}px 100%, ${value}px 100%)`,
    left: `polygon(0 ${value}px, 100% ${value}px, 100% ${value}px, 0 ${value}px)`,
    right: `polygon(0 ${value}px, 100% ${value}px, 100% ${value}px, 0 ${value}px)`,
  };

  if (isEntry) {
    return [paths[side], FULL_CLIP];
  } else {
    return [FULL_CLIP, paths[side]];
  }
};

// const LinkBox = ({ Icon, href, clipShape = "circle", ...otherProps }) => {
// const LinkBox = ({ Icon, href, clipShape = "rectangle", ...otherProps }) => {
// const LinkBox = ({ Icon, href, clipShape = "polygon", ...otherProps }) => {
const LinkBox = ({ Icon, href, clipShape = "line", ...otherProps }) => {
  const [scope, animate] = useAnimate();

  const handleMouseEnter = (e) => {
    const { side, value } = getNearestSide(e);
    const angle = getNearestAngle(e);

    let clipPath = [];
    if (clipShape === "rectangle") {
      clipPath = getClipPathRectangle(side, true);
    }
    if (clipShape === "polygon") {
      clipPath = getClipPathPolygon(angle, true);
    }
    if (clipShape === "circle") {
      const radius = getRaduis(e);
      clipPath = getClipPathCircle(side, value, radius, true);
    }
    if (clipShape === "line") {
      clipPath = getClipPathLine(side, value, true);
    }

    animate(scope.current, { clipPath });
  };

  const handleMouseLeave = (e) => {
    const { side, value } = getNearestSide(e);
    const angle = getNearestAngle(e);

    let clipPath = [];
    if (clipShape === "rectangle") {
      clipPath = getClipPathRectangle(side);
    }
    if (clipShape === "polygon") {
      clipPath = getClipPathPolygon(angle);
    }
    if (clipShape === "circle") {
      const radius = getRaduis(e);
      clipPath = getClipPathCircle(side, value, radius);
    }
    if (clipShape === "line") {
      clipPath = getClipPathLine(side, value);
    }

    animate(scope.current, { clipPath });
  };

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={href}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36"
      {...otherProps}
    >
      <Icon className="text-xl sm:text-3xl md:text-4xl" />
      <div
        ref={scope}
        className="absolute inset-0 grid place-content-center bg-neutral-900"
        style={{
          clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
        }}
      >
        <Icon className="text-xl text-white sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};

PropTypes.LinkBox = {
  Icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
};

export default LinkBox;
