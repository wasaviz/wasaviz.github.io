region = 7149;

d3.select("body")
    .append("h2")
    .attr("id", "title")
    .text("Temperature in station n°" + region + ".");

var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var parseDate = d3.timeParse("%Y-%m-%d");
var displayDate = d3.timeFormat("%Y-%m-%d");

var g = svg.append("g");

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip hidden")
    .attr("width", 10)
    .attr("height", 10)
    .style("font_size", 15)
    .style("font-family", "monospace")
    .style("color", '#222')
    .style('background-color', '#fff')
    .style('padding', '.5em');

var x = d3.scaleTime();

var y = d3.scaleLinear();


d3.csv("newData.csv", function (data) {

    let ville;
    // Pre-processing
    data.forEach(function (d, i) {
        d.date = parseDate(d.Date);
        d.temperature = +d.Temperature;
        d.IDStation = +d.IDStation;
    });

    // Création du selecteur
    var regions = [];
    var select = document.getElementById("station");
    for (var i = 0; i < data.length; i++) {
        if (!regions.includes(data[i].IDStation)) {
            regions.push(data[i].IDStation);
            var option = document.createElement("option");
            option.value = data[i].IDStation;
            option.text = data[i].NomLieu;
            select.appendChild(option);
        }
    }

    // Ordinal scale
    x.range([0, width])
        .domain(d3.extent(data, function (d) {
            return d.date;
        }));

    // Linear scale
    y.range([0, height])
        .domain(d3.extent(data, function (d) {
            return d.temperature;
        }));

    var y_axis = d3.scaleLinear()
        .range([height, 0])
        .domain(d3.extent(data, function (d) {
            return d.temperature;
        }));

    // Add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width/2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Date");

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y_axis));

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");

    data = data.filter(function (d) {
        return d.IDStation === region;
    });
    ville = data[0].NomLieu;

    d3.select("#title")
        .text("Temperature in station n°" + region + " : " + ville);


    //Affichage de la courbe
    var line = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return height - y(d.temperature);
        });

    g.append("path")
        .attr("id", "line")
        .attr("d", line(data));


    var formatDecimal = d3.format(".1f")

    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d, i) {
            return x(d.date)
        })
        .attr("cy", function (d, i) {
            return height - y(d.temperature)
        })
        .attr("r", 2)
        .style("fill", "darkRed")
        .on("mouseover", function (d, i) {
            d3.select(this)
                .style("fill", "lightGray")
                .attr("r", 5);

            var mouse = d3.mouse(this);
            tooltip.classed('hidden', false)
                .attr('style', 'position: absolute; left:' + (mouse[0] + 30) +
                    'px; top:' + (mouse[1] + 130) + 'px')
                .html(formatDecimal(d.temperature) + " °C <br> " + displayDate(d.date));
        })
        .on("mouseout", function (d, i) {
            d3.select(this).transition().duration(300)
                .style("fill", "darkRed")
                .attr("r", 2)

            tooltip.classed('hidden', true);
        });
});

function refreshView(region) {

    d3.csv("newData.csv", function (data) {
        data = data.filter(function (d) {
            return d.IDStation == region;
        });
        let ville;
        // Pre-processing
        data.forEach(function (d, i) {
            d.date = parseDate(d.Date);
            d.temperature = +d.Temperature;
            d.IDStation = +d.IDStation;
            d.ville = +d.NomLieu;
            if(i == 0){
                ville = d.NomLieu;
            }

        });

        // Change the line
        // Ordinal scale
        /*var x = d3.scaleTime()
            .range([0, width])
            .domain(d3.extent(data, function (d) {
                return d.date;
            }));

        // Linear scale
        var y = d3.scaleLinear()
            .range([0, height])
            .domain(d3.extent(data, function (d) {
                return d.temperature;
            }));*/

        var line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return height - y(d.temperature);
            });

        d3.select("#line")
            .transition()
            .duration(300)
            .attr("d", line(data));

        // Change the points
        var formatDecimal = d3.format(".1f")


        var circles = d3.select("g").selectAll("circle").data(data);

        circles.exit().remove();
        circles.data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) {
                return x(d.date)
            })
            .attr("cy", function (d, i) {
                return height - y(d.temperature)
            })
            .attr("r", 2)
            .style("fill", "darkRed")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .style("fill", "lightGray")
                    .attr("r", 5);

                var mouse = d3.mouse(this);
                tooltip.classed('hidden', false)
                    .attr('style', 'position: absolute; left:' + (mouse[0] + 15) +
                        'px; top:' + (mouse[1] - 35) + 'px')
                    .html(formatDecimal(d.temperature) + " °C <br> " + displayDate(d.date));
            })
            .on("mouseout", function (d, i) {
                d3.select(this).transition().duration(300)
                    .style("fill", "darkRed")
                    .attr("r", 2)

                tooltip.classed('hidden', true);
            });

        circles.data(data)
            .transition()
            .duration(300)
            .attr("cx", function (d, i) {
                return x(d.date)
            })
            .attr("cy", function (d, i) {
                return height - y(d.temperature)
            });

        // Change title
        d3.select("#title")
            .text("Temperature in station n°" + region + " : "+ ville);
    });
}