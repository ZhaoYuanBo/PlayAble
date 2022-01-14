var MainUI = ui.main.MainUI;
var FrameUI = ui.main.FrameUI;
var EffectUI = ui.main.EffectUI;
var SkillUI = ui.main.SkillUI;
var SpineUI = ui.main.SpineUI;
var MonsterUI = ui.main.MonsterUI;
var LoadingUI = ui.LoadingUI;
var EffectItemUI = ui.main.EffectItemUI;
var FrameItemUI = ui.main.FrameItemUI;
var SkillItemUI = ui.main.SkillItemUI;
var MonsterItemUI = ui.main.MonsterItemUI;
/*
* name;
*/
var CustomWindow = /** @class */ (function () {
    function CustomWindow() {
    }
    CustomWindow.loading = new UIType("loading", LoadingWin);
    CustomWindow.main = new UIType("main", MainWin);
    CustomWindow.frame = new UIType("frame", FrameWin);
    CustomWindow.effect = new UIType("effect", EffectWin);
    CustomWindow.skill = new UIType("skill", SkillWin);
    CustomWindow.spine = new UIType("spine", SpineWin);
    CustomWindow.monster = new UIType("monster", MonsterWin);
    return CustomWindow;
}());
