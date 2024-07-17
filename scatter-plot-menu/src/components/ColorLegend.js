export const ColorLegend = ({
  colorScale,
  tickSpacing = 35,
  tickSize = 10,
}) => {
  const domains = colorScale.domain();
  console.log({ domains });

  return domains.map((domain, i) => {
    return (
      <g key={domain} transform={`translate(0, ${i * tickSpacing + 35})`}>
        <circle fill={colorScale(domain)} r={tickSize} />
        <text fill={colorScale(domain)} dy={".32rem"} x={"1rem"}>
          {domain}
        </text>
      </g>
    );
  });
};
