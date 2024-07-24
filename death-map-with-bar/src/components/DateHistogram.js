import {
  bin,
  extent,
  format,
  max,
  scaleLinear,
  scaleTime,
  sum,
  timeFormat,
  timeMonths,
} from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { BarMarks } from "./BarMarks";

export const DateHistogram = ({ data, height, width }) => {
  const margin = {
    top: 20,
    right: 50,
    bottom: 20,
    left: 100 /* To make more room for label */,
  };

  const innerHeight = height - margin.bottom - margin.top; // Room for labels/yaxis
  const innerWidth = width - margin.left - margin.right; // Room for labels/xaxis
  const xAxisLabel = "Date";
  const yAxisLabel = "Total death";
  const xValue = (d) => d?.date;
  const yValue = (d) => d?.death;

  const xScale = scaleTime()
    // .domain([min(data, xValue), max(data, xValue)]) // Can use extent for this case
    // .domain([0, max(data, xValue)]) // If u want the chart to start from 0
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice(); // To prevent mark overflow/put nice number range for x

  const [start, stop] = xScale.domain();
  console.log({ start, stop, timeMonths: timeMonths(start, stop) });
  // Aggregating months data
  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => {
      return {
        y: sum(array, yValue),
        x0: array?.x0,
        x1: array?.x1,
      };
    });

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d?.y)])
    // .domain([0, max(data, yValue)]) // Can use extent for this case but I want a gap between points
    // .domain([min(data, yValue) - 1, max(data, yValue) + 1]) // Can use extent for this case but I want a gap between points
    // .range([0, innerHeight]); // Divide 0 - height according to the domain country name
    .range([innerHeight, 0]) // invert the values
    .nice();

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight + 60}
        // dy={"0.71em"}
        style={{ textAnchor: "middle" }}
      >
        {xAxisLabel}
      </text>
      <text
        className="axis-label"
        // x={0}
        // y={innerHeight / 2}
        // dy={"0.71em"}
        style={{ textAnchor: "middle" }}
        transform={`translate(${-60}, ${innerHeight / 2}) rotate(-90)`}
      >
        {yAxisLabel}
      </text>
      <AxisBottom
        xScale={xScale}
        innerHeight={innerHeight}
        // Ref: https://d3js.org/d3-format
        tickFormat={(tick) => timeFormat("%m/%d/%Y")(tick)}
      />
      <AxisLeft innerWidth={innerWidth} yScale={yScale} />
      <BarMarks
        binnedData={binnedData}
        xScale={xScale}
        yScale={yScale}
        tooltipFormat={(value) => format(",")(value)}
        innerHeight={innerHeight}
      />
    </g>
  );
};
