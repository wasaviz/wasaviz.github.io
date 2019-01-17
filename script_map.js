function createMap(indicator, region, time) {

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
            d.neige = +d.Neige;
            d.pluie = +d.Pluie24;
            d.vent = +d.VitesseVent;
        });

        var times = [];
        for (var i = 0; i < data.length; i++) {
            if (!times.includes(data[i].Date)) {
                times.push(data[i].Date);
            }
        }

        data = data.filter(function (d) {
            return parseFloat(d.Coordonnees.split(',')[1]) < 11
                && parseFloat(d.Coordonnees.split(',')[1]) > -5
                && parseFloat(d.Coordonnees.split(',')[0]) < 51
                && parseFloat(d.Coordonnees.split(',')[0]) > 40
                && d.Date == times[time];
        });
        document.getElementById("time").innerText = times[time];

        extent_temperature = d3.extent(data, function (d) {
            return d.temperature;
        });
        extent_neige = d3.extent(data, function (d) {
            return d.neige;
        });
        extent_pluie = d3.extent(data, function (d) {
            return d.pluie;
        });
        extent_vent = d3.extent(data, function (d) {
            return d.vent;
        });

        var size = 20;

        var scale_temperature = d3.scaleLinear()
            .domain(extent_temperature)
            .range([5, size]);
        var scale_neige = d3.scaleLinear()
            .domain(extent_neige)
            .range([5, size]);
        var scale_pluie = d3.scaleLinear()
            .domain(extent_pluie)
            .range([5, size]);
        var scale_vent = d3.scaleLinear()
            .domain(extent_vent)
            .range([5, size]);

        var color_temperature = d3.scaleLinear().domain(extent_temperature)
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#fee0d2'), d3.rgb('#e31a1c')]);

        var color_neige = d3.scaleLinear().domain(extent_neige)
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#f0f0f0'), d3.rgb('#636363')]);

        var color_pluie = d3.scaleLinear().domain(extent_pluie)
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#deebf7'), d3.rgb('#2171b5')]);

        var color_vent = d3.scaleLinear().domain(extent_vent)
            .interpolate(d3.interpolateHcl)
            .range([d3.rgb('#edf8e9'), d3.rgb('#238b45')]);

        document.getElementById("min-temperature").innerHTML = extent_temperature[0].toFixed(2) + "°C";
        document.getElementById("max-temperature").innerHTML = extent_temperature[1].toFixed(2) + "°C";
        document.getElementById("min-pluie").innerHTML = extent_pluie[0].toFixed(2) + "mm";
        document.getElementById("max-pluie").innerHTML = extent_pluie[1].toFixed(2) + "mm";
        document.getElementById("min-neige").innerHTML = extent_neige[0].toFixed(2) + "mm";
        document.getElementById("max-neige").innerHTML = extent_neige[1].toFixed(2) + "mm";
        document.getElementById("min-vent").innerHTML = extent_vent[0].toFixed(2) + "km/h";
        document.getElementById("max-vent").innerHTML = extent_vent[1].toFixed(2) + "km/h";

        var gs = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g");

        gs.append("rect")
            .style('fill', function (d) {
                return color_temperature(d.temperature);
            })
            .attr('width', function (d) {
                return scale_temperature(d.temperature);
            })
            .attr('height', function (d) {
                return scale_temperature(d.temperature);
            })
            .attr("class", function (d) {
                return "id" + d.IDStation;
            })
            .attr("id", function(d) {
                return "id" + d.IDStation + "0";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translation[0] += -scale_temperature(d.temperature);
                translation[1] += -scale_temperature(d.temperature);
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translateRect(d.IDStation, parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0]))
                zoomRect(d.IDStation);
                createLineChart("Temperature", d.IDStation, times[time]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });

        gs.append("rect")
            .style('fill', function (d) {
                return color_neige(d.neige);
            })
            .attr('width', function (d) {
                return scale_neige(d.neige);
            })
            .attr('height', function (d) {
                return scale_neige(d.neige);
            })
            .attr("class", function (d) {
                return "id" + d.IDStation;
            })
            .attr("id", function(d) {
                return "id" + d.IDStation + "0";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translation[0] += 0;
                translation[1] += -scale_neige(d.neige);
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translateRect(d.IDStation, parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0]))
                zoomRect(d.IDStation);
                createLineChart("Neige", d.IDStation, times[time]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });

        gs.append("rect")
            .style('fill', function (d) {
                return color_pluie(d.pluie);
            })
            .attr('width', function (d) {
                return scale_pluie(d.pluie);
            })
            .attr('height', function (d) {
                return scale_pluie(d.pluie);
            })
            .attr("class", function (d) {
                return "id" + d.IDStation;
            })
            .attr("id", function(d) {
                return "id" + d.IDStation + "0";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translation[0] += -scale_pluie(d.pluie);
                translation[1] += 0;
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translateRect(d.IDStation, parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0]))
                zoomRect(d.IDStation);
                createLineChart("Pluie24", d.IDStation, times[time]);
            })
            .on("mouseout", function (d) {
                reduceRect();
                tooltip.classed('hidden', true)
            });

        gs.append("rect")
            .style('fill', function (d) {
                return color_vent(d.vent);
            })
            .attr('width', function (d) {
                return scale_vent(d.vent);
            })
            .attr('height', function (d) {
                return scale_vent(d.vent);
            })
            .attr("class", function (d) {
                return "id" + d.IDStation;
            })
            .attr("id", function(d) {
                return "id" + d.IDStation + "0";
            })
            .attr("transform", function(d) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translation[0] += 0;
                translation[1] += 0;
                return "translate(" + translation + ")";
            })
            .on("mouseover", function(d, i) {
                var translation = projection([parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0])]);
                translateRect(d.IDStation, parseFloat(d.Coordonnees.split(',')[1]), parseFloat(d.Coordonnees.split(',')[0]))
                zoomRect(d.IDStation);
                createLineChart("VitesseVent", d.IDStation, times[time]);
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

createMap("Temperature", 7149, 0);
