import { useWorldAtlasData } from "../hooks/useWorldAtlasData";
import { MapMarks } from "./MapMarks";
import { max, scaleSqrt } from "d3";

export const BubbleMap = ({ missingMigrants }) => {
  const sizeValue = (city) => city?.death;
  const sizeScale = scaleSqrt()
    .domain([0, max(missingMigrants, sizeValue)])
    .range([0, 20]);
  const worldAtlas = useWorldAtlasData();
  if (!worldAtlas) return <p>Loading...</p>;
  return (
    <MapMarks
      worldAtlas={worldAtlas}
      missingMigrants={missingMigrants}
      sizeScale={sizeScale}
      sizeValue={sizeValue}
    />
  );
};
