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
  addEvents: function() {
    var divs = document.querySelectorAll("#game_table td div");
    for(var i = 0; i < divs.length; i++) {
      var div = divs[i];
      var parent = div.parentElement;
      div.removeEventListener("click", View.startLine);
      div.addEventListener("click", View.startLine);
    }
  },
  startLine: function(event) {
    var clickedElement = event.target;
    var parent = clickedElement.parentElement;
    var x = parent.cellIndex;
    var y = parent.parentNode.rowIndex;
    var table = document.getElementById("game_table");
    var totalOptions = 0;
    var startFrom = "topLeft";
    switch(clickedElement.className) {
      case "topLeft":
        //check parent (top and left)
        if(!parent.dataset.top) {
          totalOptions += 1;
          var node = parent.querySelector(".topRight");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        if(!parent.dataset.left) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomLeft");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        //check square up (left)
        if(y > 0) {
          var square = table.rows[y - 1].cells[x];
          if(!square.dataset.left) {
            totalOptions += 1;
            var node = square.querySelector(".topLeft");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
        //check square left (up)
        if(x > 0) {
          var square = table.rows[y].cells[x - 1];
          if(!square.dataset.top) {
            totalOptions += 1;
            var node = square.querySelector(".topLeft");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
      break;
      case "topRight":
        startFrom = "topRight";
        //check parent (top and right)
        if(!parent.dataset.top) {
          totalOptions += 1;
          var node = parent.querySelector(".topLeft");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        if(!parent.dataset.right) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomRight");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        //check square up (right)
        if(y > 0) {
          var square = table.rows[y - 1].cells[x];
          if(!square.dataset.right) {
            totalOptions += 1;
            var node = square.querySelector(".topRight");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
        //check square right (up)
        if(x < table.rows[y].cells.length - 1) {
          var square = table.rows[y].cells[x + 1];
          if(!square.dataset.top) {
            totalOptions += 1;
            var node = square.querySelector(".topRight");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
      break;
      case "bottomLeft":
        startFrom = "bottomLeft";
        //check parent (left and bottom)
        if(!parent.dataset.left) {
          totalOptions += 1;
          var node = parent.querySelector(".topLeft");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        if(!parent.dataset.bottom) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomRight");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        //check square down (left)
        if(y < table.rows.length - 1) {
          var square = table.rows[y + 1].cells[x];
          if(!square.dataset.left) {
            totalOptions += 1;
            var node = square.querySelector(".bottomLeft");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
        //check square left (bottom)
        if(x > 0) {
          var square = table.rows[y].cells[x - 1];
          if(!square.dataset.bottom) {
            totalOptions += 1;
            var node = square.querySelector(".bottomLeft");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
      break;
      case "bottomRight":
        startFrom = "bottomRight";
        //check parent (bottom and right)
        if(!parent.dataset.right) {
          totalOptions += 1;
          var node = parent.querySelector(".topRight");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        if(!parent.dataset.bottom) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomLeft");
          node.addEventListener("click", View.endLine);
          node.classList.add("endLine");
        }
        //check square down (right)
        if(y < table.rows.length - 1) {
          var square = table.rows[y + 1].cells[x];
          if(!square.dataset.right) {
            totalOptions += 1;
            var node = square.querySelector(".bottomRight");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
        //check square right (bottom)
        if(x < table.rows[y].cells.length - 1) {
          var square = table.rows[y].cells[x + 1];
          if(!square.dataset.bottom) {
            totalOptions += 1;
            var node = square.querySelector(".bottomRight");
            node.addEventListener("click", View.endLine);
            node.classList.add("endLine");
          }
        }
      break;
    };
    if(totalOptions != 0) {
      //remove all startLine events
      var divs = document.querySelectorAll("#game_grid div");
      for(var i = 0; i < divs.length; i++) {
        var div = divs[i];
        div.removeEventListener("click", View.startLine);
      }
    }
  },
  genEndLine: function(x, y, startFrom) {
    return function(event) {
      View.endLine(event, x, y, startFrom);
    };
  },
  endLine: function(event) {
    var clickedElement = event.target;
    var parent = clickedElement.parentNode;
    var x2 = parent.cellIndex;
    var y2 = parent.parentNode.rowIndex;
    if(x == x2 && y == y2) {
      console.log("same squere");
      //same square
      switch (clickedElement.className) {
        case "topLeft":
          switch (startFrom) {
            case "topRight":
            //top
            break;
            case "bottomLeft":
            //left
            break;
          }
        break;
        case "topRight":
          switch (startFrom) {
            case "topLeft":
            //top
            break;
            case "bottomRight":
            //right
            break;
          };
          break;
        case "bottomLeft":
          switch (startFrom) {
            case "bottomRight":
            //bottom
            break;
            case "topLeft":
            //left
            break;
          }
          break;
        case "bottomRight":
          switch (startFrom) {
            case "bottomLeft":
            //bottom
            break;
            case "topRight":
            //right
            break;
          }
          break;
      }
    } else {
      //different square
      console.log("different square");
      switch (x - x2) {
        case 1:
        //right
        break;
        case -1:
        //left
        break;
        case 0:
          switch (y-y2) {
            case 1:
            //top
            break;
            case -1:
            //bottom
            break;
          }
        break;
      }
    }
    //submit for update to selected wall
    //reset event listners and remove end line class
  },
  resetEventListeners: function() {
    var divs = document.querySelectorAll(".endLine");
    for(var i = 0; i < divs.length; i++) {
      var div = divs[i];
      div.removeEventListener("click", View.endLine);
      div.classList.remove("endLine");
    }
    View.addEvents();
  },
  updatePlayers: function(playersInfo) {
    var html = View.genPlayerGrid(playersInfo);
    View.insertPlayerGridHtml(html);
  },
  //lineData [{x: Int, y: Int, side: String}]
  updateLines: function(lineData) {
    var t = document.getElementById("game_table");
    //Imperative
    for(var i = 0; i < lineData.length; i++) {
      var line = lineData[i];
      var td = t.rows[line.y].cells[line.x];
      td.style["border-"+line.side] = "2px solid blue";
      td.dataset[line.side] = "true";
    }
    //FUNCTIONAL
    /*
    lineData.map(function(line) {
      var td = t.rows[line.y].cells[line.x];
      td.style["border-"+line.side] = "2px solid blue";
    });
    */
  },
  //squareData [{x: Int, y: Int, color: String}]
  updateSquares: function(squareData) {
    var t = document.getElementById("game_table");
    //Imperative
    for(var i = 0; i < squareData.length; i++) {
      var square = squareData[i];
      var td = t.rows[square.y].cells[square.x];
      td.style["background-color"] = square.color;
      td.dataset["complete"] = "true";
    }
    //FUNCTIONAL
    /*
    squareData.map(function(square) {
      var td = t.rows[square.y].cells[square.x];
      td.style["background-color"] = square.color;
    });
    */
  }
};
