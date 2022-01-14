import MainUI=ui.main.MainUI;
import BagUI=ui.main.BagUI;
import RankUI=ui.main.RankUI;
import GameUI=ui.game.GameUI;
import GameOverUI=ui.game.GameOverUI;
import LoadingUI=ui.LoadingUI;

import BagItemUI=ui.main.BagItemUI;
import GameDownloadUI=ui.game.GameDownloadUI;
/*
* name;
*/
class CustomWindow{
    constructor(){

    }
    public static loading:UIType=new UIType("loading",LoadingWin);
    public static main:UIType=new UIType("main",MainWin);
    public static bag:UIType=new UIType("bag",BagWin);
    public static rank:UIType=new UIType("rank",RankWin);
    public static game:UIType=new UIType("game",GameWin);
    public static gameOver:UIType=new UIType("gameOver",GameOverWin);

    public static gameDownload:UIType=new UIType("gameDownload",GameDownloadWin);
}