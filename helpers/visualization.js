const fetchedData = {
    nestedData: undefined,
}
const margin = {top: 20, right: 250, bottom: 50, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom
    

const parseTime = d3.timeParse("%Y")

// Move x axis to make dots in 2008 more visible
const x = d3.scaleTime()
    .range([15, width])
const y = d3.scaleLinear()
    .range([height, 0])

const div = d3.select("body").append("div")	
    .attr("class", "tooltip")		
    .style("opacity", 0)

// function to assign the right color to specific genre
const fillColor = d3.scaleOrdinal()
    .range(["rgba(219, 41, 79, .4)", "rgba(237, 109, 152, .4)", "rgba(134, 49, 255, .4)", "rgba(0, 19, 255, .4)", "rgba(0, 183, 255, .4)"])

const strokeColor = d3.scaleOrdinal()
    .range(["rgb(219, 41, 79)", "rgb(237, 109, 152)", "rgb(134, 49, 255)", "rgb(0, 19, 255)", "rgba(0, 183, 255, .4)"])

const svg = d3.select(".data").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


d3.json("https://raw.githubusercontent.com/chelseadoeleman/frontend-data/master/data/obaMovieData.json").then(function(data) {
    // Shout out naar Jessie en May for helping me with nesting
    fetchedData.nestedData = d3.nest()
        .key(d => d.title)
        .key(d => d.producer)
        .entries(data)
        // define structure for hierarchy. Hierarchy function must have name or children
        .map(d => ({
            name: d.key,
            children: d.values.map(dv => {
                return {
                    name: dv.key,
                    children: data
                        .filter(dd => dv.key === dd.producer)
                        .map(dd => ({
                            name: dd.title
                        }))
                }
            }),
        }))

    data.forEach(function(d) {
        d.publicationYear = parseTime(d.publicationYear)
        d.rating= +d.rating
    })

    x.domain(d3.extent(data, function(d) { return d.publicationYear }))
    y.domain([0,10])

// Shout out naar Maikel van Veen
// bubble function on click when clicking on dot
// launches second graph
function clickBubble (d) {
    // remove complete graph when clicking on another dot
    const removeRoot = document.querySelector('.tree')
    removeRoot.innerHTML = ''
    const selectedStrokeColor = d3.select(this).style('stroke')
    const selectedFillColor = d3.select(this).style('fill')

    const title = d.title
    const margin = {
        left: 500,
        top: 20,
    }


    // code from https://bl.ocks.org/d3noob/80c100e35817395e88918627eeeac717 modified to own preferences.
    // create new svg in div .tree so graphs can be shown seperately
    const networkDiagram = d3.select('.tree').append('svg')
            .attr('width', width + margin.left)
            .attr("height", height + margin.top)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    networkDiagram.append("g")
        .attr("transform", "translate("
              + margin.left + "," + margin.top + ")")
        
    let i = 0
    let duration = 750
    let root
    
    // use the tree function to create the tree structure in d3
    const treemap = d3.tree().size([height, width])
    
    const data = fetchedData.nestedData
    const td = Object.assign({}, data 
        .filter(d => d.name === title)[0])

    // use hierarchy function to use descendants and to use the tree function
    root = d3.hierarchy(td)
    root.x0 = height / 2
    root.y0 = 0
    
    // Collapse data
    collapse(root.data)
    
    // update the data
    update(root)
    
    // collapse function for all the dots that have children 
    function collapse(d) {
        if(d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    }
    
    function update(source) {
        // Get x and y position for the dots
        const treeData = treemap(root)
        
        // calculate the new data for in the tree
        const nodes = treeData.descendants(),
            links = treeData.descendants().slice(1)
        nodes.forEach(function(d){ d.y = d.depth * 180})
        
        // Update the nodes in networkDiagram
        const node = networkDiagram.selectAll('g.node')
            .data(nodes, function(d) {return d.id || (d.id = ++i) })
        
        // Start new node at the previous parent
        const nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")"
            })
            .on('click', click)
        
        // Make dots!
        nodeEnter.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .transition()
            .duration(500)
            .delay(100)
            .ease(d3.easeCircle)
            .style("fill", function(d) {
                return d._children ? selectedFillColor : selectedFillColor
            })
            .style("stroke", function(d) {
                return d._children ? selectedStrokeColor : selectedStrokeColor
            })
        
        // Add labels for the nodes more styling done in css
        nodeEnter.append('text')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? 13 : -13
            })
            .attr("y", function(d) {
                return d.children || d._children ? 30 : -30
            })
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start"
            })
            .text(function(d) { return d.data.name })
            .style("fill", "#fff")
        
        // merge dots on enter to update    
        const nodeUpdate = nodeEnter.merge(node)
        
        // placement for children dots, not linking yet
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) { 
                return "translate(" + d.y + "," + d.x + ")"
            })
        
        // on opening/update style for the dots
        nodeUpdate.select('circle.node')
            .attr('r', 12)
            .style("fill", function(d) {
                return d._children ? selectedFillColor : selectedFillColor
            })
            .style("stroke", function(d) {
                return d._children ? selectedStrokeColor : selectedStrokeColor
            })
            .attr('cursor', 'pointer')
        
        
        // when exiting children remove children dots
        const nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) {
                return "translate(" + source.y + "," + source.x + ")"
            })
            .remove()
        
        // Make dots smaller on exit
        nodeExit.select('circle')
            .attr('r', 1e-6)
        
        // Set text of a dot to 0, to make it invisible
        nodeExit.select('text')
            .style('fill-opacity', 1e-6)
        
        // Create links to connect the dots through one another. 
        // As every child has a depth it also has and id, where it can be linked to one another.
        const link = networkDiagram.selectAll('path.link')
            .data(links, function(d) { return d.id })
        
        // Attach link (line) to the parent dots postition and start path from there.
        const linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr("stroke", selectedStrokeColor)
            .attr('d', function(d){
                const o = {x: source.x0, y: source.y0}
                return diagonal(o, o)
            })
        
        // Update link when exiting
        const linkUpdate = linkEnter.merge(link)
        // BUG HERE. No idea how to fix it yet.
        // console.log(linkUpdate)
        
        // Tuck nodes back into parent dot when exiting children
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function(d){ return diagonal(d, d.parent) })
        
        // Remove the links from path into parent
        const linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d) {
                const o = {x: source.x, y: source.y}
                return diagonal(o, o)
            })
            .remove()
        
        // Store the old positions for transition.
        nodes.forEach(function(d){
            d.x0 = d.x
            d.y0 = d.y
        })
    
        // Create shape of the path that links to children
        // Resource can be found here https://www.dashingd3js.com/svg-paths-and-d3js
        function diagonal(s, d) {
            path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`
        
            return path
        }
    
        // Get children values when clicking on a dot
        function click(d) {
            if (d.children) {
                d._children = d.children
                d.children = null
            } else {
                d.children = d._children
                d._children = null
            }
            update(d)
        }
    }
}

// code example from https://bl.ocks.org/d3noob/6f082f0e3b820b6bf68b78f2f7786084
// Modified to own need, like adding click and mouse events, transitions, etc.
    svg.selectAll("dot")
        .data(data)
    .enter().append("circle")
        .style("opacity", 0.1)
        .style("fill", "#ffffff")
        // Get networkDiagram of that specific dot
        .on("click", clickBubble)
        // Add hover an tooltip
        .on("mouseover", function(d) {
            d3.select(this)
                .attr("r", 12)
                .style("stroke", strokeColor(d.genre))
                .style("fill", fillColor(d.genre))
            div.transition()		
                .duration(200)		
                .style("opacity", .8)
            div.html(d.title)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px")
        })
        // exit hover and tooltip
        .on("mouseout", function(d) {
            d3.select(this)
                .style("fill", fillColor(d.genre))
                .attr("r", 8)
                .style("stroke", strokeColor(d.genre))
            div.transition()
                .duration(200)
                .style("opacity", 0)                
        })
        // Transition when loading the page of the dots creating the scatter plot
        .transition()
        .delay(d => (Math.random()*500))
        .duration(1500)
        .ease(d3.easeCircleInOut)
        .style("opacity", 1)
        .attr("r", 8)
        .attr("cx", function(d) { return x(d.publicationYear) })
        .attr("cy", function(d) { return y(d.rating) })
        .style("fill", function(d) { return fillColor(d.genre) })
        .style("stroke", function(d) { return strokeColor(d.genre) })
        
    
    // Look of x- and y-axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("font-family", "Raleway")
        .attr("font-size", "12px")
        // Add text to x-axis
        .call(g => g.append("text")
            .attr("transform", "rotate(0)")
            .attr("x", 700)
            .attr("dy", "3.5em")
            .attr("fill", "#ffffff")
            .style("text-anchor", "middle")
            .text("Jaren"))

    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("font-family", "Raleway")
        .attr("font-size", "12px")
        // Add text to y-axis
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
        .attr("class", "legend")
        .attr("transform", (d, i) => { 
            return "translate(170," + i * 20 + ")" 
        })
    
    // Create colored circles for legend
    legend.append("circle")
        .attr("r", 6)
        .attr("cx", width + 5)
        .style("fill", (d => { return fillColor(d) }))
        .style("stroke", (d => { return strokeColor(d) }))
        .attr("cursor", "pointer")
    // When filtering a specific genre
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
    // Add text to circle
    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 6)
        .style("text-anchor", "end")
        .attr("fill", "rgb(255, 255, 255)")
        .attr("font-family", "Raleway")
        .attr("font-weight", 300)
        .attr("cursor", "pointer")
        .text(d => {return d})

})


