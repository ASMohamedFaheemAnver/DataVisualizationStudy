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
  hoveredOver,
}) => {
  return data.map((d, i) => {
    const colorDomain = colorValue(d);
    const isHoveredOverColorDomain = colorDomain === hoveredOver;
    // const isHoveredOverColorDomain = false;
    return (
      <circle
        className={"mark" + isHoveredOverColorDomain ? "hovered" : ""}
        key={i}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius + (isHoveredOverColorDomain ? 5 : 0)}
        fill={colorScale(colorDomain)}
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
