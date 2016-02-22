var View = {
  init: function(width, height, playersInfo) {
    var html = View.genBlankGrid(width, height);
    View.insertGridHtml(html);
    html = View.genPlayerGrid(playersInfo);
    View.insertPlayerGridHtml(html);
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
  // playersInfo [{name: , color: , isTurn: , score: }]
  genPlayerGrid: function(playersInfo) {
    var html = "<div id='player_grid_wrapper'>";
    for(var i = 0; i < playersInfo.length; i++) {
      var player = playersInfo[i];
      html += "<div id='player"+i+"'"+((player.isTurn)?"class='your_turn'":"")+">";
      html += "<span class='player_name'>" + player.name + "</span>";
      html += "<span class='player_color " + player.color + "'>"+player.color+"</span>";
      html += "<hr />";
      html += "<span class='player_score'>" + player.score + "</span>";
      html += "</div>";
    }
    html += "</div>";
    return html;
  },
  insertPlayerGridHtml: function(html) {
    document.getElementById("player_grid").innerHTML = html;
  },
  updatePlayers: function(playersInfo) {
    var html = View.genPlayerGrid(playersInfo);
    View.insertPlayerGridHtml(html);
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
