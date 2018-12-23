  
  
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

d3.csv("newData.csv", function(data) {
	
	
	//console.log(data[Temperature)
	
			//.domain([d3.min(data.Temperature),d3.max(data.Temperature)])
			x.domain([-20, 40])
			.range([0,width]);
			
	
			y.domain([-0.1, 30])
			.range([0,height]);
		
	x_axis = d3.axisBottom(x);

	
			
	
	y2.domain([-0.1, 30])
	.range([height,0]);
			
	y_axis = d3.axisLeft(y2);

  svg.selectAll("rect")
	.data(data)
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
		console.log("hey")
		d3.selectAll("rect").filter(function(e) {
			
		return e === d;
	  })
	  .transition()
	  .attr('width', 20)
	  .attr('height', 20)
	})


	.on("mouseout", function(d){
	  d3.selectAll("rect")
	  .transition()
	  .attr('width', 10)
	  .attr('height', 10)
	})
	.style('stroke-width', 0.5)
	.style('stroke', 'black');
	
	svg.append('g').attr('transform', 'translate('+margin.right+', 0 )').call(y_axis);

	svg.append('g')
	.attr('transform', 'translate(0,' +450+ ')')
	.attr('class', 'x axis')
	.call(x_axis);
});

	
function createGraph(var_x, var_y){
	
	d3.csv("newData.csv", function(data) {
		//console.log(d3.max(data[var_x]))
		x.domain(d3.extent(data, function(d){
			return +d[var_x];
		}))
		//.range([0,width]);

		y.domain(d3.extent(data, function(d){
			return +d[var_y]
		}))
		
		console.log(d3.extent(data, function(d){
			return +d[var_y]
		}))
		//.range(0,height);
		
		x_axis.scale(x);
		y2.domain(d3.extent(data, function(d){
			return +d[var_y];
		}))
		//.range(height, 0);
		
		y_axis.scale(y2);
	
	  svg.selectAll("rect")
		.data(data)
		.style("fill", function(d) {
			return color(d.IDStation);
		  })
		.transition()
		.attr('width', 10)
		.attr('height', 10)
		.attr('x', function(d){
			return x(d[var_x]) ;
		})
		.attr('y', function(d){
			return height - y(d[var_y]);
		})
		.on("mouseover", function(d){
			d3.selectAll("rect").filter(function(e) {
			return e === d;
		  })
		  .transition()
		  .attr('width', 20)
		  .attr('height', 20)
		})
		.on("mouseout", function(d){
		  d3.selectAll("rect")
		  .transition()
		  .attr('width', 10)
		  .attr('height', 10)
		});
		
		svg.append('g').attr('transform', 'translate('+margin.right+', 0 )').call(y_axis);

		svg.append('g')
		.attr('transform', 'translate(0,' +450+ ')')
		.attr('class', 'x axis')
		.call(x_axis);
	})
}

	


