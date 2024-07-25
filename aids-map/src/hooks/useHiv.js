import { useState, useEffect } from "react";
import { csv } from "d3";
import hiv from "../hiv.csv";

export const useHiv = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    csv(hiv, (row) => {
      row.aids =
        +row[
          "Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)"
        ];
      return row;
    })
      .then((hiv) => {
        console.log({ hiv });
        setData(hiv);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);
  return data;
};
