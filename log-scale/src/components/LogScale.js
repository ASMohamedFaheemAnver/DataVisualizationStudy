import missingMigrants from "../missingMigrants.csv";
import {
  extent,
  format,
  max,
  scaleLinear,
  scaleLog,
  scaleTime,
  timeFormat,
} from "d3";
import { useData } from "../hooks/useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

function LogScale() {
  const width = 900;
  const height = 800;
  const margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100 /* To make more room for label */,
  };
  const data = useData(missingMigrants);
  if (!data) return <p>Loading...</p>;

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

  const yScale = scaleLog()
    .domain([1, max(data, yValue)]) // log(0) is infinity so better to put a small number like 0.001 as min value but 1 is better after experimenting with it
    // .domain([0, max(data, yValue)]) // Can use extent for this case but I want a gap between points
    // .domain([min(data, yValue) - 1, max(data, yValue) + 1]) // Can use extent for this case but I want a gap between points
    // .range([0, innerHeight]); // Divide 0 - height according to the domain country name
    .range([innerHeight, 0]) // invert the values
    .nice();

  return (
    <svg width={width} height={height}>
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
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={(value) => format(",")(value)}
          innerHeight={innerHeight}
          circleRadius={1.5}
        />
      </g>
    </svg>
  );
}

export default LogScale;
