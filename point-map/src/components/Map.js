import { max, scaleSqrt } from "d3";
import { useCities } from "../hooks/useCities";
import { useWorldAtlasData } from "../hooks/useWorldAtlasData";
import { Marks } from "./Marks";

function Map() {
  const width = 1000;
  const height = 1000;
  const worldAtlas = useWorldAtlasData();
  const cities = useCities();
  const sizeValue = (city) => city?.population;
  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, 20]);

  if (!worldAtlas || !cities) return <p>Loading...</p>;
  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        cities={cities}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </svg>
  );
}

export default Map;
