/* global d3 */

// if the data you are going to import is small, then you can import it using es6 import
// import MY_DATA from './app/data/example.json'
// (I tend to think it's best to use screaming snake case for imported json)
const domReady = require('domready');
//const d3 = require('d3!');
// this command imports the css file, if you remove it your css wont be applied!
import './main.css';
import * as d3 from 'd3';
import {scaleLinear, scaleBand} from 'd3-scale';
import {extent} from 'd3-array';
import {axisBottom, axisTop, axisLeft, axisRight} from 'd3-axis';
import {select} from 'd3-selection';
require("babel-core/register");
require("babel-polyfill");


// example of importing a util function you define
import {myExampleUtil} from './utils';

//Constants.
const xAxisLabel = 'Age';
const yAxisLabel = 'Percentage of Diet Coming from Sugar';
const titleText1 = 'New Survey Finds That People Consume Between';
const titleText2 = 'Two To Three Times The Sugar Recommended';
const text1 = 'Recommended limit';
const text2 = 'Two times the limit';
const text3 = 'Three times the limit';
const subtitleText1 = 'While it is recommended that we consume no more than 5% of our calories ';
const subtitleText2 = 'from free sugars, study found that everyone exceeds this limit.';
const datasourceText = 'Data source: National Diet and Nutrition Survey, 2008-2014';
const width = 800;
const height = (36 / 24) * width;
const margin = {top: 10, left: 10, bottom: 10, right: 10};
const plotWidth = width - margin.left - margin.right;
const plotHeight = height - margin.top - margin.bottom;

domReady (() => {
  // this is just one example of how to import data. there are lots of ways to do it!
  d3.csv('./data/data.csv')
    // this line says after getting the file, treat it like a json
    //.then(response => response.text())
    // this one sends that data your vis function down below
    .then(data => myVis(data))
    .catch(e => {
      console.log(e);
    });
  // if you need to import several datasets you can do something like:
  // Promise.all([
  //   fetch('./data/example-1.json').then(x => x.json()),
  //   fetch('./data/example-2.json').then(x => x.json()),
  // ]).then((results) => myVis(results));
});

function myVis(data) {
  
  var theNum = 0;

  data.forEach(row => {
    row['(2008/09 - 2009/10)'] *= 1;
    row['(2010/11 - 2011/12)'] *= 1;
    row['(2012/13 - 2013/14)'] *= 1;
    row['(2014/15-2015/16)'] *= 1;

    row.avg = (row['(2008/09 - 2009/10)'] + row['(2010/11 - 2011/12)']+ row['(2012/13 - 2013/14)'] + row['(2014/15-2015/16)'] ) /4 ;
    
    row.num = theNum;
    theNum++;

});
  
  //Make main svg 
  var svg = d3.select('body')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

  //Make title. 
  var title1 = svg.append('g')
        .append('text')
        .attr('fill', 'black')
        .attr('y', 20)
        .attr('x', 40)
        .attr('font-size','18px')
        .style('font-weight', 'bold')
        .text(titleText1);

  var title2 = svg.append('g')
        .append('text')
        .attr('fill', 'black')
        .attr('y', 40)
        .attr('x', 40)
        .attr('font-size','18px')
        .style('font-weight', 'bold')
        .text(titleText2);

  var subtitle1 = svg.append('g')
        .append('text')
        .attr('fill', 'black')
        .attr('y', 62)
        .attr('x', 40)
        .attr('font-size','13px')
        .text(subtitleText1);

  var subtitle2 = svg.append('g')
        .append('text')
        .attr('fill', 'black')
        .attr('y', 75)
        .attr('x', 40)
        .attr('font-size','13px')
        .text(subtitleText2);

  var datasource =  svg.append('g')
        .append('text')
        .attr('fill', 'black')
        .attr('y', 90)
        .attr('x', 40)
        .attr('font-size','10px')
        .text(datasourceText);

  //Rename our x values
  var xValues = ["0-3", "4-10", "11-18", "19-64", "65-74", "75+"];

  //Scales
  var yScale = d3.scaleLinear()
    .domain([ 0, d3.max(data, d => d.avg)])
    .range([ height/3, 0]);

  var xScaleToView = d3.scaleBand()
      .domain(xValues)
      .range([0, width/2.5]);
  var xScaleForData = d3.scaleBand()
      .domain([0,1,2,3,4,5])
      .range([0, width/2.5])
      .padding(0.2);

  //Axis
  var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSizeInner(4)
      .tickSizeOuter(5)
      .tickPadding(3);
        
    var yAxisG = svg.append('g') 
       .attr('transform', 'translate(90, 130)')
       .call(yAxis)

    yAxisG.append('text')
       .attr('class', 'axis-label')
       .attr('y', -38)
       .attr('x', -80)
       .attr('fill', 'black')
       .attr('transform', 'rotate(-90)')
       .attr('text-anchor', 'middle')
       .text(yAxisLabel);

  var xAxis = d3.axisBottom()
      .tickSizeInner(4)
      .tickSizeOuter(5)
      .tickPadding(3)
      .scale(xScaleToView);

    var xAxisG = svg.append('g') 
       .attr('transform', 'translate(91, 531)')
       .call(xAxis);

    xAxisG.append('text')
       .attr('class', 'axis-label')
       .attr('y', 35)
       .attr('x', 300)
       .attr('fill', 'black')
       .attr('text-anchor', 'middle')
       .text(xAxisLabel);

  //Rects
  svg.selectAll("rect")
     .data(data)
     .enter()
     .append('rect')
     .attr('y', d => {return 130 + yScale( d.avg);}) //
     .attr('x', d => xScaleForData(d.num) + 92)
     .attr('width', xScaleForData.bandwidth())
     .attr('height', d => {
        return  yScale.range()[0] - yScale( d.avg);
    });

  // Lines
  var line1 = svg.append("line")          // attach a line
    .style("stroke", "red")  // colour the line
    .attr("x1", 90)     // x position of the first end of the line
    .attr("y1", yScale(0))      // y position of the first end of the line
    .attr("x2", width/2)     // x position of the second end of the line
    .attr("y2", yScale(0));
  
  var text1print =  svg.append('text')
        .attr('fill', 'black')
        .attr('y', yScale(0) +3)
        .attr('x', width/2 +4 )
        .attr('font-size','10px')
        .text(text1);

  var line2 = svg.append("line")          // attach a line
    .style("stroke", "red")  // colour the line
    .attr("x1", 90)     // x position of the first end of the line
    .attr("y1", yScale(5))      // y position of the first end of the line
    .attr("x2", width/2)     // x position of the second end of the line
    .attr("y2", yScale(5));

  var text2print =  svg.append('text')
        .attr('fill', 'black')
        .attr('y', yScale(5) +3)
        .attr('x', width/2 +4 )
        .attr('font-size','10px')
        .text(text2);

    var line3 = svg.append("line")          // attach a line
    .style("stroke", "red")  // colour the line
    .attr("x1", 90)     // x position of the first end of the line
    .attr("y1", yScale(10))      // y position of the first end of the line
    .attr("x2", width/2)  
    .attr("y2", yScale(10));
 
  var text3print =  svg.append('text')
        .attr('fill', 'black')
        .attr('y', yScale(10) +3)
        .attr('x', width/2 +4 )
        .attr('font-size','10px')
        .text(text3);
}