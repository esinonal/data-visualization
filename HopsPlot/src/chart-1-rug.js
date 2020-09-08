
import * as d3 from 'd3'

export default function Chart1Rug () {
  fetch('./data/cars.json')
    .then(d => d.json())
    .then(d => rug(d))
}

// constants
const height = 150
const width = 600
const margin = {left: 10, top: 70, right: 10, bottom: 10}
// const plotWidth = width - margin.left - margin.right
const field = 'Displacement'
// const lineHeight = 20
// const lineWidth = 2
function rug (data) {
  // 1. construct a container and appropriate scale
  // YOUR WORK HERE  - approx 9 lines
  const svg = d3.select('#chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Displacement)])
    .range([0, width - 45])

  // 2. render the lines
  // YOUR WORK HERE - approx 9 lines
  svg.append('g')
      .selectAll('thelines')
      .data(data).enter()
      .append('line').attr('class', 'lines')
      .attr('x1', function func1(d) { return xScale(d.Displacement) })
      .attr('x2', function func2(d) { return xScale(d.Displacement) })
      .attr('y1', 0)
      .attr('y2', 20)
      .style('stroke', '#7aabd8')
      .style('stroke-width', 1.5);

  // 3. add axes and labels
  // YOUR WORK HERE - approx 5 lines

  const xAxis = d3.axisBottom()
    .scale(xScale)
  const xAxisG = svg.append('g')
    .attr('transform', 'translate(0, 10)')
    .call(xAxis)
  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -20)
    .attr('x', 55)
    .attr('fill', 'black')
    .attr('font-size', '18px')
    .text(field)
}
