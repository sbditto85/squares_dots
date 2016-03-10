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
    switch(clickedElement.className) {
      case "topLeft":
        //check parent (top and left)
        if(!parent.dataset.top) {
          totalOptions += 1;
          var node = parent.querySelector(".topRight");
          node.func = View.genEndLine(x, y, "topLeft");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        if(!parent.dataset.left) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomLeft");
          node.func = View.genEndLine(x, y, "topLeft");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        //check square up (left)
        if(y > 0) {
          var square = table.rows[y - 1].cells[x];
          if(!square.dataset.left) {
            totalOptions += 1;
            var node = square.querySelector(".topLeft");
            node.func = View.genEndLine(x, y, "topLeft");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
        //check square left (up)
        if(x > 0) {
          var square = table.rows[y].cells[x - 1];
          if(!square.dataset.top) {
            totalOptions += 1;
            var node = square.querySelector(".topLeft");
            node.func = View.genEndLine(x, y, "topLeft");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
      break;
      case "topRight":
        //check parent (top and right)
        if(!parent.dataset.top) {
          totalOptions += 1;
          var node = parent.querySelector(".topLeft");
          node.func = View.genEndLine(x, y, "topRight");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        if(!parent.dataset.right) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomRight");
          node.func = View.genEndLine(x, y, "topRight");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        //check square up (right)
        if(y > 0) {
          var square = table.rows[y - 1].cells[x];
          if(!square.dataset.right) {
            totalOptions += 1;
            var node = square.querySelector(".topRight");
            node.func = View.genEndLine(x, y, "topRight");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
        //check square right (up)
        if(x < table.rows[y].cells.length - 1) {
          var square = table.rows[y].cells[x + 1];
          if(!square.dataset.top) {
            totalOptions += 1;
            var node = square.querySelector(".topRight");
            node.func = View.genEndLine(x, y, "topRight");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
      break;
      case "bottomLeft":
        //check parent (left and bottom)
        if(!parent.dataset.left) {
          totalOptions += 1;
          var node = parent.querySelector(".topLeft");
          node.func = View.genEndLine(x, y, "bottomLeft");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        if(!parent.dataset.bottom) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomRight");
          node.func = View.genEndLine(x, y, "bottomLeft");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        //check square down (left)
        if(y < table.rows.length - 1) {
          var square = table.rows[y + 1].cells[x];
          if(!square.dataset.left) {
            totalOptions += 1;
            var node = square.querySelector(".bottomLeft");
            node.func = View.genEndLine(x, y, "bottomLeft");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
        //check square left (bottom)
        if(x > 0) {
          var square = table.rows[y].cells[x - 1];
          if(!square.dataset.bottom) {
            totalOptions += 1;
            var node = square.querySelector(".bottomLeft");
            node.func = View.genEndLine(x, y, "bottomLeft");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
      break;
      case "bottomRight":
        //check parent (bottom and right)
        if(!parent.dataset.right) {
          totalOptions += 1;
          var node = parent.querySelector(".topRight");
          node.func = View.genEndLine(x, y, "bottomRight");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        if(!parent.dataset.bottom) {
          totalOptions += 1;
          var node = parent.querySelector(".bottomLeft");
          node.func = View.genEndLine(x, y, "bottomRight");
          node.addEventListener("click", node.func);
          node.classList.add("endLine");
        }
        //check square down (right)
        if(y < table.rows.length - 1) {
          var square = table.rows[y + 1].cells[x];
          if(!square.dataset.right) {
            totalOptions += 1;
            var node = square.querySelector(".bottomRight");
            node.func = View.genEndLine(x, y, "bottomRight");
            node.addEventListener("click", node.func);
            node.classList.add("endLine");
          }
        }
        //check square right (bottom)
        if(x < table.rows[y].cells.length - 1) {
          var square = table.rows[y].cells[x + 1];
          if(!square.dataset.bottom) {
            totalOptions += 1;
            var node = square.querySelector(".bottomRight");
            node.func = View.genEndLine(x, y, "bottomRight");
            node.addEventListener("click", node.func);
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
  endLine: function(event, x, y, startFrom) {
    var clickedElement = event.target;
    var parent = clickedElement.parentNode;
    var x2 = parent.cellIndex;
    var y2 = parent.parentNode.rowIndex;
    View.resetEventListeners();
    if(x == x2 && y == y2) {
      //same square
      switch (clickedElement.className) {
        case "topLeft":
          switch (startFrom) {
            case "topRight":
            //top
            Controller.setLineMarked(x, y, "top");
            break;
            case "bottomLeft":
            //left
            Controller.setLineMarked(x, y, "left");
            break;
          }
        break;
        case "topRight":
          switch (startFrom) {
            case "topLeft":
            //top
            Controller.setLineMarked(x, y, "top");
            break;
            case "bottomRight":
            //right
            Controller.setLineMarked(x, y, "right");
            break;
          };
          break;
        case "bottomLeft":
          switch (startFrom) {
            case "bottomRight":
            //bottom
            Controller.setLineMarked(x, y, "bottom");
            break;
            case "topLeft":
            //left
            Controller.setLineMarked(x, y, "left");
            break;
          }
          break;
        case "bottomRight":
          switch (startFrom) {
            case "bottomLeft":
            //bottom
            Controller.setLineMarked(x, y, "bottom");
            break;
            case "topRight":
            //right
            Controller.setLineMarked(x, y, "right");
            break;
          }
          break;
      }
    } else {
      //different square
      switch (clickedElement.className) {
        case "topLeft":
          if(Math.abs(x2 - x) != 0) {
            Controller.setLineMarked(x2, y2, "top");
          } else if(Math.abs(y2 - y) != 0) {
            Controller.setLineMarked(x2, y2, "left");
          }
        break;
        case "topRight":
          Controller.setLineMarked(x2, y2, "right");
        break;
        case "bottomLeft":
          Controller.setLineMarked(x2, y2, "bottom");
        break;
      }
    }
  },
  resetEventListeners: function() {
    var divs = document.querySelectorAll(".endLine");
    for(var i = 0; i < divs.length; i++) {
      var div = divs[i];
      div.removeEventListener("click", div.func);
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
