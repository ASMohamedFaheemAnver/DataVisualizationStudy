import { curveNatural, line } from "d3";

export const Marks = ({ data, xScale, yScale, xValue, yValue }) => {
  return (
    <g className="mark">
      {/* Ref: https://d3js.org/d3-shape/line */}
      <path
        d={line()
          // https://d3js.org/d3-shape/line#line_curve
          .curve(curveNatural)
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))(data)}
        fill="none"
        stroke="black"
      />
    </g>
  );
};
