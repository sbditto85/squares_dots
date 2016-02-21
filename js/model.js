var Model = {
  players: [], //[Player]
  squares: [], //[[Square]]
  init: function(names, width, height) {
    Model.initPlayers(names);
    Model.initGrid(width, height);
  },
  initPlayers: function(names) {
    Model.players = names.map(function(name){
      return new Model.Player(name);
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
  Player: function(name) {
    this.name = name;
    this.squares = []; // [[x,y]]
  }
};
