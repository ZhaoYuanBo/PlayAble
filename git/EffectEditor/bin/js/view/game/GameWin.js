var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
2019-04-24 andy
* 游戏界面
*/
var GameWin = /** @class */ (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super.call(this, GameUI) || this;
        /**是否处于测试状态 */
        _this.isTest = true;
        /**是否处于准备状态 */
        _this.isReady = true;
        /**是否处于可抓获状态 */
        _this.isCanCatch = true;
        /**是否处于抓获状态 */
        _this.isCatch = false;
        /**是否处于移动状态 */
        _this.isMove = false;
        /**是否引导过 */
        _this.isGuide = false;
        /**现在安装 */
        _this.isDownload = false;
        /**当前等级 */
        _this.curLevel = 0;
        _this.curFrame = 0;
        return _this;
    }
    GameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        GameCtrl.ins.initGameLang(this.ui);
        EventManager.ins.on(NoticeEvent.GAME_GOLD_UPDATE, this, this.GAME_GOLD_UPDATE);
        EventManager.ins.on(NoticeEvent.GAME_OVER, this, this.GAME_OVER);
        EventManager.ins.on(NoticeEvent.GAME_WARNING, this, this.GAME_WARNING);
        EventManager.ins.on(NoticeEvent.SYS_FOCUS, this, this.SYS_FOCUS);
        this.ui.mouseThrough = true;
        this.ui.spLeftUp.mouseThrough = true;
        this.ui.spLeftDown.mouseThrough = true;
        this.ui.spRightUp.mouseThrough = true;
        this.ui.spRightDown.mouseThrough = true;
        this.scene = LayerManager.ins.getLayer(LayerName.scene);
    };
    GameWin.prototype.open = function () {
        _super.prototype.open.call(this);
        Laya.timer.frameLoop(1, this, this.update);
        this.ui.stage.on(Laya.Event.CLICK, this, this.stageClick);
        //this.ui.stage.on(Laya.Event.MOUSE_DOWN,this,this.MOUSE_DOWN);
        GameCtrl.ins.gameUI = this.ui;
        GameCtrl.ins.gameWin = this;
        this.ui.barHp.value = 1;
        this.ui.uiBg.visible = false;
        this.ui.imgStar.visible = false;
        this.ui.barBossHp.visible = false;
        this.ui.imgGuide.visible = false;
        this.ui.imgGuide.x = this.ui.btnStart.x - 30;
        this.ui.imgGuide.y = this.ui.btnStart.y;
        this.ui.imgDanger.visible = false;
        this.ui.btnSkill.visible = false;
        var tt = new TweenTarget(CustomDefine.animGuide, this.ui.imgGuide, TweenManager.ins.creatProp(TweenPropType.SMALL_BIG, [0.2, 1, 300, 600]), 100);
        TweenManager.ins.regTween(tt);
        TweenManager.ins.play(true, CustomDefine.animGuide);
        tt = new TweenTarget(CustomDefine.animDanger, this.ui.imgDanger, TweenManager.ins.creatProp(TweenPropType.LIGHT_STAR, [800, 0.2, 0.8]), 0);
        TweenManager.ins.regTween(tt);
        //修正进入游戏时，背景图一闪留白情况
        var sp = new Sprite();
        sp.graphics.drawRect(0, 0, Define.DeviceW, Define.DeviceH, "#ffffff");
        LayerManager.ins.addChild(sp, LayerName.top);
        Laya.timer.once(600, this, function () { sp.removeSelf(); });
        this.createBackground();
        this.initData();
        RockerManager.ins.init(this.ui.imgRocker, this.ui.imgRockerBg, 300);
        RockerManager.ins.mouseSpeed = 5;
        this.ui.btnFire.on(Laya.Event.MOUSE_DOWN, this, function (evt) {
            evt.stopPropagation();
            //TweenManager.ins.stop(CustomDefine.animGuide);
            GameCtrl.ins.isFire = true;
        });
        this.ui.btnFire.on(Laya.Event.MOUSE_UP, this, function (evt) {
            evt.stopPropagation();
            //TweenManager.ins.stop(CustomDefine.animGuide);
            GameCtrl.ins.isFire = false;
        });
        GameCtrl.ins.task();
    };
    GameWin.prototype.viewClick = function (sp) {
        var _this = this;
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnDownload":
                this.isDownload = true;
                //2019-05-01 跳到下载页面，并未下载，直接返回，这时还能继续游戏
                Laya.timer.once(2000, this, function () {
                    _this.isDownload = false;
                });
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
                break;
            case "btnStart":
                GameCtrl.ins.setGuideWord("");
                TweenManager.ins.stop(CustomDefine.animGuide);
                GameCtrl.ins.task();
                this.ui.btnStart.visible = false;
                this.ui.imgStartPlayer.visible = false;
                this.ui.uiBg.visible = true;
                GameCtrl.ins.self.visible = true;
                GameCtrl.ins.isGame = true;
                GameCtrl.ins.startGameEffect();
                //创建敌人
                GameCtrl.ins.showEnemy(GameModel.ins.enemyCount);
                break;
            case "btnSkill":
                GameCtrl.ins.task();
                this.skill();
                break;
            default:
                break;
        }
    };
    //点击场景
    GameWin.prototype.stageClick = function () {
        if (!this.isOpen) {
            return;
        }
        if (this.isDownload) {
            //this.isDownload=false;
            return;
        }
        if (this.isReady) {
            // this.isReady=false;
            // this.ui.imgStartPlayer.visible=false;
        }
        else {
        }
    };
    GameWin.prototype.fire = function () {
        if (!GameCtrl.ins.isGame) {
            return;
        }
        if (GameModel.ins.bulletCount < 1) {
            return;
        }
        SoundManager.ins.playSound(CustomBase64.sound_shot);
        var skillConfig = SkillManager.ins.getCfg(UserSelfModel.ins.skillId);
        var skillData = new SkillData(skillConfig, GameCtrl.ins.self, GameCtrl.ins.self.atkTarget);
        var skill = SkillManager.ins.getSkill(skillData);
        skill.sendSpeed = 50;
        skill.play();
        if (UserSelfModel.ins.skillId == 101 && GameModel.ins.enemyDeadCount + 1 < GameModel.ins.enemyCount) {
            if (GameModel.ins.bulletCount % 7 == 0) {
                GameCtrl.ins.playShake();
            }
        }
        GameModel.ins.bulletCount--;
        this.showBulletCount();
    };
    GameWin.prototype.skill = function () {
        var skillConfig = SkillManager.ins.getCfg(200);
        var skillData = new SkillData(skillConfig, GameCtrl.ins.self, GameCtrl.ins.self.atkTarget);
        var skill = SkillManager.ins.getSkill(skillData);
        skill.sendSpeed = 50;
        skill.atkEft.scaleX = skill.atkEft.scaleY = 3;
        skill.play();
    };
    GameWin.prototype.showBulletCount = function () {
        if (GameModel.ins.bulletCount < 0)
            GameModel.ins.bulletCount = 0;
        this.ui.txtBullet.text = GameModel.ins.bulletCount + "/" + GameModel.ins.bulletCountMax;
    };
    //鼠标按下场景
    GameWin.prototype.MOUSE_DOWN = function (me) {
        // if(this.isCanCatch){
        //     this.ui.stage.on(Laya.Event.MOUSE_MOVE,this,this.MOUSE_MOVE);
        //     this.ui.stage.on(Laya.Event.MOUSE_UP,this,this.MOUSE_UP);
        //     this.isCatch=true;
        // }
    };
    //鼠标按下移动场景
    GameWin.prototype.MOUSE_MOVE = function (me) {
        // if(this.isCanCatch){
        //    this.fishHook.x= me.stageX;
        // }
    };
    //鼠标弹起场景
    GameWin.prototype.MOUSE_UP = function () {
        // this.ui.stage.off(Laya.Event.MOUSE_MOVE,this,this.MOUSE_MOVE);
        // this.ui.stage.off(Laya.Event.MOUSE_UP,this,this.MOUSE_UP);
        // this.isCatch=false;      
    };
    //创建场景背景图
    GameWin.prototype.createBackground = function () {
        SceneManager.ins.setBackground(CustomBase64.bg_game);
    };
    GameWin.prototype.initData = function () {
        GameModel.ins.gold = 0;
        this.showBulletCount();
        UserSelfModel.ins.init();
        GameCtrl.ins.init();
        GameCtrl.ins.initMap();
    };
    /**
     * 动力驱动
     */
    GameWin.prototype.update = function () {
        this.curFrame++;
        if (GameCtrl.ins.isGame) {
            GameCtrl.ins.self.update();
            var kings = KingManager.ins.kings;
            for (var i = 0; i < kings.length; i++) {
                var king = kings[i];
                king.update();
            }
            //GameCtrl.ins.checkLight();
        }
        if (GameCtrl.ins.isFire && SkillManager.ins.isCanPlaySkill(GameCtrl.ins.self, UserSelfModel.ins.skillId)) {
            this.fire();
        }
    };
    GameWin.prototype.upShow = function () {
        this.curLevel++;
    };
    GameWin.prototype.EVENT_LIGHT = function (event) {
        var data = event.data;
    };
    GameWin.prototype.GAME_GOLD_UPDATE = function (event) {
        var gold = event.data;
        this.ui.txtGold.text = " " + GameModel.ins.gold;
        Laya.Tween.from(this.ui.txtGold, { scaleX: 1.4, scaleY: 1.4 }, 100);
    };
    GameWin.prototype.GAME_OVER = function (event) {
        GameCtrl.ins.isGame = false;
        GameCtrl.ins.isWarning = false;
        TweenManager.ins.stop(CustomDefine.animDanger);
        if (GameCtrl.ins.self.hp == 0) {
            this.scene.filters = [PubUtil.getGrayFilter()];
        }
        Laya.timer.once(1500, this, function () {
            UIManager.ins.openWindow(CustomWindow.gameDownload);
        });
        Laya.timer.clear(this, this.update);
        this.ui.stage.off(Laya.Event.CLICK, this, this.stageClick);
        this.ui.stage.off(Laya.Event.MOUSE_DOWN, this, this.MOUSE_DOWN);
        PlatformManager.ins.actionCallBack(PlatformAction.GameEnd);
    };
    GameWin.prototype.GAME_WARNING = function (event) {
        var gold = event.data;
        if (!GameCtrl.ins.isWarning) {
            GameCtrl.ins.isWarning = true;
            TweenManager.ins.play(true, CustomDefine.animDanger);
        }
    };
    GameWin.prototype.GAME_NEXT = function (event) {
        // this.clear();
        // GameModel.ins.gameNext();
        // this.randFish(); 
    };
    GameWin.prototype.startGameAgin = function (event) {
    };
    GameWin.prototype.SYS_FOCUS = function (e) {
        this.isDownload = false;
        console.log("this.isDownload=false;");
    };
    GameWin.prototype.clear = function () {
        //this.catchCount=0;
        // for(let fish of this.arrKing){
        //     fish.visible=false;
        // } 
    };
    GameWin.prototype.close = function () {
        Laya.timer.clearAll(this);
        this.ui.off(Laya.Event.CLICK, this, this.stageClick);
        this.clear();
    };
    return GameWin;
}(BaseWindow));
