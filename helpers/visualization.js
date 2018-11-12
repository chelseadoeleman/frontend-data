// Using existing bar chart bron: https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad
// Adding tooltips bron: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369

const margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom

// Define x-as from 0 to acutal width needed
const x0 = d3.scaleBand()
    .rangeRound([0, width])
    .padding(.3)

// Output for the mapped data
const x1 = d3.scaleBand()

// Define range for y-as for continuous data 
// Prevent proportional differences
const y = d3.scaleLinear()
    .range([height, 0])

// No tick (dashes) on the x-as, scale is defined by x0
const xAxis = d3.axisBottom(x0)
    .scale(x0)
    .tickSize(0)

// Postition y-as, scale is defined by y
const yAxis = d3.axisLeft(y)
    .scale(y)

// create div for tooltip (extra)
const div = d3.select("body").append("div")	
    // Create class for tooltip
    .attr("class", "tooltip")
    // Not appear in bottom when loading the page				
    .style("opacity", 0)

// Map from input domain with an output range
// Give color to values (gender)
const color = d3.scaleOrdinal()
    .range(["#3c67d3", "#a6b4dd"])

// Create svg in div with class="data" in html
const svg = d3.select(".data").append("svg")
    // use specified height and width 
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

d3.json("./data.json").then(function(data) {

    const categoriesNames = data.map(d => (d.category))
    const rateNames = data[0].values.map(d => (d.gender))

    x0.domain(categoriesNames)
    // Start from 0 till bandwith (end of bar rect)
    x1.domain(rateNames)
        .range([0, x0.bandwidth()])
    // End of y is the value of the highest bar chart
    y.domain([0, d3.max(data, (category) => { return d3.max(category.values, (d) => { return d.value }) })])

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

    svg.append("g")
        .attr("class", "y axis")
        .style("opacity", 1)
        .call(yAxis)
        // add text to group on y-as
        .call(g => g.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", "1em")
           .attr("fill", "#000000")
           .style("text-anchor", "end")
           .style("font-weight","bold")
           .text("Aantal"))

    // animation on y-as
    svg.select(".y")
        .transition()
        .duration(500)
        .delay(900)
        .style("opacity", 1)

    
    const slice = svg.selectAll(".slice")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        // distribute categories over the x-as
        .attr("transform",function(d) { return "translate(" + x0(d.category) + ",0)" })

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
        .enter().append("rect")
            // the width of a rect is bandwidth
            .attr("width", x1.bandwidth())
            .attr("x", function(d) { return x1(d.gender) })
            .style("fill", function(d) { return color(d.gender) })
            // Start animation from y(0)
            .attr("y", function(d) { return y(0) })
            .on("mouseover", function(d) {
                // On hove make rect darker
                d3.select(this)
                    .style("fill",
                d3.rgb(color(d.gender))
                    .darker(1.4))
                // Transition of tooltip
                div.transition()		
                    .duration(200)		
                    .style("opacity", .8)
                // Change names tooltip to dutch names
                div.html((d.gender === "men" ? "Mannen" : "Vrouwen") + ": " + d.value)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px")
            })
            // Another event
            .on("mouseout", function(d) {
                d3.select(this)
                    .style("fill", 
                    color(d.gender))
            })

    slice.selectAll("rect")
        .transition()
        // Get a smoother transition with math.random to differentiate delay of every rect
        .delay(d => (Math.random()*500))
        .duration(1000)
        .attr("y", (d) => { 
            return y(d.value) 
        })
        .attr("height",(d) => { 
            return height - y(d.value) 
        })

    const legend = svg.selectAll(".legend")
        .data(data[0].values.map(d => (d.gender)).reverse())
    .enter().append("g")
        .attr("class", "legend")
        // Postion of legend
        .attr("transform", (d, i) => { 
            return "translate(0," + i * 20 + ")" 
        })
    
    // Define shape of rect for legend
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        // Use color function to connect the right color of gender
        .style("fill", (d => { return color(d) }))
    
    // Add text to legend
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(d => {return d === "men" ? "Mannen" : "Vrouwen" })
    
    // Animation legend
    legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i }).style("opacity","1")

})