import {csv} from 'd3-fetch'
import {groupBy, buildStats} from './utils'
import * as d3 from 'd3'

// don't disable any lints, we'll check! only this one is allowed
// it's to enable the animation
// eslint-disable-next-line no-unused-vars
import transition from 'd3-transition'

// we provided a bootstrap function for you!
const bootstrap = data => data.map(() => data[Math.floor(Math.random() * data.length)])

/**
 * Compute the mean of the data for each of the categories.
 * Make sure you sort them by the name of the drug
 * @param {*} data
 */
function aggregateData (data) {
  const grouped = groupBy(data, 'Drug')
  const resultArray = []
  Object.keys(grouped).forEach(key => {
    const theStats = buildStats(grouped[key], 'Effectiveness')
    grouped[key].stats = theStats 
    // console.log(key);
    // console.log(theStats.mean);
    grouped[key].key = key
    resultArray.push(grouped[key])
  })
  return (resultArray)
}

export default function Chart4HOPS () {
  csv('./data/gaussian-random.csv').then(d => hopVis(d))
}

// constants
const height = 500
const width = 600
const margin = {left: 50, top: 50, right: 50, bottom: 50}
const plotWidth = width - margin.left - margin.right
const plotHeight = height - margin.top - margin.bottom
const heightOfBar = 10
function hopVis (data) {
  // 1. set up container
  // YOUR WORK HERE - approx 6 lines
  const container = d3.select('#chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // 2. specify a transition  - 1 line
  const t = d3.transition().duration(40)

  // 3. scales (linear and a band)
  // YOUR WORK HERE - approx 7 lines
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Effectiveness)])
    .range([plotHeight, 0])
  yScale.nice();

  const xScale = d3.scaleBand()
    .domain(['A', 'B', 'C'])
    .range([0, plotWidth])

  // 4. axes
  // YOUR WORK HERE - approx 5 lines
  const yAxis = d3.axisLeft()
    .scale(yScale)
  container.append('g')
    .call(yAxis)
  const xAxis = d3.axisBottom()
    .scale(xScale)
  container.append('g')
    .attr('transform', `translate(${0}, ${plotHeight})`)
    .call(xAxis)

  // the recursive hopping function
  // could also do it with a set interval
  function drawHop () {
    // 5. render the bar updating as appropriate
    // YOUR WORK HERE - approx 9 lines
    const bootstrapped = aggregateData(bootstrap(data))
    container.selectAll('rect')
      .data(bootstrapped)
      .join(
        enter =>
          enter
            .append('rect')
            .attr('x', d => {
              return xScale(d.key)
            })
            .attr('y', d => {
              return yScale(d.stats.mean)
            })
            .attr('width', xScale.bandwidth())
            .attr('height', d => {
              return heightOfBar
            })
            .attr('fill', 'steelblue'),
        update =>
          update.call(el =>
            el
              .transition(t)
              .duration(0)
              .attr('x', d => {
                return xScale(d.key)
              })
              .attr('y', d => {
                return yScale(d.stats.mean)
              })
              .attr('width', xScale.bandwidth())
              .attr('height', d => {
                return heightOfBar 
              })
              .attr('fill', 'steelblue')
          )
      )

    setTimeout(() => drawHop(), 750)
  }
  drawHop()
}
