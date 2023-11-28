import { arc } from "d3";

const Mouth = () => {
  const mouthRadius = 90;
  const mouthWidth = 10;

  const mouthArch = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2) // Start from clockwise and top is 0, right is pi/2, bottom is pi, left is 3pi/2, top again is 2pi
    .endAngle((Math.PI * 3) / 2);
  return (
    <g className="mouth">
      <path d={mouthArch()}></path>
    </g>
  );
};

export default Mouth;
