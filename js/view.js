var View = {
  init: function(width, height) {
    var html = View.genBlankGrid(width, height);
    View.insertGridHtml(html);
  },
  genBlankGrid: function(width, height) {
    var html = "<table id='game_table'>";
    for(var i = 0; i < width; i++) {
      html += "<tr>";
      for(var j = 0; j < height; j++) {
        html += "<td class='square'>\
        <div class='topLeft'></div>\
        <div class='topRight'></div>\
        <div class='bottomLeft'></div>\
        <div class='bottomRight'></div>\
        </td>";
      }
      html += "</tr>";
    }
    html += "</table>";
    return html;
  },
  insertGridHtml: function(html) {
    document.getElementById("game_grid").innerHTML = html;
  },
  //lineData [{x: Int, y: Int, wall: String}]
  updateLines: function(lineData) {
    var t = document.getElementById("game_table");
    lineData.map(function(line) {
      var td = t.rows[line.y].cells[line.x];
      td.style["border-"+line.side] = "2px solid blue";
    });
  },
  //squareData [{x: Int, y: Int, color: String}]
  updateSquares: function(squareData) {
    var t = document.getElementById("game_table");
    squareData.map(function(square) {
      var td = t.rows[square.y].cells[square.x];
      td.style["background-color"] = square.color;
    });
  }
};
