// Ref: https://d3js.org/d3-geo

import { geoEqualEarth, geoNaturalEarth1, geoGraticule, geoPath } from "d3";

// Ref: https://d3js.org/d3-geo/azimuthal#geoGnomonic
export const Marks = ({ worldAtlas, hiv, colorScale, colorValue, codes }) => {
  const projection = geoNaturalEarth1();
  const path = geoPath(projection);

  const graticule = geoGraticule();

  return (
    <g className="marks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticule" d={path(graticule())} />
      {/* {worldAtlas?.countries?.features?.map((feature, i) => {
        return <path className="country" key={i} d={path(feature)} />;
      })} */}
      {worldAtlas?.countries?.features?.map((feature, i) => {
        const countryCode = codes?.find(
          (code) => code?.["country-code"] === feature?.id
        );
        const d = hiv?.find((h) => h?.Code === countryCode?.["alpha-3"]);
        return (
          <path
            className="country"
            fill={colorScale(colorValue(d)) || "#c3c3c3"}
            key={i}
            d={path(feature)}
          />
        );
      })}
      <path className="interiors" d={path(worldAtlas?.interiors)} />
    </g>
  );
};
