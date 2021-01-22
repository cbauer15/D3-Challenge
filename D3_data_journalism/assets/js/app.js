// @TODO: YOUR CODE HERE!
/* Step 1
 * Define the "workspace area"
 */
// =================================

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
    .select("body")
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

    var xAgeScale = d3.scaleLinear()
        .domain(d3.extent(CensusData, d => d.age))
        .range([0, width]);

    var ySmokesScale = d3.scaleLinear()
        .domain([0, d3.max(CensusData, d => d.smokes)])
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


    var ScatterGenerator = d3.scatter() 
        .x(d => xAgeTimeScale(d.age))
        .y(d => ySmokesLinearScale(d.smokes));

    chartGroup.append("scatter")
        .data([CensusData])
        .attr("d", ScatterGenerator);
});

