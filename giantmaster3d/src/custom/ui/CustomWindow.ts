import LoadingUI from "../../script/LoadingUI";
import GameUI from "../../script/GameUI";
import DownloadUI from "../../script/DownloadUI";
import GameTouchView from "./GameTouchView";
import FailUI from "../../script/failUI";

/*
* name;
*/
export class CustomWindow{
    constructor(){

    }
    public static loading:UIType=new UIType("loading",LoadingUI);
    //public static main:UIType=new UIType("main",MainWin);
    // public static bag:UIType=new UIType("bag",BagWin);
    // public static rank:UIType=new UIType("rank",RankWin);
    public static game:UIType=new UIType("game",GameUI);
    // public static gameOver:UIType=new UIType("gameOver",GameOverWin);
    public static gameTouch:UIType = new UIType("gametouch",GameTouchView);
    public static download:UIType=new UIType("download",DownloadUI);

    public static fail:UIType = new UIType("fail",FailUI);
}