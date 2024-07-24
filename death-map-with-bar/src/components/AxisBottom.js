export const AxisBottom = ({ xScale, innerHeight, tickFormat }) => {
  const xTicks = xScale.ticks();

  return xTicks.map((tick) => {
    return (
      <g
        className="tick"
        key={tick}
        transform={`translate(${xScale(tick)}, 0)`}
      >
        <line
          // Group translated
          // x1={xScale(tick)} // group is translated so no need to worry about label margin and translation
          x1={0}
          y1={0}
          // x2={xScale(tick)}
          x2={0}
          y2={innerHeight}
        />
        <text
          y={innerHeight}
          // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy
          dy={"0.85em"}
          style={{ textAnchor: "middle" }}
        >
          {tickFormat ? tickFormat(tick) : tick}
        </text>
      </g>
    );
  });
};
