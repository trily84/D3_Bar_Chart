// fetch data from json file
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
	.then(response => response.json())
	.then(response => {
        const data = response.data
        createBar(data)
	})

function createBar(data) { 

    var w = 500
    var h = 400
    var padding = 50
    var barWidth = (w - padding*2) / data.length

    // var tooltip = d3.select("div").append("div")

    // create svg element to contain everything relate to bar chart
    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)

    var valueX = data.map(x => parseInt(x[0].split("-")[0]))
    maxX = Math.max(...valueX)
    minX = Math.min(...valueX)

    const maxY = d3.max(data, (d) => d[1])
    
    const xScale = d3.scaleLinear()
    .domain([minX, maxX])
    .range([0, w - padding*2])

    const yScale = d3.scaleLinear()
    .domain([0, maxY])
    .range([h, padding*2])

    //create vertical bars
    svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => i * barWidth + padding)
    .attr("y", d => yScale(d[1]) - padding)
    .attr("width", barWidth)
    .attr("height", d => h - yScale(d[1]))
    .on("mouseover", function (event, d) {
        // console.log(d); 
        // console.log(d3.pointer(event))
        // var x = d3.pointer(event)[0]
        // var y = d3.pointer(event)[1]
        // tooltip.style.left = x + 10 + "px"
        // tooltip.style.top = y + "px"
        tooltip.innerHTML = d[1] + " billions" + " (" +  d[0].split("-")[0] + ")"
    })

    // show statistic when hovering on bar chart
    .append("title")
    .text(d => d[1] + "B" + " (" +  d[0].split("-")[0] + ")")

    // create x axis
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(50, 350)")
    .call(xAxis);

    // create y axis
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(50, -50)")
    .call(yAxis);

}