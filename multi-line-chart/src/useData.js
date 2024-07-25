import { useState, useEffect } from "react";
import { csv, timeParse } from "d3";
import covid from "./covid.csv";

const sum = (accumulator, currentValue) => accumulator + currentValue;

const parseDay = timeParse("%m/%d/%y");

const transform = (rawData) => {
  // Filter out rows that represent provinces or states.
  const countriesData = rawData.filter((d) => !d["Province/State"]);
  // Get time series data for each country.
  const days = rawData.columns.slice(4);
  return countriesData.map((d) => {
    //const countryName = d['Country/Region'];
    return days.map((day) => ({
      date: parseDay(day),
      deathTotal: +d[day],
    }));
  });
};

export const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    csv(covid).then((rawData) => {
      setData(transform(rawData));
    });
  }, []);

  return data;
};
