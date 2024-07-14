import { useState, useEffect } from "react";
import { csv } from "d3";

export const useData = (csvUrl) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(csvUrl, (row) => {
      row.sepal_length = +row?.sepal_length;
      row.sepal_width = +row?.sepal_width;
      row.petal_length = +row?.petal_length;
      row.petal_width = +row?.petal_width;
      return row;
    }).then(setData);
  }, []);
  return data;
};
