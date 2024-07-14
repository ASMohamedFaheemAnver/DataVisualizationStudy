import UNPopulation2019 from "../UNPopulation2019.csv";
import { csv, max, scaleBand, scaleLinear } from "d3";
import { useEffect, useState } from "react";

function HorizontalBarWithLabel() {
  const [data, setData] = useState([]);
  const width = 960;
  const height = 500;
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 225 /* To make more room for label */,
  };

  useEffect(() => {
    csv(UNPopulation2019, (row) => {
      row.Population = +row?.["2020"];
      return row;
    }).then((data) => setData(data?.slice(0, 10)));
  }, []);

  if (!data) return <p>Loading...</p>;

  const innerHeight = height - margin.bottom - margin.top; // Room for labels/yaxis
  const innerWidth = width - margin.left - margin.right; // Room for labels/xaxis

  const yScale = scaleBand()
    .domain(data.map((d) => d?.Country))
    .range([0, innerHeight]); // Divide 0 - height according to the domain country name

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d?.Population)])
    .range([0, innerWidth]);

  const xTicks = xScale.ticks();
  const yTicks = yScale.domain(); // yScale domain is All the country list and it's starting point

  console.log({ xTicks: xScale.ticks(20) });

  console.log(data?.[0]);
  return (
    <svg width={width} height={height} style={{ background: "gray" }}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xTicks.map((tick) => {
          return (
            <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
              <line
                // Group translated
                // x1={xScale(tick)} // group is translated so no need to worry about label margin and translation
                x1={0}
                y1={0}
                // x2={xScale(tick)}
                x2={0}
                y2={innerHeight}
                stroke="black"
              />
              <text
                y={innerHeight}
                // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy
                dy={"0.71em"}
                style={{ textAnchor: "middle" }}
              >
                {tick}
              </text>
            </g>
          );
        })}
        {yTicks.map((tick) => {
          return (
            <g
              key={tick}
              transform={`translate(0, ${
                yScale(tick) + yScale.bandwidth() / 2
              })`}
            >
              <text
                style={{ textAnchor: "end" }}
                // dy={yScale.bandwidth() / 2} // Moved to group
                x={-5}
              >
                {tick}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          return (
            <rect
              key={i}
              x={0}
              y={yScale(d?.Country)}
              /* yScale of current d */ width={xScale(d?.Population)}
              height={yScale.bandwidth()}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default HorizontalBarWithLabel;
