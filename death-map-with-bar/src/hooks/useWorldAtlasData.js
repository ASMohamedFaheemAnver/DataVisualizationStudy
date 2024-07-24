import { useState, useEffect } from "react";
import { json } from "d3";
import { feature, mesh } from "topojson-client";

export const useWorldAtlasData = () => {
  const [data, setData] = useState([]);
  console.log({ data });
  useEffect(() => {
    json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((topology) => {
        console.log({ topology });
        //  The feature function expects two arguments: the TopoJSON object and the name of the object to be converted.
        // const countries = feature(topology, "countries");
        // Converting topoJSON to geoJSON
        const countries = feature(topology, topology.objects.countries);
        const lands = feature(topology, topology.objects.land);
        console.log({ countries });

        // Remove paths between countries and sea
        const countriesV2 = mesh(
          topology,
          topology.objects.countries,
          (a, b) => a !== b
        );
        setData({ countries, interiors: countriesV2, lands });
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);
  return data;
};
