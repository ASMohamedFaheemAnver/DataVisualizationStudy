import { max, scaleSequential, scaleSqrt, interpolateYlOrRd } from "d3";
import { useWorldAtlasData } from "../hooks/useWorldAtlasData";
import { Marks } from "./Marks";
import { useHiv } from "../hooks/useHiv";
import { useCodes } from "../hooks/useCodes";

function Map() {
  const width = 1000;
  const height = 1000;
  const worldAtlas = useWorldAtlasData();
  const hiv = useHiv();
  const codes = useCodes();
  // Getting only 2017 data for now
  const filteredHiv = hiv?.filter((h) => {
    return h?.Year === "2017";
  });

  const colorValue = (h) => h?.aids;
  // Ref: https://d3js.org/d3-interpolate/color#color-interpolation
  const colorScale = scaleSequential(interpolateYlOrRd).domain([
    0,
    max(filteredHiv, colorValue),
  ]);

  if (!worldAtlas || !hiv || !codes) return <p>Loading...</p>;
  return (
    <svg width={width} height={height}>
      <Marks
        worldAtlas={worldAtlas}
        hiv={filteredHiv}
        colorScale={colorScale}
        colorValue={colorValue}
        codes={codes}
      />
    </svg>
  );
}

export default Map;
