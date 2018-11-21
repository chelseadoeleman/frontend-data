const fetchedData = {
    nestedData: undefined,
}
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


const svg = d3.select(".data").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


d3.json("/../data/obaMovieData.json").then(function(data) {
    fetchedData.nestedData = d3.nest()
        .key(d => d.title)
        .key(d => d.producer)
        .entries(data)
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

function clickBubble (d) {
    const title = d.title
    // const margin = {
    //     left: 20,
    //     top: 20,
    // }
    let width = 960
    let height = 500
    let root

    var force = d3.forceSimulation()
        .force("link", d3.forceLink().distance(80))
        .force("charge", d3.forceManyBody().strength(-120))
        .force("center", d3.forceCenter([width, height]))
        .on("tick", tick)
        // .gravity(.05)

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)

    var link = svg.selectAll(".link"),
        node = svg.selectAll(".node")

    const data = fetchedData.nestedData
    const treemap = d3.tree().size([height, width])

      root = data
      update()

    function update() {
        const treeData = treemap(root)
        let nodes = treeData.descendants()
        let links = treeData.descendants().slice(1)

    //   Restart the force layout.
      force
          .nodes(nodes)
          .links(links)
          .start()

    // force.restart()

      // Update links.
      link = link.data(links, function(d) { return d.target.id })

      link.exit().remove()

      link.enter().insert("line", ".node")
          .attr("class", "link")

      // Update nodes.
      node = node.data(nodes, function(d) { return d.id })

      node.exit().remove()

      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .on("click", click)
          .call(force.drag)

      nodeEnter.append("circle")
          .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5 })

      nodeEnter.append("text")
          .attr("dy", ".35em")
          .text(function(d) { return d.name })

      node.select("circle")
          .style("fill", color)
    }

    function tick() {
      link.attr("x1", function(d) { return d.source.x })
          .attr("y1", function(d) { return d.source.y })
          .attr("x2", function(d) { return d.target.x })
          .attr("y2", function(d) { return d.target.y })

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")" })
    }

    function color(d) {
        console.log(d._children)
      return d._children ? "#3182bd" // collapsed package
          : d.children ? "#c6dbef" // expanded package
          : "#fd8d3c" // leaf node
    }

    // Toggle children on click.
    function click(d) {
      if (d3.event.defaultPrevented) return // ignore drag
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      update()
    }

    // Returns a list of all nodes under the root.
    function flatten(root) {
      var nodes = [], i = 0    

      function recurse(node) {
        if (node.children) node.children.forEach(recurse)
        if (!node.id) node.id = ++i
        nodes.push(node)
      } 

      recurse(root)
      return nodes
    }
    
}



    svg.selectAll("dot")
        .data(data)
    .enter().append("circle")
        .style("opacity", 0.1)
        .style("fill", "#ffffff")
        .on("click", clickBubble)
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


