export const BarMarks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
}) => {
  return (
    <g className="mark">
      {binnedData.map((d, i) => {
        const width = xScale(d?.x1) - xScale(d?.x0);
        if (isNaN(width)) {
          // Need some data filtering if get nan
          console.log({ d });
          return null;
        }
        return (
          <rect
            key={i}
            x={xScale(d?.x0)}
            y={yScale(d?.y)} // Starts from actual place
            width={xScale(d?.x1) - xScale(d?.x0)} // x value from start to end of xScale
            height={innerHeight - yScale(d?.y)} // Fill the gape from starting point y to xAxis position which is innerHeight - yScale(d?.y)
            // height={10} // Uncomment this to understand the logic
          >
            {/* Tooltip */}
            {/* If wanna customize the tooltip: https://stackoverflow.com/questions/10643426/how-to-add-a-tooltip-to-an-svg-graphic */}
            <title style={{}}>{`${
              tooltipFormat ? tooltipFormat(d?.y) : d?.y
            }`}</title>
          </rect>
        );
      })}
    </g>
  );
};
