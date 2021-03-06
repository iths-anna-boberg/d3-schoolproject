let population = [

    {"id":"Skåne", "info":[{"totalbefolkning":1375278,"män":686808,"kvinnor":688470}]},
    {"id":"Blekinge", "info":[{"totalbefolkning":159606,"män":81424,"kvinnor":78182}]},
    {"id":"Öland", "info":[{"totalbefolkning":26088,"män":13001,"kvinnor":13087}]},
    {"id":"Halland", "info":[{"totalbefolkning":340856,"män":170913,"kvinnor":169943}]},
    {"id":"Småland", "info":[{"totalbefolkning":774177,"män":392920,"kvinnor":381257}]},
    {"id":"Gotland", "info":[{"totalbefolkning":59686,"män":29816,"kvinnor":29870}]},
    {"id":"Västergötland", "info":[{"totalbefolkning":1374838,"män":691611,"kvinnor":683227}]},
    {"id":"Östergötland", "info":[{"totalbefolkning":463512,"män":234885,"kvinnor":228627}]},
    {"id":"Bohuslän", "info":[{"totalbefolkning":307827,"män":155369,"kvinnor":152458}]},
    {"id":"Dalsland", "info":[{"totalbefolkning":50401,"män":25997,"kvinnor":24404}]},
    {"id":"Närke", "info":[{"totalbefolkning":218780,"män":109345,"kvinnor":109435}]},
    {"id":"Södermanland", "info":[{"totalbefolkning":1377248,"män":689201,"kvinnor":688047}]},
    {"id":"Värmland", "info":[{"totalbefolkning":321333,"män":161796,"kvinnor":159537}]},
    {"id":"Västmanland", "info":[{"totalbefolkning":316912,"män":159919,"kvinnor":156993}]},
    {"id":"Uppland", "info":[{"totalbefolkning":1686471,"män":844560,"kvinnor":841911}]},
    {"id":"Dalarna", "info":[{"totalbefolkning":284524,"män":143873,"kvinnor":140651}]},
    {"id":"Gästrikland", "info":[{"totalbefolkning":156667,"män":78577,"kvinnor":78090}]},
    {"id":"Hälsingland", "info":[{"totalbefolkning":131173,"män":66271,"kvinnor":64902}]},
    {"id":"Härjedalen", "info":[{"totalbefolkning":9626,"män":5037,"kvinnor":4589}]},
    {"id":"Medelpad", "info":[{"totalbefolkning":126746,"män":63918,"kvinnor":62828}]},
    {"id":"Ångermanland", "info":[{"totalbefolkning":130923,"män":66442,"kvinnor":64481}]},
    {"id":"Jämtland", "info":[{"totalbefolkning":117688,"män":59414,"kvinnor":58274}]},
    {"id":"Västerbotten", "info":[{"totalbefolkning":226518,"män":114440,"kvinnor":112078}]},
    {"id":"Lappland", "info":[{"totalbefolkning":89991,"män":46577,"kvinnor":43414}]},
    {"id":"Norrbotten", "info":[{"totalbefolkning":195769,"män":100072,"kvinnor":95697}]}
]



function handleMouseOver(d){
    d3.select(this).attr('fill', 'yellow')

    const tooltip = document.querySelector('.tooltip')
    tooltip.style.visibility = 'visible'
    const header = document.querySelector('#landskapsnamn')
    header.innerHTML = d.properties.landskap
    const total = document.querySelector('#total')
    const men = document.querySelector('#men')
    const women = document.querySelector('#women')
    let popStats = population.find(object => object.id === d.properties.landskap)
    total.innerHTML = popStats.info[0].totalbefolkning
    men.innerHTML = popStats.info[0].män
    women.innerHTML = popStats.info[0].kvinnor

}

function handleMouseLeave(d){
    d3.select(this).attr('fill', '#69b3a2')
    
    const tooltip = document.querySelector('.tooltip')
    tooltip.style.visibility = 'hidden'
}

function followMouse(x,y){
    const tooltip = document.querySelector(".tooltip")
    tooltip.style.left = x + 'px'
    tooltip.style.top = y + 'px'
}

// async function getPopulation(){
//     let resp = await fetch('./befolkning.json');
//     let pop = await resp.json();
//     return pop;
//     console.log(pop)

//     for(let item of pop){
//         console.log(item.id)
//     }
// }


async function renderLandskap(){
        
    const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

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
            .on('mouseover', handleMouseOver)
            .on('mouseleave', handleMouseLeave)
            .on('mousemove', ()=> followMouse(d3.event.clientX, d3.event.clientY))
}


renderLandskap()
