import { curveNatural, line } from "d3";

export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
}) => {
  return (
    <g className="mark">
      {/* Ref: https://d3js.org/d3-shape/line */}
      <path
        d={line()
          // https://d3js.org/d3-shape/line#line_curve
          .curve(curveNatural)
          .x((d) => xScale(d?.timestamp))
          .y((d) => yScale(d?.temperature))(data)}
        fill="none"
        stroke="black"
      />
      {data.map((d, i) => {
        return (
          <circle
            key={i}
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
          >
            {/* Tooltip */}
            {/* If wanna customize the tooltip: https://stackoverflow.com/questions/10643426/how-to-add-a-tooltip-to-an-svg-graphic */}
            <title style={{}}>{`Temperature : ${
              tooltipFormat ? tooltipFormat(yValue(d)) : yValue(d)
            }C`}</title>
          </circle>
        );
      })}
    </g>
  );
};
