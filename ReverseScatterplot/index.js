/* global d3 */

// Constants
const height = 500;
const width = 600;

const xAxisLabel = 'Petal Length';
const yAxisLabel = 'Petal Width';
const titleText = 'IRIS Dataset: Petal Length vs Petal Width';
const subtitleText = 'Here is a little graph of petal length versus petal width. We can learn a lot from these plants...';
const datasourceText = 'Data source: IRIS dataset';
const firstRecttext = 'setosa';
const secRecttext = 'versicolor';
const thiRecttext = 'virginica';
const keyText = 'Legend';


// Get data.
d3.json('./iris.json').then((data) => {
  // Make main svg
  const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Make title.
  svg.append('g')
    .append('text')
    .attr('fill', 'black')
    .attr('y', 20)
    .attr('x', 40)
    .attr('font-size', '22px')
    .style('font-weight', 'bold')
    .text(titleText);

  // Make sub--title.
  svg.append('g')
    .append('text')
    .attr('fill', 'black')
    .attr('y', 40)
    .attr('x', 40)
    .attr('font-size', '13px')
    .text(subtitleText);

  svg.append('g')
    .append('text')
    .attr('fill', 'black')
    .attr('y', 55)
    .attr('x', 40)
    .attr('font-size', '10px')
    .text(datasourceText);

  // Make legend
  const legend = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(510,${120})`);

  legend.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .style('fill', d3.color('#88E6B4'));

  legend.append('text')
    .attr('fill', 'black')
    .attr('text-decoration', 'underline')
    .attr('y', -10)
    .attr('x', 9)
    .attr('font-size', '15px')
    .text(keyText);

  legend.append('text')
    .attr('fill', 'black')
    .attr('y', 8)
    .attr('x', 13)
    .attr('font-size', '13px')
    .text(firstRecttext);
  legend.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('transform', `translate(0,${20})`)
    .style('fill', d3.color('#FF7682'));

  legend.append('text')
    .attr('fill', 'black')
    .attr('y', 28)
    .attr('x', 13)
    .attr('font-size', '13px')
    .text(secRecttext);

  legend.append('rect')
    .attr('width', 10)
    .attr('height', 10)
    .attr('transform', `translate(0,${40})`)
    .style('fill', d3.color('#FFB19E'));

  legend.append('text')
    .attr('fill', 'black')
    .attr('y', 48)
    .attr('x', 13)
    .attr('font-size', '13px')
    .text(thiRecttext);

  // Make scales.
  const xScale = d3.scaleLog().domain(d3.extent(data, (d) => d.petalLength))
    .range([width - 200, 0]);

  const yScale = d3.scaleLog()
    .domain(d3.extent(data, (d) => d.petalWidth))
    .range([0, height / 2]);
  // .base(10);

  // Make axis.
  const xAxis = d3.axisTop()
    .scale(xScale)
    .tickFormat(d3.format('.2s'));

  const xAxisG = svg.append('g')
    .attr('transform', 'translate(50, 100)')
    .call(xAxis);

  xAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', -25)
    .attr('x', 200)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .text(xAxisLabel);

  const yAxis = d3.axisRight()
    .scale(yScale)
    .tickFormat(d3.format('.2'));

  const yAxisG = svg.append('g')
    .attr('transform', 'translate(450, 100)')
    .call(yAxis);

  yAxisG.append('text')
    .attr('class', 'axis-label')
    .attr('y', 40)
    .attr('x', -140)
    .attr('fill', 'black')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text(yAxisLabel);

  svg.append('g')
    .selectAll('.dot')
    .data(data)
    .join('circle')
    .attr('class', (d) => `dot ${d.species}`)
    .attr('cx', (d) => 450 - xScale(d.petalLength))
    .attr('cy', (d) => 100 + yScale(d.petalWidth))
    .attr('r', 4);
}, (error, rows) => {
  console.log(rows);
});
