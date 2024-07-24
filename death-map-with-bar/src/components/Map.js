import { useMissingMigrants } from "../hooks/useMissingMigrants";
import { BubbleMap } from "./BubbleMap";
import { DateHistogram } from "./DateHistogram";

function Map() {
  const width = 1000;
  const height = 800;

  const dataHistogramSize = 0.25;

  const missingMigrants = useMissingMigrants();
  if (!missingMigrants) return <p>Loading...</p>;

  return (
    <svg width={width} height={height}>
      <BubbleMap {...{ missingMigrants }} />
      <g
        transform={`translate(0, ${
          height - +(dataHistogramSize * height) - 60
        })`}
      >
        <DateHistogram
          data={missingMigrants}
          height={dataHistogramSize * height}
          width={width}
        />
      </g>
    </svg>
  );
}

export default Map;
