// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



d3.csv("assets/data/data.csv").then(function (CensusData) {
    console.log(CensusData);

    CensusData.forEach(function (data) {
        data.age = +data.age;
        data.income = +data.income;
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.obesity = +data.obesity;
    });

    var domainX = d3.extent(CensusData, d => d.age) 
        domainX[0] = domainX[0] - 2
        domainX[1] = domainX[1] + 1


    var xAgeScale = d3.scaleLinear()
        .domain(domainX)
        .range([0, width]);

    var ySmokesScale = d3.scaleLinear()
        .domain([9, d3.max(CensusData, d => d.smokes)+1])
        .range([height, 0]);

    var AgeAxis = d3.axisBottom(xAgeScale);
    var SmokesAxis = d3.axisLeft(ySmokesScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("stroke", "black")
        .call(AgeAxis);

    chartGroup.append("g")
        .attr("stroke", "black")
        .call(SmokesAxis);

    // Creating Dots
    var ScatterDots = chartGroup.append("g")
        .selectAll("dot")
        .data(CensusData)
        .enter()
        .append("circle")
        .classed("stateCircle", true)
        .attr("cx", function (d) { return xAgeScale(d.age); })
        .attr("cy", function (d) { return ySmokesScale(d.smokes); })
        .attr("r", 10)

    // Label in Dot
    chartGroup.selectAll("dot")
        .data(CensusData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .text(d => d.abbr)
        .attr("x", d => xAgeScale(d.age ))
        .attr("y", d => ySmokesScale(d.smokes - .15))

        // x-axis title
        chartGroup.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("stroke", "black")
        .text("Age (Median)");
    
        // y-axis title
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0-height/2)
            .attr("y", 0-margin.left)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("stroke", "black")
            .text("Smokes (%)"); 
    
});

