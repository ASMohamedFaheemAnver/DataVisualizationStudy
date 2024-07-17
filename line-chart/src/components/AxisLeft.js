export const AxisLeft = ({ yScale, innerWidth }) => {
  const yTicks = yScale.ticks();
  return yTicks.map((tick) => {
    return (
      <g
        className="tick"
        key={tick}
        transform={`translate(0, ${yScale(tick)})`}
      >
        <line x1={0} y1={0} x2={innerWidth} y2={0} />
        <text style={{ textAnchor: "end" }} x={-5}>
          {tick}
        </text>
      </g>
    );
  });
};
