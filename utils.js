function reduceRect() {
    d3.selectAll("rect")
        .transition()
        .attr('width', 15)
        .attr('height', 15);

    var gLegend = d3.select("#legend").select("g");

    console.log(gLegend);

    gLegend.selectAll("rect")
        .transition()
        .attr("height", 30)
        .attr("width", 80);

    d3.select("#gradient")
        .transition()
        .attr("height", 60)
        .attr("width", 400);
}