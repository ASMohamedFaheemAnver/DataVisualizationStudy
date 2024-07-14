export const AxisLeft = ({ yScale }) => {
  const yTicks = yScale.domain(); // yScale domain is All the country list and it's starting point
  return yTicks.map((tick) => {
    return (
      <g
        className="tick"
        key={tick}
        transform={`translate(0, ${yScale(tick) + yScale.bandwidth() / 2})`}
      >
        <text
          style={{ textAnchor: "end" }}
          // dy={yScale.bandwidth() / 2} // Moved to group
          x={-5}
        >
          {tick}
        </text>
      </g>
    );
  });
};
