import colors from "../cssNamedColors.csv";
import { csv, arc } from "d3";
import { useEffect, useState } from "react";

function Scratch() {
  const [data, setData] = useState([]);
  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  useEffect(() => {
    csv(colors).then(setData);
  }, []);

  const piArc = arc().innerRadius(0).outerRadius(600);
  // .startAngle(Math.PI / 2) // Start from clockwise and top is 0, right is pi/2, bottom is pi, left is 3pi/2, top again is 2pi
  // .endAngle((Math.PI * 3) / 2);

  if (!data) return <p>Loading...</p>;
  console.log(data?.[0]);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {data.map((d, i) => {
          const color = d?.["RGB hex value"];
          return (
            <path
              key={i}
              fill={color}
              d={piArc({
                startAngle: (i / data?.length) * 2 * Math.PI, // Will give order radius between 0 - 2PI
                endAngle: ((i + 1) / data?.length) * 2 * Math.PI, // Start of current color to start of next color(end of current color)
              })}
            ></path>
          );
        })}
      </g>
    </svg>
  );
}

export default Scratch;
