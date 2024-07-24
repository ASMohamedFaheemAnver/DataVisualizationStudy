import { max, scaleSqrt } from "d3";
import { useWorldAtlasData } from "../hooks/useWorldAtlasData";
import { Marks } from "./Marks";
import { useMissingMigrants } from "../hooks/useMissingMigrants";

function Map() {
  const width = 1000;
  const height = 1000;
  const worldAtlas = useWorldAtlasData();
  const missingMigrants = useMissingMigrants();
  const sizeValue = (city) => city?.death;
  const sizeScale = scaleSqrt()
    .domain([0, max(missingMigrants, sizeValue)])
    .range([0, 20]);

  if (!worldAtlas || !missingMigrants) return <p>Loading...</p>;
  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        missingMigrants={missingMigrants}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
}

export default Map;
