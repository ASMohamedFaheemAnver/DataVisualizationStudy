import { arc } from "d3";

const Nose = () => {
  const noseRadius = 15;
  const noseWidth = 5;

  const noseArch = arc()
    .innerRadius(noseRadius)
    .outerRadius(noseRadius + noseWidth)
    .startAngle(0)
    .endAngle(Math.PI * 2);
  return (
    <g className="nose">
      <path d={noseArch()}></path>
    </g>
  );
};

export default Nose;
