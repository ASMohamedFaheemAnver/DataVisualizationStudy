import { useState, useEffect } from "react";
import { csv } from "d3";

export const useData = (csvUrl) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(csvUrl, (row) => {
      row.Population = +row?.["2020"] * 1000; // Data in k so need to multiply by 1000
      return row;
    }).then((data) => setData(data?.slice(0, 10)));
  }, []);
  return data;
};
