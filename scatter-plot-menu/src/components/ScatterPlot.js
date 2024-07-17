import iris from "../iris.csv";
import {
  extent,
  format,
  max,
  min,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from "d3";
import { useData } from "../hooks/useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { Dropdown } from "./Dropdown";
import { useState } from "react";
import { ColorLegend } from "./ColorLegend";

function ScatterPlot() {
  const width = 900;
  const height = 800;
  const margin = {
    top: 100,
    right: 200,
    bottom: 100,
    left: 100 /* To make more room for label */,
  };
  const circleRadius = 5;
  const data = useData(iris);

  const innerHeight = height - margin.bottom - margin.top; // Room for labels/yaxis
  const innerWidth = width - margin.left - margin.right; // Room for labels/xaxis

  const [selectedXValue, setSelectedXValue] = useState("sepal_length");
  const [selectedYValue, setSelectedYValue] = useState("sepal_width");
  const colorLegendLabel = "Species";

  const xValue = (d) => d?.[selectedXValue];
  const yValue = (d) => d?.[selectedYValue];
  const [hoveredOver, setHoveredOver] = useState("");
  const colorValue = (d) => d?.species;

  const filteredData = hoveredOver
    ? data.filter((d) => colorValue(d) === hoveredOver)
    : data;

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

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  if (!data) return <p>Loading...</p>;

  const xOptions = [
    { value: "sepal_length", label: "Sepal length" },
    { value: "sepal_width", label: "Sepal width" },
    { value: "petal_length", label: "Petal length" },
    { value: "petal_width", label: "Petal width" },
    // { value: "species", label: "Species" },
  ];

  const yOptions = [
    { value: "sepal_length", label: "Sepal length" },
    { value: "sepal_width", label: "Sepal width" },
    { value: "petal_length", label: "Petal length" },
    { value: "petal_width", label: "Petal width" },
    // { value: "species", label: "Species" },
  ];

  return (
    <>
      <label htmlFor="x-select">Choose x:</label>
      <Dropdown
        id={"x-select"}
        options={xOptions}
        selectedValue={selectedXValue}
        onSelectedValueChange={setSelectedXValue}
      />
      <label htmlFor="y-select">Choose y:</label>
      <Dropdown
        id={"y-select"}
        options={yOptions}
        selectedValue={selectedYValue}
        onSelectedValueChange={setSelectedYValue}
      />
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + 60}
            // dy={"0.71em"}
            style={{ textAnchor: "middle" }}
          >
            {selectedXValue}
          </text>
          <text
            className="axis-label"
            // x={0}
            // y={innerHeight / 2}
            // dy={"0.71em"}
            style={{ textAnchor: "middle" }}
            transform={`translate(${-60}, ${innerHeight / 2}) rotate(-90)`}
          >
            {selectedYValue}
          </text>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            // Ref: https://d3js.org/d3-format
            tickFormat={(tick) => format(".2s")(tick)}
          />
          <AxisLeft innerWidth={innerWidth} yScale={yScale} />
          <g transform={`translate(${innerWidth + 85}, 0)`}>
            <text className="legend-label" style={{ textAnchor: "middle" }}>
              {colorLegendLabel}
            </text>
            <ColorLegend
              colorScale={colorScale}
              setHoveredOver={setHoveredOver}
            />
          </g>
          <Marks
            // data={data}
            data={filteredData}
            xScale={xScale}
            yScale={yScale}
            yValue={yValue}
            xValue={xValue}
            tooltipFormat={(value) => format(",.2r")(value)}
            circleRadius={circleRadius}
            colorScale={colorScale}
            colorValue={colorValue}
            hoveredOver={hoveredOver}
          />
        </g>
      </svg>
    </>
  );
}

export default ScatterPlot;
