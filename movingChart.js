  
  
var margin = {top: 20, right: 20, bottom: 50, left: 70}
var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").select("#regiongraph").append("svg")
  .attr( "width", width + margin.left + margin.right)
  .attr( "height", height +margin.top + margin.bottom+50)
  .append("g")
.attr("transform",
	"translate(" + margin.left + "," + margin.top + ")");

var color = d3.scaleOrdinal(d3.schemeCategory20);
var x = d3.scaleLinear()
var y = d3.scaleLinear()
var y2 = d3.scaleLinear()
var x_axis;
var y_axis;
var x_label;
var y_label;
var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');
var parseDate = d3.timeParse("%Y-%m-%d");
var displayDate = d3.timeFormat("%Y-%m-%d");
var g_x;
var g_y;

d3.select("body").select("#regionmap")
        .append("h2")
        .attr("id", "regionGraphTitle")
        .text("Projection of the stations in the Temperature and Pluie24 axis.");
        


d3.csv("newData.csv", function(data) {
	var var_x = 'Temperature'
	var var_y = 'Pluie24'
	var times = [];
	var select = document.getElementById("time");
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
	let time = times[0]
	//document.getElementById("time").property('value', times[0]);
	
	//let time = document.getElementById("time").value
	//console.log(time)
	
	x.domain(d3.extent(data, function(d){
			return +d[var_x];
		}))
	.range([0,width]);
	
	y.domain(d3.extent(data, function(d){
		return +d[var_y]
	}))
	.range([0,height]);
		
	x_axis = d3.axisBottom(x);
	
	y2.domain([-0.1, 30])
	.range([height,0]);

	y_axis = d3.axisLeft(y2);

  svg.selectAll("rect")
	.data(data.filter(function(d){
		//console.log(d.Date, time)
		return d.Date == time;}))
	.enter()
	.append("rect")
	.style("fill", function(d) {
		return color(d.IDStation);
	  })
	.attr('width', 10)
	.attr('height', 10)
	.attr('x', function(d){
		return x(d.Temperature)+margin.left ;
	})
	.attr('y', function(d){
		return height - y(d.Pluie24);
	})
	.on("mouseover", function(d){
		var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
      })
		d3.selectAll("rect").filter(function(e) {
		return e === d;
	  })
	  .transition()
	  .attr('width', 20)
	  .attr('height', 20)
	  tooltip.classed('hidden', false)
		.attr('style', 'left:' + (mouse[0]+margin.left) +
				'px; top:' + (mouse[1]+80) + 'px')
		.html('Station : '+d.NomLieu);
	})
	.on("mouseout", function(d){
	  d3.selectAll("rect")
	  .transition()
	  .attr('width', 10)
	  .attr('height', 10)
	  tooltip.classed('hidden', true)
	})
	.style('stroke-width', 0.5)
	.style('stroke', 'black');
	
	g_y = svg.append('g').attr('transform', 'translate('+margin.right+', 0 )')
	
	g_y.call(y_axis);

	g_x = svg.append('g')
	.attr('transform', 'translate(0,' +450+ ')')
	.attr('class', 'x axis');
	
	g_x.call(x_axis);
	
	x_label = svg.append("text")          
    x_label.attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .text("Temperature");
      
    y_label = svg.append("text")
      y_label.attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Pluie");  
      console.log(time)
});

	
function createGraph(var_x, var_y, time){
	
	d3.csv("newData.csv", function(data) {
		//mise a jour des domaines des axes
		x.domain(d3.extent(data, function(d){
			return +d[var_x];
		}))
		y.domain(d3.extent(data, function(d){
			return +d[var_y]
		}))
		
		x_axis.scale(x);
		y2.domain(d3.extent(data, function(d){
			return +d[var_y];
		}))
		y_axis.scale(y2);
		
		//labels des axes
		x_label.text(var_x)
		y_label.text(var_y)  
		console.log(time)
		//Mise a jour de la position des regions
	  svg.selectAll("rect")
		.data(data.filter(function(d){
		return d.Date == time;}))
		.transition()
		.duration(2000)
		.attr('width', 10)
		.attr('height', 10)
		.attr('x', function(d){
			return x(d[var_x]) ;
		})
		.attr('y', function(d){
			return height - y(d[var_y]);
		});
		
		//affichage des axes
		g_y.call(y_axis).transition();
		g_x.call(x_axis).transition();
	})
}

	


