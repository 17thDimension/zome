var Polygon, append;

append = function(ele, txt) {
  var div;
  div = document.createElement('div');
  div.innerHTML = txt;
  return ele.appendChild(div);
};

Polygon = (function() {
  function Polygon(edges) {
    this.edges = edges;
  }

  Polygon.prototype.render = function() {
    var r;
    console.log(this.edges);
    return r = window.op.selectAll("polygon").data([this.edges]).enter().append("polygon").attr('points', function(d) {
      return d.map(function(d) {
        return [d.x, d.y].join(',');
      }).join(' ');
    }).attr("stroke", "black").attr("stroke-width", 2);
  };

  return Polygon;

})();

document.onreadystatechange = function() {
  var serpent, triangle;
  if (document.readyState === "complete") {
    window.op = d3.select("body").append("svg").attr("width", 1000).attr("height", 667);
    triangle = [
      {
        "x": 500,
        "y": 0
      }, {
        "x": 1000,
        "y": 600
      }, {
        "x": 0,
        "y": 600
      }, {
        "x": 500,
        "y": 0
      }
    ];
    serpent = new Polygon(triangle);
    return serpent.render();
  }
};
