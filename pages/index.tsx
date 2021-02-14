import { useLSystem } from "../components/use-l-system";
import { deg } from "../components/generator";

const LSystems = () => {
  const hilbertPath = useLSystem({
    axiom: "A",
    rule: {
      A: "+BF-AFA-FB+",
      B: "-AF+BFB+FA-",
    },
    iterations: 5,
    options: { length: 9, start: [34, 34] },
  });

  const snowflakePath = useLSystem({
    axiom: "F++F++F",
    rule: {
      F: "F-F++F-F",
    },
    iterations: 4,
    options: {
      length: 5,
      start: [40, 128],
      angle: deg(60),
    },
  });

  const dragonPath = useLSystem({
    axiom: "F",
    rule: {
      F: "F+G",
      G: "F-G",
    },
    iterations: 11,
    options: {
      length: 7,
      start: [320, 130],
      angle: Math.PI / 2,
    },
  });
  const sierpinskiPath = useLSystem({
    axiom: "F",
    rule: {
      F: "G-F-G",
      G: "F+G+F",
    },
    iterations: 7,
    options: {
      length: 3,
      start: [45, 400],
      angle: deg(60),
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl">
      <h1 className="text-center font-bold font-mono text-4xl pt-20 pb-20">
        L-Systems Gallery
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mb-32">
        <section className="flex flex-col items-center">
          <svg viewBox="0 0 500 500">
            <path
              className="text-black"
              d={snowflakePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div>
            <p className="font-semibold mt-2">Koch Snowflake, 4th iteration</p>
            <p>axiom: F++F++F</p>
            <p>rules: (F -&gt; F+F++F-F)</p>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <svg viewBox="0 0 500 500">
            <path
              className="text-black"
              d={dragonPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div>
            <p className="font-semibold mt-2">Dragon Curve, 7th iteration</p>
            <p>axiom: F</p>
            <p>rules: (F -&gt; F+G) (G -&gt; F-G)</p>
          </div>
          <pre className="font-sans"></pre>
        </section>
        <section className="flex flex-col items-center">
          <svg viewBox="0 0 350 350">
            <path
              className="text-black"
              d={hilbertPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div>
            <p className="font-semibold mt-2">Hilbert Curve, 5th iteration</p>
            <p>axiom: A</p>
            <p>rules: (A -&gt; +BF-AFA-FB+) (B -&gt; -AF+BFB+FA-)</p>
          </div>
        </section>
        <section className="flex flex-col items-center">
          <svg viewBox="0 0 470 470">
            <path
              className="text-black"
              d={sierpinskiPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div>
            <p className="font-semibold mt-2">
              Sierpinksi Triangle, 7th iteration
            </p>
            <p>axiom: F</p>
            <p>rules: (F -&gt; G-F-G) (G -&gt; F+G+F)</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LSystems;
