import iris from "../iris.csv";
import { extent, format, max, min, scaleBand, scaleLinear } from "d3";
import { useData } from "../hooks/useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

function ScatterPlot() {
  const width = 900;
  const height = 800;
  const margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100 /* To make more room for label */,
  };
  const circleRadius = 5;
  const xAxisLabel = "Sepal Length";
  const yAxisLabel = "Sepal Width";
  const data = useData(iris);

  if (!data) return <p>Loading...</p>;

  const innerHeight = height - margin.bottom - margin.top; // Room for labels/yaxis
  const innerWidth = width - margin.left - margin.right; // Room for labels/xaxis

  const xValue = (d) => d?.sepal_length;
  const yValue = (d) => d?.sepal_width;

  const xScale = scaleLinear()
    // .domain([min(data, xValue), max(data, xValue)]) // Can use extent for this case
    // .domain([0, max(data, xValue)]) // If u want the chart to start from 0
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice(); // To prevent mark overflow/put nice number range for x

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    // .domain([0, max(data, yValue)]) // Can use extent for this case but I want a gap between points
    // .domain([min(data, yValue) - 1, max(data, yValue) + 1]) // Can use extent for this case but I want a gap between points
    // .range([0, innerHeight]); // Divide 0 - height according to the domain country name
    .range([innerHeight, 0]); // invert the values

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
          tickFormat={(tick) => format(".2s")(tick)}
        />
        <AxisLeft innerWidth={innerWidth} yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
          tooltipFormat={(value) => format(",.2r")(value)}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
}

export default ScatterPlot;
