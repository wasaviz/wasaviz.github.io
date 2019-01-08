function createMap(indicator, region) {

    region = +region;

    document.getElementById("regionmap").remove();
    var newMap = document.createElement("div");
    newMap.setAttribute("id", "regionmap");
    document.getElementById("regionmap-container").appendChild(newMap);

    var width = document.getElementById("regionmap-container").offsetWidth,
        height = document.getElementById("regionmap-container").offsetHeight;

    var svg = d3.select( "body" )
        .select("#regionmap")
        .append( "svg" )
        .attr( "width", width )
        .attr( "height", height );



    var projection = d3.geoConicConformal().center([6.454071, 45.279229]).scale(2400);

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
            d.temperature = +d.Temperature;
            d.IDStation = +d.IDStation;
        });

        data = d3.nest()
            .key(function(d) { return [d.IDStation, d.Coordonnees];})
            .rollup(function(d) {
                return {
                    "temperature": d3.mean(d, function(g) {
                        return g.temperature;
                    }),
                    "pluie": d3.mean(d, function (g) {
                        return g.Pluie24;
                    }),
                    "neige": d3.mean(d, function (g) {
                        return g.Neige;
                    }),
                    "vent": d3.mean(d, function (g) {
                        return g.VitesseVent;
                    })
                };
            }).entries(data);

        data = data.filter(function (d) {
            return parseFloat(d.key.split(',')[2]) < 11
                && parseFloat(d.key.split(',')[2]) > -5
                && parseFloat(d.key.split(',')[1]) < 51
                && parseFloat(d.key.split(',')[1]) > 40;
        });

        /*var color_temperature = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.temperature;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#42f4f4'), d3.rgb('#f70909')]);

        var color_neige = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.neige;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#42f4f4'), d3.rgb('#f70909')]);

        var color_pluie = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.pluie;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#42f4f4'), d3.rgb('#f70909')]);

        var color_vent = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.vent;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#42f4f4'), d3.rgb('#f70909')]);*/
            
        var color_temperature = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.temperature;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#fee0d2'), d3.rgb('#e31a1c')]);

        var color_neige = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.neige;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#f0f0f0'), d3.rgb('#636363')]);

        var color_pluie = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.pluie;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#deebf7'), d3.rgb('#2171b5')]);

        var color_vent = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.value.vent;
        }))
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#edf8e9'), d3.rgb('#238b45')]);

        var gs = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        gs.append("rect")
            .style('fill', function (d) {
                return color_temperature(d.value.temperature);
            })
            .attr('width', 15)
            .attr('height', 15)
            .attr("class", function (d) {
                return "id" + d.key.split(',')[0];
            })
            .attr("id", function(d) {
                return "id" + d.key.split(',')[0] + "0";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translation[0] += 0;
                translation[1] += 0;
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translateRect(d.key.split(',')[0], parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1]))
                zoomRect(d.key.split(',')[0]);
                createLineChart("Temperature", d.key.split(',')[0]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });

        gs.append("rect")
            .style('fill', function (d) {
                return color_neige(d.value.neige);
            })
            .attr('width', 15)
            .attr('height', 15)
            .attr("class", function (d) {
                return "id" + d.key.split(',')[0];
            })
            .attr("id", function(d) {
                return "id" + d.key.split(',')[0] + "1";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translation[0] += 20;
                translation[1] += 0;
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translateRect(d.key.split(',')[0], parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1]))
                zoomRect(d.key.split(',')[0]);
                createLineChart("Neige", d.key.split(',')[0]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });

        gs.append("rect")
            .style('fill', function (d) {
                return color_pluie(d.value.pluie);
            })
            .attr('width', 15)
            .attr('height', 15)
            .attr("class", function (d) {
                return "id" + d.key.split(',')[0];
            })
            .attr("id", function(d) {
                return "id" + d.key.split(',')[0] + "2";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translation[0] += 0;
                translation[1] += 20;
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translateRect(d.key.split(',')[0], parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1]))
                zoomRect(d.key.split(',')[0]);
                createLineChart("Pluie24", d.key.split(',')[0]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });

        gs.append("rect")
            .style('fill', function (d) {
                return color_vent(d.value.vent);
            })
            .attr('width', 15)
            .attr('height', 15)
            .attr("class", function (d) {
                return "id" + d.key.split(',')[0];
            })
            .attr("id", function(d) {
                return "id" + d.key.split(',')[0] + "3";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translation[0] += 20;
                translation[1] += 20;
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1])]);
                translateRect(d.key.split(',')[0], parseFloat(d.key.split(',')[2]), parseFloat(d.key.split(',')[1]))
                zoomRect(d.key.split(',')[0]);
                createLineChart("VitesseVent", d.key.split(',')[0]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });
            
        gs.selectAll("rect")
        .style('stroke-width', 0.5)
        .style('stroke', 'black');

    });
}

createMap("Temperature", 7149);
