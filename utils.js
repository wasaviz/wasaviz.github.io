function reduceRect() {
    var margin = {top: 20, right: 20, bottom: 50, left: 70},
        height = document.getElementById("linechart-container").offsetHeight - 100 - margin.top - margin.bottom;

    d3.selectAll("rect")
        .transition()
        .style('stroke-width', 0.5)
        .attr('opacity', 1)
        .style('z-index', 1);

    var gLegend = d3.select("#legend").select("g");

    gLegend.selectAll("rect")
        .transition()
        .attr("height", 30)
        .attr("width", 120);

    d3.select("#gradient")
        .transition()
        .attr("height", 60)
        .attr("width", 400);

    d3.select("#indicator")
        .transition()
        .attr("height", height)
        .attr("width", 0.1);
}

function zoomRect(idStation) {
    d3.selectAll("rect")
        .transition()
        .attr('opacity', 0.3)
        .style('z-index', 1);

    var gLegend = d3.select("#legend").select("g");

    gLegend.selectAll("rect")
        .transition(0)
        .attr("opacity", 1);

    d3.selectAll(".id" + idStation)
        .transition()
        .style('stroke-width', 2)
        .attr('opacity', 1)
        .style('z-index', 2);
}

function translateRect(idStation, lat, lon) {
    /*var projection = d3.geoConicConformal().center([6.454071, 47.279229]).scale(2800);

    var baseTranslation = projection([lat, lon]);
    var translation = baseTranslation;
    translation[0] += 0;
    translation[1] += 0;

    d3.selectAll("#id" + idStation + "0")
        .attr("transform", "translate(" + translation + ")");

    baseTranslation = projection([lat, lon]);
    translation = baseTranslation;
    translation[0] += 30;
    translation[1] += 0;

    d3.selectAll("#id" + idStation + "1")
        .attr("transform", "translate(" + translation + ")");

    baseTranslation = projection([lat, lon]);
    translation = baseTranslation;
    translation[0] += 0;
    translation[1] += 30;

    d3.selectAll("#id" + idStation + "2")
        .attr("transform", "translate(" + translation + ")");

    baseTranslation = projection([lat, lon]);
    translation = baseTranslation;
    translation[0] += 30;
    translation[1] += 30;

    d3.selectAll("#id" + idStation + "3")
        .attr("transform", "translate(" + translation + ")");*/
}

function onTimeChange(var_x, var_y, time, transition_time) {
    createMap("Temperature", 7149, time);
    createGraph(var_x, var_y, time, transition_time);
    var indicateur = document.getElementById("linechart").getAttribute("class");
    createLineChart(indicateur.split("-")[0], indicateur.split("-")[1], time);
}