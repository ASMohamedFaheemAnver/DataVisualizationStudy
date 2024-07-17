// Ref: https://d3js.org/d3-geo

import { geoEqualEarth, geoNaturalEarth1, geoGraticule, geoPath } from "d3";

// Ref: https://d3js.org/d3-geo/azimuthal#geoGnomonic
export const Marks = ({ data }) => {
  const projection = geoNaturalEarth1();
  const path = geoPath(projection);

  const graticule = geoGraticule();

  return (
    <g className="marks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticule" d={path(graticule())} />
      {/* {data?.countries?.features?.map((feature, i) => {
        return <path className="country" key={i} d={path(feature)} />;
      })} */}
      {data?.lands?.features?.map((feature, i) => {
        return <path className="country" key={i} d={path(feature)} />;
      })}
      <path className="interiors" d={path(data?.interiors)} />
    </g>
  );
};
