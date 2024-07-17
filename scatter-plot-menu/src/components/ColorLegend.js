export const ColorLegend = ({
  colorScale,
  tickSpacing = 35,
  tickSize = 10,
  setHoveredOver,
}) => {
  const domains = colorScale.domain();
  console.log({ domains });

  return domains.map((domain, i) => {
    return (
      <g
        className="legend"
        key={domain}
        transform={`translate(0, ${i * tickSpacing + 35})`}
        onMouseEnter={() => setHoveredOver(domain)}
        onMouseLeave={() => setHoveredOver("")}
      >
        <circle fill={colorScale(domain)} r={tickSize} />
        <text fill={colorScale(domain)} dy={".32rem"} x={"1rem"}>
          {domain}
        </text>
      </g>
    );
  });
};
