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

  // // Import Data
  d3.csv("data.csv")
    .then(function(data) {
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================
    var x = d3.scaleLinear()
      .domain([8, d3.max(data, d => d.poverty)])
      .range([0, svgWidth]);

    var y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
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
var xAxis = d3.axisBottom(x);

// .tickSize(-chartHeight)
// .tickFormat(d3.format("s"));

main.append('g')
.attr('transform', 'translate(0,' + chartHeight + ')')
.attr('class', 'main axis date')
.call(xAxis);

// draw the y axis
var yAxis = d3.axisLeft(y);



main.append('g')
.attr('transform', 'translate(0,0)')
.attr('class', 'main axis date')
.call(yAxis);


chartGroup.selectAll("circle")
    .data(data) 
    .enter()
    .append("circle")  // create a new circle for each value
    .attr("cy", function (d) { return y(d.healthcare);  } )   // translate y value to a pixel
    .attr("cx", function (d) { return x(d.poverty); } ) // translate x value
    .attr("r", 10) // radius of circle
    .attr("fill", "lightblue")
    .attr("")
    .style("opacity", 0.6); // opacity of circle
  });


 
