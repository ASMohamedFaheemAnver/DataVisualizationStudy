import { useCities } from "../hooks/useCities";
import { useWorldAtlasData } from "../hooks/useWorldAtlasData";
import { Marks } from "./Marks";

function Map() {
  const width = 1000;
  const height = 1000;
  const worldAtlas = useWorldAtlasData();
  const cities = useCities();
  console.log({ cities });
  if (!worldAtlas || !cities) return <p>Loading...</p>;
  return (
    <svg width={width} height={height}>
      <Marks worldAtlas={worldAtlas} cities={cities} />
    </svg>
  );
}

export default Map;
