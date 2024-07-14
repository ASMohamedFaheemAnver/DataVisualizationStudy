import UNPopulation2019 from "../UNPopulation2019.csv";
import { format, max, scaleBand, scaleLinear } from "d3";
import { useData } from "../hooks/useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

function HorizontalBarWithLabel() {
  const width = 800;
  const height = 400;
  const margin = {
    top: 80,
    right: 80,
    bottom: 80,
    left: 185 /* To make more room for label */,
  };
  const data = useData(UNPopulation2019);

  if (!data) return <p>Loading...</p>;

  const innerHeight = height - margin.bottom - margin.top; // Room for labels/yaxis
  const innerWidth = width - margin.left - margin.right; // Room for labels/xaxis

  const yValue = (d) => d?.Country;
  const xValue = (d) => d?.Population;

  const yScale = scaleBand()
    // .padding(0.1) // Between 0 - 1
    .paddingInner(0.1)
    .domain(data.map(yValue))
    .range([0, innerHeight]); // Divide 0 - height according to the domain country name

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

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
          Population
        </text>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          // Ref: https://d3js.org/d3-format
          tickFormat={(tick) => format(".2s")(tick)}
        />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          yValue={yValue}
          xValue={xValue}
          tooltipFormat={(value) => format(",.2r")(value)}
        />
      </g>
    </svg>
  );
}

export default HorizontalBarWithLabel;
