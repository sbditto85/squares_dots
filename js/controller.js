var Controller = {
  init: function() {
    Model.init(["Player 1", "Player 2"], 3, 3);
    View.init(3,3);
    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
  }
};

window.onload = Controller.init;
