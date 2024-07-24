import { useState, useEffect } from "react";
import { csv } from "d3";
import missingMigrants from "../missingMigrants.csv";

export const useMissingMigrants = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(missingMigrants, (row) => {
      row.coords = row?.["Location Coordinates"]
        ?.split(",")
        .map((ll) => +ll)
        .reverse(); // lat, lng are reversed in the dataset
      row.death = +row?.["Total Dead and Missing"];
      row.date = new Date(row?.["Reported Date"]);
      return row;
    })
      .then((missingMigrants) => {
        setData(missingMigrants);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);
  return data;
};
