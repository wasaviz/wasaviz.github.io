<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <style>
    body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }
    
    .hidden {
        display: none;
    }
    div.tooltip {
        color: #222;
        background-color: #fff;
        padding: .5em;
        text-shadow: #f5f5f5 0 1px 0;
        border-radius: 2px;
        opacity: 0.9;
        position: absolute;
    }
  </style>
</head>

<body>
  <script>
		var width = 700,
  		  height = 580;

		var svg = d3.select( "body" )
  		.append( "svg" )
		  .attr( "width", width )
		  .attr( "height", height );
		  

    d3.csv("newData.csv", function(data) {
    
		var x = d3.scale.linear()
				.domain([min(data.Temperature),max(data.Temperature)])
				.range([0,width]);


		var y = d3.scale.linear()
				.domain([min(data.Pluie24),max(data.Pluie24)])
				.range([0,height]);
    
      svg.selectAll("rect")
      	.data(data)
      	.enter()
      	.append("rect")
        .style("fill", function(d) {
			return 'red';
		  })
      	.attr('width', 30)
      	.attr('height', 30)
      	.attr('x', function(d){
			return x(d.Temerature) );
		})
      	.attr('y', function(d){
			return y(d.Pluie24);
		})
    });

  </script>
</body>
