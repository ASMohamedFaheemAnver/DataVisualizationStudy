// Ref: https://d3js.org/d3-geo

import { geoEqualEarth, geoNaturalEarth1, geoGraticule, geoPath } from "d3";
import { useMemo } from "react";

// Ref: https://d3js.org/d3-geo/azimuthal#geoGnomonic
export const MapMarks = ({
  worldAtlas,
  missingMigrants,
  sizeScale,
  sizeValue,
}) => {
  const projection = geoNaturalEarth1();
  const path = geoPath(projection);

  const graticule = geoGraticule();

  return (
    <g className="marks">
      {useMemo(() => {
        return (
          <>
            <path className="sphere" d={path({ type: "Sphere" })} />
            <path className="graticule" d={path(graticule())} />
            {/* {worldAtlas?.countries?.features?.map((feature, i) => {
        return <path className="country" key={i} d={path(feature)} />;
      })} */}
            {worldAtlas?.lands?.features?.map((feature, i) => {
              return <path className="country" key={i} d={path(feature)} />;
            })}
            <path className="interiors" d={path(worldAtlas?.interiors)} />
          </>
        );
      }, [worldAtlas])}
      {missingMigrants?.map((migrant, i) => {
        const [x, y] = projection(migrant?.coords);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={sizeScale(sizeValue(migrant))}
          ></circle>
        );
      })}
    </g>
  );
};
