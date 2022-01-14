import MainUI=ui.main.MainUI;
import FrameUI=ui.main.FrameUI;
import EffectUI=ui.main.EffectUI;
import SkillUI=ui.main.SkillUI;
import SpineUI=ui.main.SpineUI;
import MonsterUI=ui.main.MonsterUI;
import LoadingUI=ui.LoadingUI;

import EffectItemUI=ui.main.EffectItemUI;
import FrameItemUI=ui.main.FrameItemUI;
import SkillItemUI=ui.main.SkillItemUI;
import MonsterItemUI=ui.main.MonsterItemUI;
/*
* name;
*/
class CustomWindow{
    constructor(){

    }
    public static loading:UIType=new UIType("loading",LoadingWin);
    public static main:UIType=new UIType("main",MainWin);
    public static frame:UIType=new UIType("frame",FrameWin);
    public static effect:UIType=new UIType("effect",EffectWin);
    public static skill:UIType=new UIType("skill",SkillWin);
    public static spine:UIType=new UIType("spine",SpineWin);
    public static monster:UIType=new UIType("monster",MonsterWin);
}