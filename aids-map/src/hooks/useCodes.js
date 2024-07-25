import { useState, useEffect } from "react";
import { csv } from "d3";
import codes from "../codes.csv";

export const useCodes = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    csv(codes).then(setData);
  }, []);

  return data;
};
