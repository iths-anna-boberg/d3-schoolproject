
const svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");


async function renderLandskap(){

    const landskap = await d3.json('landskap.geojson')
    console.log(landskap)

    const center = d3.geoCentroid(landskap)


    const projection = d3
        .geoMercator()
        .center(center)  
        .scale(width*1.8)
        .translate([ width/2, height/2 ])

    
    svg.append("g")
        .selectAll("path")
        .data(landskap.features)
        .enter().append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
}

renderLandskap()
