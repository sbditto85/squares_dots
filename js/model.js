var Model = {
  players: [], //[Player]
  curPlayer: null,
  squares: [], //[[Square]]
  colors: ["purple", "grey", "blue", "red", "orange", "yellow"],
  init: function(names, width, height) {
    Model.initPlayers(names);
    Model.initGrid(width, height);
    Model.curPlayer = 0; //start with player 0
  },
  initPlayers: function(names) {
    //Imperative version
    for(var i = 0; i < names.length; i++) {
      Model.players[i] = new Model.Player(names[i], Model.colors[i]);
    }
    /* //FUNCATIONAL VERSION
    Model.players = names.map(function(name, i){
      return new Model.Player(name, Model.colors[i]);
    });
    */
  },
  // [{name: , color: , isTurn: , score: }]
  getPlayersInfo: function() {
    //Imperative version
    var arr = [];
    for(var i = 0; i < Model.players.length; i++) {
      var player = Model.players[i];
      arr.push(
        {
          name:  player.name,
          color: player.color,
          isTurn: i == Model.curPlayer,
          score: player.squares.length
        }
      );
    }
    return arr;
    /* //FUNCTIONAL version
    return Model.players.map(function(player, i) {
      return {
        name: player.name,
        color: player.color,
        isTurn: i == Model.curPlayer,
        score: player.squares.length
      }
    });
    */
  },
  //width and height are in squares
  initGrid: function(width, height) {
    var top, left, bottom, right = null;
    for(var j = 0; j < height; j++) {
      for(var i = 0; i < width; i++) {
        top = left = bottom = right = null;
        if(j > 0) {
          top = Model.squares[j-1][i].bottom;
        }
        if(!top) {
          top = new Model.Line(false);
        }
        if(i > 0) {
          left = Model.squares[j][i-1].right;
        }
        if(!left) {
          left = new Model.Line(false);
        }
        bottom = new Model.Line(false);
        right = new Model.Line(false);
        if(typeof Model.squares[j] == "undefined") {
          Model.squares[j] = [];
        }
        Model.squares[j][i] = new Model.Square(top, right, bottom, left, null);
      }
    }
  },
  setLineMarked: function(x, y, side) {
    Model.squares[y][x][side].selected = true;
    Model.squares[y][x].checkFinished(Model.players[Model.curPlayer]);
  },
  nextPlayer: function() {
    Model.curPlayer += 1;
    if(Model.curPlayer == Model.players.length) {
      Model.curPlayer = 0;
    }
  },
  getMarkedLines: function() {
    //Imperative version
    var arr = [];
    for(var j = 0; j < Model.squares.length; j++) {
      for(var i = 0; i < Model.squares[j].length; i++) {
        var square = Model.squares[j][i];
        if(square.left.selected) {
          arr.push({x: i, y: j, side: "left"});
        }
        if(square.right.selected) {
          arr.push({x: i, y: j, side: "right"});
        }
        if(square.top.selected) {
          arr.push({x: i, y: j, side: "top"});
        }
        if(square.bottom.selected) {
          arr.push({x: i, y: j, side: "bottom"});
        }
      }
    }
    return arr;
    /* FUNCTIONAL VERSION
    var linesArr = Model.squares.map(function(arr, j) {
      return arr.map(function(square, i) {
        var lines = [];
        if(square.left.selected) {
          lines.push({x: i, y: j, side: "left"});
        }
        if(square.right.selected) {
          lines.push({x: i, y: j, side: "right"});
        }
        if(square.top.selected) {
          lines.push({x: i, y: j, side: "top"});
        }
        if(square.bottom.selected) {
          lines.push({x: i, y: j, side: "bottom"});
        }
        return lines;
      });
    });
    var twoD = [].concat.apply([], linesArr).filter(function(arr){return arr.length > 0}); //flatten the multi dimensional array
    return [].concat.apply([], twoD);
    */
  },
  getCompletedSquares: function() {
    //Imperative version
    var arr = [];
    for(var j = 0; j < Model.squares.length; j++) {
      for(var i = 0; i < Model.squares[j].length; i++) {
        var square = Model.squares[j][i];
        if(square.left.selected
        && square.right.selected
        && square.top.selected
        && square.bottom.selected
        && square.owner) {
          arr.push({x: i, y: j, color: square.owner.color});
        }
      }
    }
    return arr;
    /* //FUNCTIONAL STYLE
    var squaresArr = Model.squares.map(function(arr, j) {
      return arr.map(function(square, i) {
        if(square.left.selected
        && square.right.selected
        && square.top.selected
        && square.bottom.selected
        && square.owner) {
          return {x: i, y: j, color: square.owner.color};
        }
      });
    });
    return [].concat.apply([], squaresArr).filter(function(square){return square;}); //flatten the multi dimensional array
    */
  },
  Line: function(selected) {
    this.selected = selected;
  },
  Square: function(top, right, bottom, left, owner) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.owner = owner; //null means not set
  },
  Player: function(name, color) {
    this.name = name;
    this.color = color;
    this.squares = []; // [[x,y]]
  }
};

Model.Square.prototype.checkFinished = function(player) {
  if(this.top.selected
  && this.right.selected
  && this.bottom.selected
  && this.left.selected
  && player) {
    this.owner = player;
    player.squares.push(this);
  }
};
