var MainUI = ui.main.MainUI;
var BagUI = ui.main.BagUI;
var RankUI = ui.main.RankUI;
var GameUI = ui.game.GameUI;
var GameOverUI = ui.game.GameOverUI;
var LoadingUI = ui.LoadingUI;
var BagItemUI = ui.main.BagItemUI;
/*
* name;
*/
var CustomWindow = /** @class */ (function () {
    function CustomWindow() {
    }
    CustomWindow.loading = new UIType("loading", LoadingWin);
    CustomWindow.main = new UIType("main", MainWin);
    CustomWindow.bag = new UIType("bag", BagWin);
    CustomWindow.rank = new UIType("rank", RankWin);
    CustomWindow.game = new UIType("game", GameWin);
    CustomWindow.gameOver = new UIType("gameOver", GameOverWin);
    return CustomWindow;
}());
