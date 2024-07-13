import {
  markCircle,
  x,
  y,
  color,
  size,
  tooltip,
  markPoint,
} from "vega-lite-api";
// export const viz = markCircle({ size: 300, opacity: 0.5 }).encode(
//   x().fieldQ("mpg").scale({ zero: false }),
//   y().fieldQ("horsepower").scale({ zero: false }),
//   color().fieldN("origin"),
//   size().fieldQ("weight"),
//   tooltip().fieldN("name")
// );

export const viz = markCircle({ size: 300, opacity: 0.5 }).encode(
  x().fieldQ("mpg").scale({ zero: false }),
  y().fieldQ("horsepower").scale({ zero: false }),
  color().fieldQ("weight")
);

// {
//   "mpg": "18",
//   "cylinders": "8",
//   "displacement": "307",
//   "horsepower": "130",
//   "weight": "3504",
//   "acceleration": "12",
//   "year": "1970",
//   "origin": "USA",
//   "name": "chevrolet chevelle malibu"
// }

// export const viz = markPoint().encode(
//   x().fieldQ("mpg"),
//   y().fieldQ("horsepower")
// );

// export const viz = markPoint().encode(
//   x().fieldT("year"),
//   y().fieldQ("horsepower")
// );
