vs.ext.filter.filtername1 = function(a) {
	console.log("filter--ext");
	a.filterURL = "custom_project/partials/filters/dd.html";
	a.alertThis = function() {
	}
};

vs.ext.filter.buttonFilter = function($scope) {
	$scope.clicked = function(i){
		console.log(i);
		$scope.filterSelection = i;
		$scope.filterChanged()
	}
};

vs.ext.filter.link = function(a) {
	a.filterSelection = [];
	a.alertThis = function(b) {
		if (a.filterSelection.length < a.filterData.maxSelect) {
			a.filterSelection.push(b);
			a.filterChanged()
		}
	}
};

vs.ext.filter._filters_widget = function(a) {
	console.log("called")
};
vs.ext.widget.table.tab = function(b, a) {
	console.log(vividSENSE.constant());
	a.design[0].data.plotOptions.datatable.applyColor = function(d, c) {
		console.log("here", d, c);
		d.fnRowCallback = function(e, f) {
			console.log(e, f);
			f.Year = f.Year * 10;
			$($(e).children("td").get(3), e).html(
					FormatterService.currency(f.Year))
		};
		return d
	}
};


vs.ext.widget.infographics.d3Plugin = function(scope) {
	var width = 960,
    height = 500;
	var color = d3.scale.category20();
	
	var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);
	
	var svg = d3.select("#graph_id").append("svg")
    .attr("width", width)
    .attr("height", height);
	
	console.log(svg);

	//d3.json("/vividsense-ui/cacc/json/miserables_json.js",function(graph){
	console.log(scope.widgetData.data);
	console.log(force);
	
		graph=scope.widgetData.data;
		force
	      .nodes(graph.nodes)
	      .links(graph.links)
	      .start();

	  var link = svg.selectAll(".link")
	      .data(graph.links)
	    .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

	  var node = svg.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 5)
	      .style("fill", function(d) { return color(d.group); })
	      .call(force.drag);

	  node.append("title")
	      .text(function(d) { return d.name; });

	  force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	    node.attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });
	  });
	//});
	
	
};