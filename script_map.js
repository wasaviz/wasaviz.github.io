function createMap(indicator, region) {
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

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .style("fill", function(d) {
                return 'red';
            })
            .attr('width', 30)
            .attr('height', 30)
            .attr('x', function(d){
                //console.log(d.Coordonnees.split(', '))
                return projection(parseFloat(d.Coordonnees.split(', ')[1]));
            })
            .attr('y', function(d){
                //onsole.log(d.Coordonnees.split(', '))
                projection(parseFloat(d.Coordonnees.split(', ')[0]));
            })
            .attr("transform", function(d) {
                //console.log(d.Coordonnees)
                return "translate(" + projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])])  + ")";
            });
    });
}

createMap("Temperature", 7149);