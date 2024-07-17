const width = 960;
const height = 500;
const sphere = { type: "Sphere" };

const projection = d3
  .geoOrthographic()
  .scale(250)
  .translate([width / 2, height / 2])
  .clipAngle(90);

const path = d3.geoPath(projection);

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const graticule = d3.geoGraticule();

const g = svg.append("g");

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
  (world) => {
    const land = topojson.feature(world, world.objects.land);
    const borders = topojson.mesh(
      world,
      world.objects.countries,
      (a, b) => a !== b
    );

    g.append("path")
      .datum(sphere)
      .attr("d", path)
      .attr("fill", "#d8e7ff")
      .attr("stroke", "#000");

    g.append("path")
      .datum(graticule)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#ccc");

    const landPath = g
      .append("path")
      .datum(land)
      .attr("d", path)
      .attr("fill", "#74c476")
      .attr("stroke", "#000");

    const borderPath = g
      .append("path")
      .datum(borders)
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#000");

    const drag = d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);

    svg.call(drag);

    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

    svg.call(zoom);

    let previousPos = null;

    function dragStarted(event) {
      previousPos = [event.x, event.y];
    }

    function dragged(event) {
      const currentPos = [event.x, event.y];
      const dx = currentPos[0] - previousPos[0];
      const dy = currentPos[1] - previousPos[1];
      const rotation = projection.rotate();
      const newRotation = [rotation[0] + dx / 4, rotation[1] - dy / 4];
      projection.rotate(newRotation);
      landPath.attr("d", path);
      borderPath.attr("d", path);
      previousPos = currentPos;
    }

    function dragEnded() {
      previousPos = null;
    }

    function zoomed(event) {
      const { transform } = event;
      projection.scale(250 * transform.k);
      g.selectAll("path").attr("d", path);
    }
  }
);
