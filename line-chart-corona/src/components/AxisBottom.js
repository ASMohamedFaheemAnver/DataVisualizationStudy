// export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
//   const xTicks = xScale.ticks();

//   return xTicks.map((tick) => {
//     return (
//       <g
//         className="tick"
//         key={tick}
//         transform={`translate(${xScale(tick)}, 0)`}
//       >
//         <line
//           // Group translated
//           // x1={xScale(tick)} // group is translated so no need to worry about label margin and translation
//           x1={0}
//           y1={0}
//           // x2={xScale(tick)}
//           x2={0}
//           y2={innerHeight}
//         />
//         <text
//           y={innerHeight}
//           // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy
//           dy={"0.85em"}
//           style={{ textAnchor: "middle" }}
//         >
//           {tickFormat ? tickFormat(tick) : tick}
//         </text>
//       </g>
//     );
//   });
// };

import { useRef, useEffect } from "react";
import { select, axisBottom } from "d3";

export const AxisBottom = ({ xScale, innerHeight }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(18);
    xAxisG.call(xAxis).selectAll(".tick:last-of-type text").remove();
  }, []);
  return <g transform={`translate(0,${innerHeight})`} ref={ref} />;
};
