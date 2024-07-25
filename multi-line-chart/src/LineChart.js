import React from "react";
import { scaleTime, extent, scaleLog, max, line, timeFormat } from "d3";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";

const xValue = (d) => d.date;
const yValue = (d) => d.deathTotal;

const margin = { top: 50, right: 40, bottom: 80, left: 100 };

const formatDate = timeFormat("%b %d");

export const LineChart = ({ data, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const allData = data.reduce(
    (accumulator, countryTimeSeries) => accumulator.concat(countryTimeSeries),
    []
  );

  const epsilon = 1;

  const xScale = scaleTime()
    .domain(extent(allData, xValue))
    .range([0, innerWidth]);

  const yScale = scaleLog()
    .domain([epsilon, max(allData, yValue)])
    .range([innerHeight, 0]);

  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(epsilon + yValue(d)));

  const mostRecentDate = xScale.domain()[1];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <XAxis xScale={xScale} innerHeight={innerHeight} />
        <YAxis yScale={yScale} innerWidth={innerWidth} />
        {data.map((countryTimeSeries, i) => {
          const r = Math.random() * 255;
          const g = Math.random() * 255;
          const b = Math.random() * 255;
          const strokeColor = `rgb(${r},${g},${b})`;
          return (
            <path
              key={i}
              // stroke={strokeColor}
              stroke="black"
              d={lineGenerator(countryTimeSeries)}
            />
          );
        })}
        <text transform={`translate(${innerWidth / 2},0)`} textAnchor="middle">
          Global Coronavirus Deaths Over Time by Country
        </text>
        <text
          className="axis-label"
          transform={`translate(-40,${innerHeight / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          Cumulative Deaths
        </text>
        <text
          className="axis-label"
          textAnchor="middle"
          alignmentBaseline="hanging"
          transform={`translate(${innerWidth / 2},${innerHeight + 40})`}
        >
          Time
        </text>
      </g>
    </svg>
  );
};
