import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";
import corona from "../corona.csv";

const sum = (accumulator, currentValue) => accumulator + currentValue;

const parseDay = timeParse("%m/%d/%y");

const transform = (rawData) => {
  const days = rawData.columns.slice(4);
  return days.map((day) => ({
    date: parseDay(day),
    deathTotal: rawData.map((d) => +d[day]).reduce(sum, 0),
  }));
};

export const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    csv(corona).then((rawData) => {
      setData(transform(rawData));
    });
  }, []);

  return data;
};
