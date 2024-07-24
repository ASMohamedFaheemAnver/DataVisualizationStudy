import { useState } from "react";
import { useMissingMigrants } from "../hooks/useMissingMigrants";
import { BubbleMap } from "./BubbleMap";
import { DateHistogram } from "./DateHistogram";

function Map() {
  const width = 1000;
  const height = 800;

  const dataHistogramSize = 0.25;
  const [brushExtend, setBrushExtend] = useState(null);
  const missingMigrants = useMissingMigrants();
  if (!missingMigrants) return <p>Loading...</p>;

  const filteredData = missingMigrants?.filter((migrant) => {
    const date = migrant?.date;
    if (brushExtend) {
      return date > brushExtend?.[0] && date < brushExtend?.[1];
    }
    return true;
  });

  return (
    <svg width={width} height={height}>
      <BubbleMap {...{ missingMigrants: filteredData }} />
      <g
        transform={`translate(0, ${
          height - +(dataHistogramSize * height) - 60
        })`}
      >
        <DateHistogram
          data={missingMigrants}
          height={dataHistogramSize * height}
          width={width}
          setBrushExtend={setBrushExtend}
        />
      </g>
    </svg>
  );
}

export default Map;
