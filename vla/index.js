import * as vega from "vega";
import * as vegaLite from "vega-lite";
import { register } from "vega-lite-api";
import { Handler } from "vega-tooltip";
import { config } from "./config";
import { getData } from "./getData";
import { viz } from "./viz";

register(vega, vegaLite, {
  view: { renderer: "svg" }, // Can use canvas for data points more than 10000 to increase performance but points will be blurry
  init: (view) => {
    view.tooltip(new Handler().call);
  },
});

const run = async () => {
  const marks = viz
    .data(await getData())
    .width(window.innerWidth)
    .height(window.innerHeight)
    .autosize({ type: "fit", contains: "padding" })
    .config(config);
  // console.log({ svg: (await marks.render()).innerHTML });
  document.body.appendChild(await marks.render());
};
run();
