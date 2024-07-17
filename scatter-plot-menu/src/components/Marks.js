export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
  colorScale,
  colorValue,
}) => {
  return data.map((d, i) => {
    return (
      <circle
        className="mark"
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        fill={colorScale(colorValue(d))}
      >
        {/* Tooltip */}
        {/* If wanna customize the tooltip: https://stackoverflow.com/questions/10643426/how-to-add-a-tooltip-to-an-svg-graphic */}
        <title style={{}}>{`Tooltip : ${
          tooltipFormat ? tooltipFormat(xValue(d)) : xValue(d)
        }`}</title>
      </circle>
    );
  });
};
