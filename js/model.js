var Model = {
  squares: [], //[[Square]]
  dots: [], //[[Dot]]
  //width and height are in squares
  initGrid: function(width, height) {
    //x and y are in "dot cordinates"
    var x = 0;
    var y = 0;
    var topLeft = new Model.Dot(x, y);
    dots[x][y] = topLeft;
    var bottomLeft = new Model.Dot(x, y+1);
    dots[x][y+1] = bottomLeft;
    var topRight = new Model.Dot(x+1, y);
    dots[x+1][y] = topRight;
    var bottomRight = new Model.Dot(x+1, y+1);
    dots[x+1][y+1] = bottomRight;
    var square = new Model.Square(topLeft, topRight, bottomLeft, bottomRight, null);
    square[0][0] = square;
    topLeft.setSquare(square);
    topRight.setSquare(square);
    bottomLeft.setSquare(square);
    bottomRight.setSquare(square);
  },
  Dot: function(x, y) {
    this.x;
    this.y;
    this.square = null;
  },
  Square: function(topLeft, topRight, bottomLeft, bottomRight, owner) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
    this.owner = owner; //null is not owned yet
  }
};

Model.Dot.prototype.setSquare(square) {
  this.square = square;
};
