var Controller = {
  init: function() {
    var width = 5;
    var height = 5;
    Model.init(["Player 1", "Player 2"], width, height);
    View.init(width, height, Model.getPlayersInfo());
    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
    View.addEvents();
    Controller.assignment4();
  },
  setLineMarked: function(x, y, side) {
    Model.setLineMarked(x, y, side);
    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
    View.updatePlayers(Model.getPlayersInfo());
    View.addEvents();
  },
  assignment4: function() {
    var table = document.getElementById("game_table");
    var cells = table.getElementsByTagName("td");
    for(var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.onclick = function(event) {
        var x = event.target.cellIndex;
        var y = event.target.parentNode.rowIndex;
        var hasSpans = this.getElementsByTagName("span");
        if(!hasSpans.length) {
          var span = document.createElement("span");
          span.innerHTML = "C";
          span.id = "C";
          span.style.backgroundColor = "pink";
          this.appendChild(span);
        }
        document.getElementById("debug").innerHTML = "Coordinate: (" + x + ", " + y + ")";
      };
    }
    var input = document.getElementById("text");
    input.oninput = function(event) {
      document.getElementById("debug").innerHTML = input.value;
    };
    var select = document.getElementById("select");
    select.onchange = function(event) {
      document.getElementById("debug").innerHTML = select.value;
    };
    var button = document.getElementById("button");
    button.onclick = function(event) {
      document.getElementById("debug").innerHTML = "RESET";
    };

    var animateWrapper = document.createElement("div");
    animateWrapper.id = "animate_wrapper";
    animateWrapper.style.position = "relative";
    animateWrapper.style.top = 0;
    animateWrapper.style.left = 0;
    animateWrapper.style.width = "500px";
    animateWrapper.style.height = "500px";
    animateWrapper.style.border = "2px solid black";
    animateWrapper.innerHTML = "<h1> Animation </h1>";

    document.getElementsByTagName("body")[0].appendChild(animateWrapper);

    var animateMe = document.createElement("div");
    animateMe.id = "animate_me";
    animateMe.style.position = "absolute";
    animateMe.style.bottom = 0;
    animateMe.style.left = 0;
    animateMe.style.width = "10px";
    animateMe.style.height = "10px";
    animateMe.style.backgroundColor = "red";

    animateWrapper.appendChild(animateMe);

    var bottom = 0;
    var left = 0;
    var up = true;
    var nextStep = function() {
      animateMe.style.bottom = bottom + "px";
      animateMe.style.left = left + "px";

      if(up && bottom < 250) {
        bottom += 10;
      } else {
        if(up) {
          left -= 10;
        }
        up = false;
        bottom -= 10;
      }
      left += 10;
      if(left < 500) {
        setTimeout(nextStep, 100);
      }
    };
    setTimeout(nextStep, 100);
  }
};

window.onload = Controller.init;
