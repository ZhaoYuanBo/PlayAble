import MainUI=ui.main.MainUI;
import BagUI=ui.main.BagUI;
import RankUI=ui.main.RankUI;
import GameUI=ui.game.GameUI;
import GameOverUI=ui.game.GameOverUI;
import LoadingUI=ui.LoadingUI;
import BagItemUI=ui.main.BagItemUI;

import BirdUI=ui.game.BirdUI;
import SeesawUI=ui.game.SeesawUI;
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

    //小游戏
    public static bird:UIType=new UIType("bird",BirdWin);
    public static seesaw:UIType=new UIType("seesaw",SeesawWin);
}