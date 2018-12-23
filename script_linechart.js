var dictIndicatorUnit = {
    "Temperature": "°C",
    "VitesseVent": "m/s",
    "Pluie1": "mm",
    "Pluie3": "mm",
    "Pluie6": "mm",
    "Pluie12": "mm",
    "Pluie24": "mm",
    "Neige": "m",
    "NeigeFraiche": "m"
}

function createLineChart(indicator, region) {

    region = +region;

    document.getElementById("linechart").remove();
    var newLinechart = document.createElement("div");
    newLinechart.setAttribute("id", "linechart");
    document.body.appendChild(newLinechart);

    d3.select("body").select("#linechart")
        .append("h2")
        .attr("id", "linechartTitle")
        .text(indicator + " in station n°" + region + ".");

    var margin = {top: 20, right: 20, bottom: 50, left: 70},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").select("#linechart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    var parseDate = d3.timeParse("%Y-%m-%d");
    var displayDate = d3.timeFormat("%Y-%m-%d");

    var g = svg.append("g");

    var tooltip = d3.select("body").select("#linechart")
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
            d.value = +d[indicator];
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
                option.id = data[i].IDStation;
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
                return d.value;
            }));

        var y_axis = d3.scaleLinear()
            .range([height, 0])
            .domain(d3.extent(data, function (d) {
                return d.value;
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
            .text(indicator);

        data = data.filter(function (d) {
            return d.IDStation === region;
        });
        ville = data[0].NomLieu;
        idVille = data[0].IDStation;
        var option = document.getElementById(idVille)
        option.selected = true;

        d3.select("#title")
            .text(indicator + " in station n°" + region + " : " + ville);


        //Affichage de la courbe
        var line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return height - y(d.value);
            });

        g.append("path")
            .attr("id", "line")
            .attr("d", line(data));


        var formatDecimal = d3.format(".4f");

        g.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) {
                return x(d.date)
            })
            .attr("cy", function (d, i) {
                return height - y(d.value)
            })
            .attr("r", 2)
            .style("fill", "darkRed")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .style("fill", "lightGray")
                    .attr("r", 5);

                var mouse = d3.mouse(this);
                tooltip.classed('hidden', false)
                    .attr('style', 'position: fixed; left:' + (mouse[0] + 30) +
                        'px; top:' + (mouse[1] + 220) + 'px;')
                    .html(formatDecimal(d.value) + dictIndicatorUnit[indicator] + " <br> " + displayDate(d.date));
            })
            .on("mouseout", function (d, i) {
                d3.select(this).transition().duration(300)
                    .style("fill", "darkRed")
                    .attr("r", 2)

                tooltip.classed('hidden', true);
            });
    });
}

createLineChart("Temperature", 7149);