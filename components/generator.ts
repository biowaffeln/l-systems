export type Axiom = string;
export type Rule = Record<string, string>;
export type Vec2 = [number, number];

const move = (vec: Vec2, angle: number, length = 1): Vec2 => [
  vec[0] + Math.cos(angle) * length,
  vec[1] + Math.sin(angle) * length,
];

export const deg = (a: number) => (a / 360) * Math.PI * 2;

const applyRule = (rule: Rule) => (str: string) =>
  str
    .split("")
    .map((a) => rule[a] || a)
    .join("");

export type ParserOptions = {
  length?: number;
  angle?: number;
  orientation?: number;
  start?: Vec2;
};

export class LSystem {
  points: Vec2[] = [];
  product = "";

  constructor(public axiom: Axiom, public rule: Rule) {}

  iterate(times: number) {
    let product = this.axiom;
    for (let i = 0; i < times; i++) {
      product = applyRule(this.rule)(product);
    }
    this.product = product;
    return this;
  }

  parse({
    length = 1,
    angle = deg(90),
    orientation = 0,
    start = [0, 0],
  }: ParserOptions = {}) {
    const points = [start];
    for (let letter of this.product) {
      switch (letter) {
        case "-":
          orientation = orientation - angle;
          break;
        case "+":
          orientation = orientation + angle;
          break;
        case "F":
        case "G":
          const newPoint = move(points[points.length - 1], orientation, length);
          points.push(newPoint);
      }
    }
    this.points = points;
    return this;
  }

  toSVG() {
    return this.points
      .map(([x, y], i) => {
        const prefix = i === 0 ? "M" : i === 1 ? "L" : "";
        return `${prefix}${x},${y}`;
      })
      .join(" ");
  }
}

//   export const getDragonPath = () => {
//   const dragonRule = (letter) =>
//     // prettier-ignore
//     letter === "X" ? "X+YF+" :
//     letter === "Y" ? "-FX-Y" :
//     letter;

//   const dragonIteration = rewriteString(dragonRule);
//   const dragonString = iterate(11, dragonIteration, "FX");
//   const dragonPoints = pointGenerator({
//     string: dragonString,
//     length: 9,
//     start: [430, 150],
//     angle: Math.PI / 2,
//   });
//   return points2path(dragonPoints);
// };

// export const getSierpinskiPath = () => {
//   const sierpinskiRule = (letter) =>
//     // prettier-ignore
//     letter === "A" ? "B-A-B" :
//     letter === "B" ? "A+B+A" :
//     letter;

//   const sierpinskiIteration = rewriteString(sierpinskiRule);
//   const sierpinskiString = iterate(7, sierpinskiIteration, "A");
//   const sierpinskiPoints = pointGenerator({
//     string: sierpinskiString,
//     length: 4.7,
//     start: [30, 570],
//     angle: Math.PI / 3,
//   });
//   return points2path(sierpinskiPoints);
// };

// export const getKochPath = () => {
//   const kochRule = (letter) =>
//     // prettier-ignore
//     letter === "F" ? "F+F--F+F" :
//     letter;

//   const kochIteration = rewriteString(kochRule);
//   const kochString = iterate(4, kochIteration, "-F--F--F");
//   const kochPoints = pointGenerator({
//     string: kochString,
//     length: 5,
//     start: [300, 555],
//     angle: Math.PI / 3,
//   });
//   return points2path(kochPoints);
// };

/* svg path animation */

// const clamp = (min, max) => (val) => Math.min(Math.max(min, val), max);
// const calcOffset = (x, w, pathLength) =>
//   clamp(0, pathLength)(pathLength - pathLength * (x / w));

// export const usePathAnimation = function (deps: any[] = []) {
//   const path = React.useRef<SVGPathElement>(null);
//   const [pathLength, setPathLength] = React.useState(0);
//   const { mouseX } = useMouse();
//   const w = typeof window !== `undefined` ? window.innerWidth : 1;
//   const x = mouseX === null ? w : mouseX;
//   const offset = calcOffset(x - 40, w - 80, pathLength);
//   const { strokeDashoffset } = useSpring({ strokeDashoffset: offset });

//   React.useEffect(() => {
//     setPathLength(path.current!.getTotalLength());
//   }, deps);

//   const pathProps = {
//     strokeDasharray: pathLength,
//     strokeDashoffset,
//   };

//   return { path, pathProps };
// };
