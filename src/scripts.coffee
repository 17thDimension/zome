append = (ele, txt) ->
  div = document.createElement('div')
  div.innerHTML = txt
  ele.appendChild(div)

class Polygon
  constructor: (@edges) ->

  render: () ->
    console.log(@edges)
    r = window.op.selectAll("polygon")
      .data([@edges])
      .enter().append("polygon")
      .attr 'points', (d) ->
        d.map((d) ->
          [d.x, d.y].join ','
        ).join ' '
      .attr("stroke","black")
      .attr("stroke-width",2)

document.onreadystatechange = () ->
  if document.readyState is "complete"
    window.op =d3.select("body").append("svg")
         .attr("width", 1000)
         .attr("height", 667)
    triangle = [ { "x": 500,   "y": 0},  { "x": 1000,  "y": 600},
                  { "x": 0,  "y": 600}, { "x": 500,  "y": 0}];
    serpent = new Polygon(triangle)
    serpent.render()
