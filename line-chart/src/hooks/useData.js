import { useState, useEffect } from "react";
import { csv } from "d3";

export const useData = (csvUrl) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(csvUrl, (row) => {
      row.temperature = +row?.temperature;
      row.timestamp = new Date(row?.timestamp);
      return row;
    }).then(setData);
  }, []);
  return data;
};
