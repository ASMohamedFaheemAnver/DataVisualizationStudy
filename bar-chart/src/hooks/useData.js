import { useState, useEffect } from "react";
import { csv } from "d3";

export const useData = (csvUrl) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(csvUrl, (row) => {
      row.death = +row?.["Total Dead and Missing"];
      row.date = new Date(row?.["Reported Date"]);
      return row;
    }).then(setData);
  }, []);
  return data;
};
