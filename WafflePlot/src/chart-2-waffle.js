import {groupBy, buildStats} from './utils'
import * as d3 from 'd3'

export default function Chart2Waffle () {
  fetch('./data/movies.json')
    .then(d => d.json())
    .then(d => waffle(d))
}

// do your work here
const NUM_VERTICAL_BOXES = 8
const NUM_COLS = 60
const height = 500
const width = 600
const margin = {left: 30, top: 80, right: 10, bottom: 10}
const boxHeight = NUM_VERTICAL_BOXES
const boxWidth = NUM_VERTICAL_BOXES
const gap = 1

function compare (a, b) {
  let comparison = 0
  if (a.genreStats.numBoxes > b.genreStats.numBoxes) {
    comparison = 1
  } else {
    comparison = -1
  }
  return comparison
}

function waffle (data) {
  // 1. group by genre and aggregate by sum, e.g. {Horror: 12930238901, ....}
  // YOUR WORK HERE - approx 7 lines
  const grouped = groupBy(data, 'Major_Genre')
  let sumOfBudget = 0
  delete grouped.null

  Object.keys(grouped).forEach(key => {
    const theStats = buildStats(grouped[key], 'Production_Budget')
    grouped[key].genreStats = theStats 
    sumOfBudget += grouped[key].genreStats.sum
    grouped[key].name = key
  })

  // 2. convert to box counts, e.g. [{genre: "XXXX", boxes: 123}, ....]
  // Don't forget to sort them!
  // YOUR WORK HERE - approx 8 lines
  const totalNumBox = NUM_COLS*NUM_VERTICAL_BOXES
  const budgetAllocatedPerBox = sumOfBudget / totalNumBox

  const arrayGrouped = []
  Object.keys(grouped).forEach(key => {
    grouped[key].genreStats.numBoxes = Math.ceil(grouped[key].genreStats.sum / budgetAllocatedPerBox)
    arrayGrouped.push(grouped[key])
  })
  arrayGrouped.sort(compare)

  const genresOfDoc = []
  const finalArray = []
  const sums = []
  const formatSuffix = d3.format('.2s')
  Object.keys(arrayGrouped).forEach(key => {
    const numToAdd = arrayGrouped[key].genreStats.numBoxes
    genresOfDoc.push(arrayGrouped[key].name)
    sums.push(`${arrayGrouped[key].name  } (${  formatSuffix(arrayGrouped[key].genreStats.sum)  }$)`)
    for (let i = 0; i < numToAdd; i++) {
      finalArray.push(arrayGrouped[key].name) 
    }
  })

  // 3. Create a color scale mapping genre to color
  // YOUR WORK HERE - approx 3 lines --> #d3.schemeSet1
  const color = d3.scaleOrdinal()
    .domain(genresOfDoc)
    .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#383867', '#584c77'])

  // 4. convert boxes to layout boxes --------
  // YOUR WORK HERE - approx 3 lines

  // 5. apply layout positions (i.e. specify the x and y positions)
  // YOUR WORK HERE - approx 5 lines //ssigning x and y positions to each box.
  
  // 6. set up a single scale (should it be based off of x or y?)
  // YOUR WORK HERE - approx 3 lines

  // 7. get an svg container for
  // YOUR WORK HERE - approx 6 lines
  const svg = d3.select('#chart-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)

  // 8. now actually render the waffle rects
  // hint: our x and y and position use the same scale,
  // and we compute the boxSize ahead of time (what should the be? maybe the differene between two positions?)
  // YOUR WORK HERE - approx 13 lines

  svg.selectAll('rect')
    .data(finalArray)
    .enter()
    .append('rect')
    .attr('width', boxWidth)
    .attr('height', boxHeight)
    .attr('fill', function func1(d) {
      // console.log(d);
      return color(d)
    })
    .attr('x', function func2 (d, i) {
      // group n squares for column
      const col = Math.floor(i / boxHeight)
      return (col * boxHeight) + (col * gap)
    })
    .attr('y', function func3(d, i) {
      const row = i % boxWidth
      return ((row * boxWidth) + (row * gap)) - (boxHeight * boxWidth)
    })

  // 9. draw the legend
  // yours doesn't have to look like ours, it just has to have the same information
  // hint: our legend uses d3 but doesn't use any svg, just html elements
  // YOUR WORK HERE - approx 14 lines4

  const size = 12
  svg.selectAll('myrects')
    .data(genresOfDoc)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', function func4(d, i) { return 36 + i * (size + 5) })
    .attr('width', size)
    .attr('height', size)
    .style('fill', function func5(d) { return color(d) })

  svg.selectAll('mylabels')
    .data(sums)
    .enter()
    .append('text')
    .attr('x', 0 + size * 1.2)
    .attr('y', function func6(d, i) { return 42 + i * (size + 5) + (size / 2) }) 
    .text(function func7(d) { return (d) })
    .attr('text-anchor', 'left')
}
