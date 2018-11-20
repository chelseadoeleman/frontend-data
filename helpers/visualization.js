
const margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

const parseTime = d3.timeParse("%Y")

const x = d3.scaleTime()
    .range([0, width])
const y = d3.scaleLinear()
    .range([height, 0])

const fillColor = d3.scaleOrdinal()
    .range(["rgba(219, 41, 79, .4)", "rgba(237, 109, 152, .4)", "rgba(134, 49, 255, .4)", "rgba(0, 19, 255, .4)", "rgba(0, 183, 255, .4)"])

const strokeColor = d3.scaleOrdinal()
    .range(["rgb(219, 41, 79)", "rgb(237, 109, 152)", "rgb(134, 49, 255)", "rgb(0, 19, 255)", "rgba(0, 183, 255, .4)"])

// const force = d3.layout.force()
//     .linkDistance(80)
//     .charge(-120)
//     .gravity(.05)
//     .size([width, height])
//     .on("tick", tick)

const svg = d3.select(".data").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// const link = svg.selectAll(".link")
// const node = svg.selectAll(".node")
// let root

// const update = () => {
//     let nodes = flatten(root)
//     let links = d3.layout.tree().links(nodes)

//     force
//         .nodes
//         .links(links)
//         .start
    
//         // Update links.
//     ink = link.data(links, function(d) { return d.target.id; });

//     link.exit().remove();

//     link.enter().insert("line", ".node")
//         .attr("class", "link");

//     // Update nodes.
//     node = node.data(nodes, function(d) { return d.key; });

//     node.exit().remove();

//     var nodeEnter = node.enter().append("g")
//         .attr("class", "node")x
//         .on("click", click)
//         .call(force.drag);

//     nodeEnter.append("circle")
//         .attr("r", 8);

//     nodeEnter.append("text")
//         .attr("dy", ".35em")
//         .text(function(d) { return d.values.title; });

//     node.select("circle")
//         .style("fill", color);
// }

// d3.json("/../data/obaMovieData.json").then(function(data) {
//     const nestedData = d3.nest()
//         .key(d => d.producer)
//         .key(d => d.title)
//         .entries(data)
//     console.log(nestedData)
//     root = nestedData
//     update() 
    
//     // Assigns parent, children, height, depth
//     let nodes = d3.hierarchy(treemap, (d => d.values))
//     nodes = treemap(nodes)    

//     data.forEach(function(d) {
//         d.publicationYear = parseTime(d.publicationYear)
//         d.rating= +d.rating
//     })

//     x.domain(d3.extent(data, function(d) { return d.publicationYear }))
//     y.domain([0,10])

//     const link = svg.selectAll(".link")
//         .data( nodes.descendants().slice(1))
//         .enter().append("path")
//         .attr("class", "link")
//         .attr("d", function(d) {
//            return "M" + d.y + "," + d.x
//            + "C" + (d.y + d.parent.y) / 2 + "," + d.x
//            + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
//            + " " + d.parent.y + "," + d.parent.x
//         })

//     const node = svg.selectAll(".node")
//         .data(nodes.descendants())
//         .enter().append("g")
//         .attr("class", function(d) { 
//           return "node" + 
//           (d.values ? " node--internal" : " node--leaf") })
//         .attr("transform", function(d) { 
//           return "translate(" + d.y + "," + d.x + ")" })
//     // adds the circle to the node
//     node.append("circle")
//         .attr("r", 10)

//     // adds the text to the node
//     node.append("text")
//         .attr("dy", ".35em")
//         .attr("x", function(d) { return d.children ? -13 : 13 })
//         .style("text-anchor", function(d) { 
//             return d.children ? "end" : "start" })
//         .text(function(d) { return d.data.name })



    svg.selectAll("dot")
        .data(data)
    .enter().append("circle")
        .style("opacity", 0.1)
        .style("fill", "#ffffff")
        .transition()
        .delay(d => (Math.random()*500))
        .duration(1500)
        .style("opacity", 1)
        .attr("r", 8)
        .attr("cx", function(d) { return x(d.publicationYear) })
        .attr("cy", function(d) { return y(d.rating) })
        .style("fill", function(d) { return fillColor(d.genre) })
        .style("stroke", function(d) { return strokeColor(d.genre) })

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("font-family", "Raleway")
        .attr("font-size", "12px")

    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("font-family", "Raleway")
        .attr("font-size", "12px")
        .call(g => g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("dy", "-5em")
            .attr("fill", "#ffffff")
            .style("text-anchor", "end")
            .text("Rating"))



    // Define legend
    const legend = svg.selectAll(".legend")
        .data(fillColor.domain())
    .enter().append("g")
        // .container(d3.select("legend"))
        .attr("class", "legend")
        .attr("transform", (d, i) => { 
            return "translate(0," + i * 20 + ")" 
        })

    legend.append("circle")
        .attr("r", 6)
        .attr("cx", width + 5)
        .style("fill", (d => { return fillColor(d) }))
        .style("stroke", (d => { return strokeColor(d) }))
    legend.on("click", function(type) {
        d3.selectAll(".legend")
            .style("opacity", 0.2)
        d3.select(this)
            .style("opacity", 1)
        d3.selectAll("circle")
            .transition()
            .duration(500)
            .style("opacity", 0.0)
            .filter(d => d.genre === type)
            .style("opacity", 1)
            .style("stroke", (type === strokeColor(type.genre)))
    })
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 6)
        .style("text-anchor", "end")
        .attr("fill", "rgb(255, 255, 255)")
        .attr("font-family", "Raleway")
        .attr("font-weight", 300)
        .text(d => {return d})

})


