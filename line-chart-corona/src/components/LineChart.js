import {
  extent,
  format,
  line,
  max,
  min,
  scaleLinear,
  scaleTime,
  timeFormat,
} from "d3";
import { useData } from "../hooks/useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { XMarkerLine } from "./XMarkerLine";
import { YMarkerLine } from "./YMarkerLine";

function LineChart() {
  const width = 900;
  const height = 800;
  const margin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100 /* To make more room for label */,
  };

  const data = useData();

  if (!data) return <p>Loading...</p>;

  const innerHeight = height - margin.bottom - margin.top; // Room for labels/yaxis
  const innerWidth = width - margin.left - margin.right; // Room for labels/xaxis
  const xAxisLabel = "Date";
  const yAxisLabel = "Deaths";
  const xValue = (d) => d?.date;
  const yValue = (d) => d?.deathTotal;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0]);

  const formatDate = timeFormat("%b %d");
  const mostRecentDate = xScale.domain()[1];
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          // Ref: https://d3js.org/d3-format
          tickFormat={formatDate}
        />
        <AxisLeft innerWidth={innerWidth} yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
        />
        <YMarkerLine value={10000} yScale={yScale} innerWidth={innerWidth} />
        <XMarkerLine
          value={mostRecentDate}
          label={formatDate(mostRecentDate)}
          xScale={xScale}
          innerHeight={innerHeight}
        />
      </g>
    </svg>
  );
}

export default LineChart;
