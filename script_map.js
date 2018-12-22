function createMap(indicator, region) {

    region = +region;

    document.getElementById("regionmap").remove();
    var newMap = document.createElement("div");
    newMap.setAttribute("id", "regionmap");
    document.body.appendChild(newMap);

    var width = 700,
        height = 580;

    var svg = d3.select( "body" )
        .select("#regionmap")
        .append( "svg" )
        .attr( "width", width )
        .attr( "height", height );



    var projection = d3.geoConicConformal().center([2.454071, 46.279229]).scale(2800);

    var path = d3.geoPath() // d3.geo.path avec d3 version 3
        .projection(projection);

    d3.json("regions.json", function(json) {
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style('fill', '#bdbdbd');
    });

    var parseDate = d3.timeParse("%Y-%m-%d");


    d3.csv("newData.csv", function(data) {

        // Pre-processing
        data.forEach(function (d, i) {
            d.date = parseDate(d.Date);
            d.value = +d[indicator];
            d.IDStation = +d.IDStation;
        });

        data = d3.nest()
            .key(function(d) { return [d.IDStation, d.Coordonnees];})
            .rollup(function(d) {
                return d3.mean(d, function(g) {return g.value; });
            }).entries(data);

        data = data.filter(function (d) {
            return parseFloat(d.key.split(',')[2]) < 11
                && parseFloat(d.key.split(',')[2]) > -5
                && parseFloat(d.key.split(',')[1]) < 51
                && parseFloat(d.key.split(',')[1]) > 40;
        })

        var color = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#42f4f4'), d3.rgb('#f70909')]);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .style('fill', function (d) {
                return color(d.value);
            })
            .attr('width', 30)
            .attr('height', 30)
            .attr("transform", function(d) {
                //console.log(d.Coordonnees)
                return "translate(" + projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])])  + ")";
            });
    });
}

createMap("Temperature", 7149);