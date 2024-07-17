const width = 960
const height = 500
const sphere = { type: 'Sphere' }

const projection = d3
  .geoOrthographic()
  .scale(250)
  .translate([width / 2, height / 2])
  .clipAngle(90)

const path = d3.geoPath(projection)

const canvas = d3.select('body').append('canvas').attr('width', width).attr('height', height).node()

const context = canvas.getContext('2d')

const graticule = d3.geoGraticule()

d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then((world) => {
  const land = topojson.feature(world, world.objects.land)
  const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b)

  d3.timer((elapsed) => {
    context.clearRect(0, 0, width, height)

    projection.rotate([elapsed * 0.02, -10])

    context.beginPath()
    path.context(context)(sphere)
    context.lineWidth = 1
    context.strokeStyle = '#000'
    context.stroke()

    context.beginPath()
    path(land)
    context.fillStyle = '#74c476'
    context.fill()

    context.beginPath()
    path(graticule())
    context.lineWidth = 0.5
    context.strokeStyle = '#ccc'
    context.stroke()

    context.beginPath()
    path(borders)
    context.lineWidth = 0.5
    context.strokeStyle = '#000'
    context.stroke()
  })
})
