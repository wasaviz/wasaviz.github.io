function reduceRect() {
    d3.selectAll("rect")
        .transition()
        .attr('width', 15)
        .attr('height', 15);

    var gLegend = d3.select("#legend").select("g");

    gLegend.selectAll("rect")
        .transition()
        .attr("height", 30)
        .attr("width", 80);

    d3.select("#gradient")
        .transition()
        .attr("height", 60)
        .attr("width", 400);
}

function zoomRect(idStation) {
    d3.selectAll(".id" + idStation)
        .transition()
        .attr('width', 20)
        .attr('height', 20);
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