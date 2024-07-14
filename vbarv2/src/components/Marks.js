export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
}) => {
  return data.map((d, i) => {
    return (
      <rect
        className="mark"
        key={i}
        x={0}
        y={yScale(yValue(d))}
        /* yScale of current d */ width={xScale(xValue(d))}
        height={yScale.bandwidth()}
      >
        {/* Tooltip */}
        {/* If wanna customize the tooltip: https://stackoverflow.com/questions/10643426/how-to-add-a-tooltip-to-an-svg-graphic */}
        <title style={{}}>{`Tooltip : ${
          tooltipFormat ? tooltipFormat(xValue(d)) : xValue(d)
        }`}</title>
      </rect>
    );
  });
};
