import colors from "../cssNamedColors.csv";
import { csv, pie, arc } from "d3";
import { useEffect, useState } from "react";

function Pied3() {
  const [data, setData] = useState([]);
  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  useEffect(() => {
    csv(colors).then(setData);
  }, []);

  const piArc = arc().innerRadius(0).outerRadius(600);
  if (!data) return <p>Loading...</p>;
  console.log(data?.[0]);
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {/* Ref: https://d3js.org/d3-shape/pie#pie_value */}
        {pie()
          .value((d, i) => {
            return i;
          })(data)
          .map((d, i) => {
            const color = d?.data?.["RGB hex value"];
            return <path key={i} fill={color} d={piArc(d)}></path>;
          })}
      </g>
    </svg>
  );
}

export default Pied3;
