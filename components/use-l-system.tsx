import {
  LSystem as LSystemClass,
  Axiom,
  Rule,
  ParserOptions,
} from "./generator";

type Args = {
  axiom: Axiom;
  rule: Rule;
  iterations: number;
  options?: ParserOptions;
};

export const useLSystem = ({ axiom, rule, iterations, options }: Args) => {
  return new LSystemClass(axiom, rule)
    .iterate(iterations)
    .parse(options)
    .toSVG();
};
