import { useState, useEffect } from "react";
import { csv } from "d3";
import cities from "../worldcities_clean.csv";

export const useCities = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(cities, (row) => {
      row.lat = +row?.lat;
      row.lng = +row?.lng;
      row.population = +row?.population;
      return row;
    })
      .then((cities) => {
        setData(cities);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);
  return data;
};
