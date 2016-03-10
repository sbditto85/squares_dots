var Controller = {
  init: function() {
    var width = 5;
    var height = 5;
    Model.init(["Player 1", "Player 2"], width, height);
    View.init(width, height, Model.getPlayersInfo());
    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
    View.addEvents();
  },
  setLineMarked: function(x, y, side) {
    Model.setLineMarked(x, y, side);
    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
    View.updatePlayers(Model.getPlayersInfo());
    View.addEvents();
  }
};

window.onload = Controller.init;
