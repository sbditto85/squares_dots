var Controller = {
  init: function() {
    var width = 5;
    var height = 5;
    Model.init(["Player 1", "Player 2"], width, height);
    View.init(width, height, Model.getPlayersInfo());
    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
    View.addEvents();
    Controller.assignment3();
  },
  assignment3: function() {
    Model.setLineMarked(2,2,"right");
    Model.nextPlayer();
    Model.setLineMarked(2,2,"left");
    Model.nextPlayer();
    Model.setLineMarked(2,2,"top");
    Model.nextPlayer();

    Model.setLineMarked(0,0,"right");
    Model.nextPlayer();
    Model.setLineMarked(2,2,"bottom");
    Model.nextPlayer();
    Model.setLineMarked(0,0,"left");
    Model.nextPlayer();
    Model.setLineMarked(0,0,"top");
    Model.nextPlayer();
    Model.setLineMarked(0,0,"bottom");
    Model.nextPlayer();

    Model.setLineMarked(1,2,"right");
    Model.nextPlayer();
    Model.setLineMarked(1,1,"left");
    Model.nextPlayer();
    Model.setLineMarked(2,1,"top");
    Model.nextPlayer();
    Model.setLineMarked(0,2,"bottom");
    Model.nextPlayer();
    Model.setLineMarked(2,1,"left");
    Model.nextPlayer();
    Model.setLineMarked(2,1,"right");
    Model.nextPlayer();
    Model.setLineMarked(1,1,"top");
    Model.nextPlayer();

    View.updateLines(Model.getMarkedLines());
    View.updateSquares(Model.getCompletedSquares());
    View.updatePlayers(Model.getPlayersInfo());
    View.addEvents();
  }
};

window.onload = Controller.init;
