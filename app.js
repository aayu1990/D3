// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;  

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append a group area, then set its margins
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv

  d3.csv("data.csv", function(Data) {

    var xMax = d3.max(Data, function(d) { return +d.poverty; }),
    xMin = 0,
    yMax = d3.max(Data, function(d) { return +d.healthcare; }),
    yMin = 0;

    var x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([0, svgWidth]);

    var y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([svgHeight, 0]);

 

  // the chart object, includes all margins
var chart = d3.select('body')
.append('svg:svg')
.attr('width', chartWidth + margin.right + margin.left)
.attr('height', chartHeight + margin.top + margin.bottom)
.attr('class', 'chart')

// the main object where the chart and axis will be drawn
var main = chartGroup
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
.attr('width', chartWidth)
.attr('height', chartHeight)
.attr('class', 'main')   

// draw the x axis
var xAxis = d3.axisBottom(xMax)
.scale(x);
// .tickSize(-chartHeight)
// .tickFormat(d3.format("s"));

main.append('g')
.attr('transform', 'translate(0,' + chartHeight + ')')
.attr('class', 'main axis date')
.call(xAxis);

// draw the y axis
var yAxis = d3.axisLeft(yMax)
.scale(y);
// .tickSize(-chartWidth)
// .tickFormat(d3.format("s"));


main.append('g')
.attr('transform', 'translate(0,0)')
.attr('class', 'main axis date')
.call(yAxis);


chartGroup.selectAll("scatter-dots")
.data(Data) 
.enter().append("svg:circle")  // create a new circle for each value
    .attr("cy", function (d,i) { return y(d.healthcare[i]);  } )   // translate y value to a pixel
    .attr("cx", function (d,i) { return x(d.poverty[i]); } ) // translate x value
    .attr("r", 10) // radius of circle
    .style("opacity", 0.6); // opacity of circle
    console.log("hi");


 
});