// Ref: https://d3js.org/d3-geo

import { geoEqualEarth, geoNaturalEarth1, geoGraticule, geoPath } from "d3";

// Ref: https://d3js.org/d3-geo/azimuthal#geoGnomonic
export const Marks = ({ worldAtlas, cities }) => {
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
      {worldAtlas?.lands?.features?.map((feature, i) => {
        return <path className="country" key={i} d={path(feature)} />;
      })}
      <path className="interiors" d={path(worldAtlas?.interiors)} />
      {cities?.map((city, i) => {
        const [x, y] = projection([city?.lng, city?.lat]);
        return (
          <circle key={i} cx={x} cy={y} r={1}>
            <title style={{}}>{city?.city}</title>
          </circle>
        );
      })}
    </g>
  );
};
