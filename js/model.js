var Model = {
  players: [], //[Player]
  curPlayer: null,
  squares: [], //[[Square]]
  colors: ["red", "blue", "green", "purple", "orange"],
  init: function(names, width, height) {
    Model.initPlayers(names);
    Model.initGrid(width, height);
  },
  initPlayers: function(names) {
    Model.players = names.map(function(name, i){
      return new Model.Player(name, Model.colors[i]);
    });
  },
  //width and height are in squares
  initGrid: function(width, height) {
    var top, left, bottom, right = null;
    for(var i = 0; i < width; i++) {
      for(var j = 0; j < height; j++) {
        top = left = bottom = right = null;
        if(j > 0) {
          top = Model.squares[i][j-1].bottom;
        }
        if(!top) {
          top = new Model.Line(false);
        }
        if(i > 0) {
          left = Model.squares[i-1][j].right;
        }
        if(!left) {
          left = new Model.Line(false);
        }
        bottom = new Model.Line(false);
        right = new Model.Line(false);
        if(typeof Model.squares[i] == "undefined") {
          Model.squares[i] = [];
        }
        Model.squares[i][j] = new Model.Square(top, right, bottom, left, null);
      }
    }
  },
  //                     ("top"     ,     {x: , y: })
  //                     ({x: , y: },     "right"   )
  //                     ({x: , y: },     {x: , y: })
  //TODO: check if square is done after marking the line
  setLineMarked: function(squareOnePoint, squareTwoPoint) {
    if(squareOnePoint == "top" || squareOnePoint == "left") {
      Model.squares[squareTwoPoint.x][squareTwoPoint.y][squareOnePoint].selected = true;
    } else if(squareTwoPoint == "right" || squareTwoPoint == "bottom") {
      Model.squares[squareOnePoint.x][squareOnePoint.y][squareTwoPoint].selected = true;
    } else if(squareOnePoint.x == squareTwoPoint.x && Math.abs(squareOnePoint.y-squareTwoPoint.y) == 1) {
      var x = squareOnePoint.x;
      var y = Math.min(squareOnePoint.y, squareTwoPoint.y);
      Model.squares[x][y].bottom.selected = true;
    } else if(squareOnePoint.y == squareTwoPoint.y && Math.abs(squareOnePoint.x-squareTwoPoint.x) == 1) {
      var y = squareOnePoint.y;
      var x = Math.min(squareOnePoint.x, squareTwoPoint.x);
      Model.squares[x][y].right.selected = true;
    }
  },
  getMarkedLines: function() {
    var linesArr = Model.squares.map(function(arr, j) {
      return arr.map(function(square, i) {
        var lines = [];
        if(square.left.selected) {
          lines.push({x: i, y: j, wall: "left"});
        }
        if(square.right.selected) {
          lines.push({x: i, y: j, wall: "right"});
        }
        if(square.top.selected) {
          lines.push({x: i, y: j, wall: "top"});
        }
        if(square.bottom.selected) {
          lines.push({x: i, y: j, wall: "bottom"});
        }
        return lines;
      });
    });
    return [].concat.apply([], linesArr).filter(function(arr){return arr.length > 0}); //flatten the multi dimensional array
  },
  getCompletedSquares: function() {
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
