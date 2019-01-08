// ****************** Draws regions by projecting them in the selected variables axis ***********************************

var margin = {top: 20, right: 20, bottom: 50, left: 70}
var width = document.getElementById("regiongraph-container").offsetWidth - margin.left - margin.right;
var height = document.getElementById("regiongraph-container").offsetHeight - 100 - margin.top - margin.bottom;

var svg = d3.select("body").select("#regiongraph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 50)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var bg = svg.append("rect")

bg.attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "none");

var movie_label = svg.append('text')
movie_label.attr('x', width / 2)
    .attr('y', height / 10)
    .attr('font-size', 20)

//global variables
var color = d3.scaleOrdinal(d3.schemeCategory20);
var x = d3.scaleLinear()
var y = d3.scaleLinear()
var y2 = d3.scaleLinear()
var x_axis;
var y_axis;
var x_label;
var y_label;
var tooltip = d3.select('#regiongraph-container').append('div')
    .attr('class', 'hidden tooltip');
var parseDate = d3.timeParse("%Y-%m-%d");
var displayDate = d3.timeFormat("%Y-%m-%d");
var g_x;
var g_y;
var times = [];

d3.select("body").select("#regionmap")
    .append("h2")
    .attr("id", "regionGraphTitle")
    .text("Projection of the stations in the Temperature and Pluie24 axis.");

document.getElementById("time").disabled = true;
document.getElementById("var_x").value = "Temperature"
document.getElementById("var_y").value = "VitesseVent"


// Graphique initial et initialisation
d3.csv("newData.csv", function (data) {

    var var_x = document.getElementById("var_x").value
    var var_y = document.getElementById("var_y").value
    var select = document.getElementById("time");
    //fills the time values in the select box
    for (var i = 0; i < data.length; i++) {
        if (!times.includes(data[i].Date)) {
            times.push(data[i].Date);
            var option = document.createElement("option");
            option.value = data[i].Date;
            option.text = data[i].Date;
            option.id = data[i].Date;
            select.appendChild(option);
        }
    }
    //initialize the time slider
    document.getElementById('timeRange').min = 0
    document.getElementById('timeRange').max = times.length - 1

    let time = times[0]

    //filter data
    data = data.filter(function (d) {
        return parseFloat(d.Coordonnees.split(',')[1]) < 11
            && parseFloat(d.Coordonnees.split(',')[1]) > -5
            && parseFloat(d.Coordonnees.split(',')[0]) < 51
            && parseFloat(d.Coordonnees.split(',')[0]) > 40;
    });

    //scales and axis
    x.domain(d3.extent(data, function (d) {
        return +d[var_x];
    }))
        .range([0, width]);

    y.domain(d3.extent(data, function (d) {
        return +d[var_y]
    }))
        .range([0, height]);

    x_axis = d3.axisBottom(x);

    y2.domain([-0.1, 30])
        .range([height, 0]);

    y_axis = d3.axisLeft(y2);

    // drawing the regions
    svg.selectAll("rect")
        .data(data.filter(function(d){
            return d.Date == time;
        }))
        .enter()
        .append("rect")
        .attr("class", function (d) {
            return "id" + d.IDStation;
        })
        .style("fill", function (d) {
            return color(d.IDStation);
        })
        .attr('width', 15)
        .attr('height', 15)
        .attr('x', function (d) {
            return x(d[var_x]) + margin.left;
        })
        .attr('y', function (d) {
            return height - y(d[var_y])-15;
        })
        .on("mouseover", function (d) {
            d3.selectAll("rect").filter(function (e) {
                return e === d;
            })
                .transition()
                .attr('width', 40)
                .attr('height', 40);
            tooltip.classed('hidden', false)
                .attr('style', 'left:' + (x(d[var_x]) + margin.left + 30) +
                    'px; top:' + (height - y(d[var_y]) - 400) + 'px')
                .html('Station : ' + d.NomLieu);
            zoomRect(d.IDStation);
            translateRect(d.IDStation, d.Coordonnees.split(',')[1], d.Coordonnees.split(',')[0]);
            createLineChart(document.getElementById("var_x").value, d.IDStation);
        })
        .on("mouseout", function (d) {
            reduceRect();
            tooltip.classed('hidden', true)
        })
        .style('stroke-width', 0.5)
        .style('stroke', 'black');

    //display the axis
    g_y = svg.append('g').attr('transform', 'translate(' + -margin.right + ', 0 )')
    g_y.call(y_axis);
    g_x = svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'x axis');
    g_x.call(x_axis);

    //axis labels
    x_label = svg.append("text")
    x_label.attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 40) + ")")
        .style("text-anchor", "middle")
        .text(var_x);

    y_label = svg.append("text")
    y_label.attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(var_y);
});

//updates the chart when varibles or time change
function createGraph(var_x, var_y, time, transition_time) {
    document.getElementById("time").value = times[time]
    d3.csv("newData.csv", function (data) {

        data = data.filter(function (d) {
            return parseFloat(d.Coordonnees.split(',')[1]) < 11
                && parseFloat(d.Coordonnees.split(',')[1]) > -5
                && parseFloat(d.Coordonnees.split(',')[0]) < 51
                && parseFloat(d.Coordonnees.split(',')[0]) > 40;
        });

        transition_time = parseInt(transition_time)
        //mise a jour des domaines des axes
        x.domain(d3.extent(data, function (d) {
            return +d[var_x];
        }))
        y.domain(d3.extent(data, function (d) {
            return +d[var_y]
        }))

        x_axis.scale(x);
        y2.domain(d3.extent(data, function (d) {
            return +d[var_y];
        }))
        y_axis.scale(y2);

        //labels des axes
        x_label.text(var_x)
        y_label.text(var_y)
        //console.log(time)
        //Mise a jour de la position des regions
        svg.selectAll("rect")
            .data(data.filter(function(d){
                return d.Date == times[time];
            }))
            .transition()
            .duration(transition_time)
            .attr('width', 15)
            .attr('height', 15)
            .attr('x', function (d) {
                return x(d[var_x]);
            })
            .attr('y', function (d) {
                return height - y(d[var_y])-15;
            });

        //affichage des axes
        g_y.transition().duration(transition_time).call(y_axis);
        g_x.transition().duration(transition_time).call(x_axis)
    })
}

var seasons = {
    '01': 'Winter',
    '02': 'Winter',
    '03': 'Spring',
    '04': 'Spring',
    '05': 'Spring',
    '06': 'Summer',
    '07': 'Summer',
    '08': 'Summer',
    '09': 'Fall',
    '10': 'Fall',
    '11': 'Fall',
    '12': 'Winter'
};

var color_seasons = {
    'Winter': '#deebf7',
    'Spring': '#e5f5e0',
    'Summer': '#ffeda0',
    'Fall': '#fee0d2'
};

var mov;
 
function movie(var_x, var_y, time_step) {
    var i = parseInt(document.getElementById("timeRange").value)
    console.log(i)
    mov = setInterval(draw, 100);
    function draw() {
        if (i < times.length - 1) {
            document.getElementById('timeRange').value = i
            createGraph(var_x, var_y, i, 10);
            i = i + 1;
            movie_label.text(seasons[times[i].split('-')[1]] + ' ' + times[i].split('-')[0])
        } else {
            clearInterval(mov);
        }
    }
}

function stopMovie(){
	clearInterval(mov)
}
