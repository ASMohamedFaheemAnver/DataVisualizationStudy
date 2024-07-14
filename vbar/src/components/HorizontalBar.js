import UNPopulation2019 from "../UNPopulation2019.csv";
import { csv, max, scaleBand, scaleLinear } from "d3";
import { useEffect, useState } from "react";

function HorizontalBar() {
  const [data, setData] = useState([]);
  const width = 960;
  const height = 500;

  useEffect(() => {
    csv(UNPopulation2019, (row) => {
      row.Population = +row?.["2020"];
      return row;
    }).then((data) => setData(data?.slice(0, 10)));
  }, []);

  if (!data) return <p>Loading...</p>;

  const yScale = scaleBand()
    .domain(data.map((d) => d?.Country))
    .range([0, height]); // Divide 0 - height according to the domain country name

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d?.Population)])
    .range([0, width]);

  console.log(data?.[0]);
  return (
    <svg width={width} height={height}>
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
    </svg>
  );
}

export default HorizontalBar;
