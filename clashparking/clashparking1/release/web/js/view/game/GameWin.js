var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 游戏界面
*/
var GameWin = /** @class */ (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super.call(this, GameUI) || this;
        /**关卡进度 */
        _this.levelIndex = 0;
        /**简单引导一下 */
        _this.isGuide = false;
        /**是否结束 */
        _this.isEnd = false;
        /**是否开始 */
        _this.isStart = false;
        /**是否处于下载状态 */
        _this.isDownload = false;
        _this.m_nDifX = 0;
        _this.m_nDifY = 0;
        _this.vlines = [];
        _this.isMove = false;
        _this.nextPoint = new Laya.Point();
        _this.bulletSpeed = 15;
        _this.moveStart = false;
        _this.moveEnd = false;
        _this.enemyHp = 1000;
        /**小格子集合 */
        _this.vBoxs = [];
        _this.tmpClickBox = null;
        /**引导 */
        _this.curGuideStep = 0;
        _this.timerDely = 1500;
        _this.isClickRight = false;
        _this.isUpReadArea = false;
        _this.lineIndex = 0;
        _this.isHitEnemy = false;
        _this.enemyIsDie = false; //僵尸是否已经死亡了
        _this.lOrR = 1; //正右，负值为左边
        _this.isNextLine = false;
        _this.maxID = 0;
        _this.rOl = 1;
        return _this;
    }
    // player:self
    GameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        GameCtrl.ins.initGameLang(this.ui);
        EventManager.ins.on(CustomDefine.EVENT_UPDATE_SCORE, this, this.updateScore);
        EventManager.ins.on(CustomDefine.EVENT_GUN_EFFECT, this, function () {
        });
        // EventManager.ins.on(CustomDefine.EVENT_GAME_NEXT,this,this.gameNext);
        EventManager.ins.on(CustomDefine.EVENT_GAME_OVER, this, this.gameEnd);
        EventManager.ins.on(CustomDefine.EVENT_START_GAME_AGIN, this, this.startGameAgin);
        EventManager.ins.on(CustomDefine.EVENT_GAME_NEXT, this, this.NextLevel); //下一关
        EventManager.ins.on(CustomDefine.EVENT_REGISTER_RESET, this, this.continumGuide); //监听重置
        EventManager.ins.on(NoticeEvent.SYS_FOCUS, this, this.SYS_FOCUS);
        /**监听事件 */
        this.ui.stage.on(Laya.Event.MOUSE_DOWN, this, this.__mouseDown);
    };
    GameWin.prototype.open = function () {
        Laya.timer.frameLoop(1, this, this.update);
        this.ui.stage.on(Laya.Event.CLICK, this, this.stageClick);
        var tt = new TweenTarget(CustomDefine.animGuide, this.ui.guide3, TweenManager.ins.creatProp(TweenPropType.SMALL_BIG, [0.2, 1, 425, 671]), 100);
        tt.play();
        this.ui.guide3.visible = false;
        //修正进入游戏时，背景图一闪留白情况
        // let sp: Sprite = new Sprite();
        // sp.graphics.drawRect(0, 0, Define.DeviceW, Define.DeviceH, "#000000");
        // LayerManager.ins.addChild(sp, LayerName.top);
        // Laya.timer.once(700, this, () => { sp.removeSelf(); });
        this.createBackground();
        // this.testLayaBox();
        this.ui.btnDownload.on(Laya.Event.MOUSE_DOWN, this, function () {
            HttpManager.ins.link(Define.DOWNLOAD_URL);
        });
        this.touch1 = new MyTouchRect(0, 1080, 200, 200);
        this.touch2 = new MyTouchRect(555, 0, 160, 160);
        this.NextLevel();
    };
    //引导
    GameWin.prototype.startTips = function (step) {
        if (step == this.curGuideStep) {
            return;
        }
        switch (step) {
            case 1:
                GameCtrl.isStart = false;
                this.curGuideStep == 1;
                this.ui.tips.visible = true;
                this.ui.tips.skin = "game/tips1.png";
                Laya.timer.loop(550, this, this.tipsJump);
                this.moveHand(4, 5);
                break;
            case 2:
                GameCtrl.isStart = false;
                this.curGuideStep == 2;
                this.ui.tips.visible = true;
                this.ui.tips.skin = "game/tips2.png";
                Laya.timer.loop(550, this, this.tipsJump);
                this.moveHand(4, 6);
                break;
            case 3:
                GameCtrl.isStart = false;
                this.curGuideStep == 1;
                this.ui.tips.visible = true;
                this.ui.tips.skin = "game/tips3.png";
                Laya.timer.loop(550, this, this.tipsJump);
                this.moveHand(6, 3);
                break;
        }
    };
    //移动提示用的手
    GameWin.prototype.moveHand = function (start, end) {
        var _this = this;
        // UIManager.ins.addTop(this.ui.guide);
        LayerManager.ins.addChild(this.ui.guide, LayerName.top);
        var startPos = this.getPos(start);
        var endPos = this.getPos(end);
        this.ui.guide.alpha = 1;
        this.ui.guide.scale(0.5, 0.5);
        this.ui.guide.pos(startPos.x, startPos.y);
        this.playAnimaByTimes(this, 1000, 800, function () {
            Laya.Tween.to(_this.ui.guide, { x: endPos.x, y: endPos.y }, 1000, null, Laya.Handler.create(_this.ui.guide, function () {
                Laya.Tween.clearAll(_this.ui.guide);
                _this.ui.guide.pos(startPos.x, startPos.y);
                console.log("引导的位置");
            }));
        });
    };
    GameWin.prototype.continumGuide = function () {
        GameCtrl.isStart = true;
        this.ui.guide.alpha = 0;
        Laya.Tween.clearAll(this);
        Laya.Tween.clearAll(this.ui.guide);
    };
    // 根据0123获取相应的坐标
    GameWin.prototype.getPos = function (cityId) {
        var pos = { x: 0, y: 0 };
        switch (cityId) {
            case 3:
                pos.x = 362;
                pos.y = 325;
                break;
            case 4:
                pos.x = 368;
                pos.y = 729;
                break;
            case 5:
                pos.x = 141;
                pos.y = 529;
                break;
            case 6:
                pos.x = 575;
                pos.y = 518;
                break;
        }
        return pos;
    };
    // 提示字跳跃
    GameWin.prototype.tipsJump = function () {
        if (this.ui.tips.scaleX == 0.8) {
            Laya.Tween.to(this.ui.tips, { scaleX: 1, scaleY: 1 }, 500);
        }
        else if (this.ui.tips.scaleX == 1) {
            Laya.Tween.to(this.ui.tips, { scaleX: 0.8, scaleY: 0.8 }, 500);
        }
    };
    GameWin.prototype.__mouseDown = function (e) {
        var p = new Laya.Point(e.stageX, e.stageY);
        this.ui.globalToLocal(p);
        this.ui.stage.on(Laya.Event.MOUSE_MOVE, this, this.__mouseMove);
        for (var i = 0; i < this.vBoxs.length; i++) {
            if (this.vBoxs[i].pTouchRect.CheckTouch(p.x, p.y)) {
                switch (this.vBoxs[i].boxType) {
                    case fBoxType.defult:
                    case fBoxType.other:
                        this.isClickRight = false;
                        break;
                    default:
                        this.isClickRight = true;
                        this.vBoxs[i].checkThough = true;
                        break;
                }
                if (!this.isClickRight) {
                    console.error("点击错误id:" + this.vBoxs[i].id);
                    break;
                }
                this.tmpClickBox = this.vBoxs[i];
                console.log("点击箱子ID：" + this.tmpClickBox.id);
                if (this.vBoxs[i].isBinding) {
                    this.tmpClickBox = this.vBoxs[i];
                    if (this.tmpClickBox.id == 4 && this.tmpClickBox.isBinding) {
                        //引导临时
                    }
                    else {
                        this.tmpClickBox.isBinding = false;
                    }
                }
                else {
                    console.log("tmpbox生效");
                    // this.ui.guide.visible = false;
                    // GameCtrl.isStart = true;
                    this.vBoxs[i].isClick = true;
                    this.tmpClickBox = this.vBoxs[i];
                }
            }
        }
        if (this.isMove)
            return;
    };
    GameWin.prototype.__mouseMove = function (e) {
        var p = new Laya.Point(e.stageX, e.stageY);
        for (var i = 0; i < this.vBoxs.length; i++) {
            if (this.vBoxs[i].pTouchRect.CheckTouch(p.x, p.y)) {
                if (this.tmpClickBox)
                    this.vBoxs[i].checkThough = true;
            }
            else {
                if (this.tmpClickBox != this.vBoxs[i])
                    this.vBoxs[i].checkThough = false;
            }
        }
        if (this.tmpClickBox) {
            if (this.tmpClickBox.isBinding) {
                if (this.tmpClickBox.id == 4) { //临时
                    if (this.tmpClickBox.boxType != fBoxType.other)
                        // // this.ui.bg.addChild(this.tmpClickBox.line);
                        // this.ui.globalToLocal(new Laya.Point(this.tmpClickBox.line.x,this.tmpClickBox.line.y));
                        if (this.tmpClickBox.isBinding)
                            this.tmpClickBox.drawLine2(this.tmpClickBox.x, this.tmpClickBox.y, p.x, p.y);
                }
                else { //临时
                    this.tmpClickBox.isClick = true;
                    this.tmpClickBox.isBinding = false; //绑定后的点击
                    console.error(this.tmpClickBox.id + "二次点击射击失效");
                }
            }
            else {
                if (this.tmpClickBox.isClick) {
                    if (this.tmpClickBox.boxType != fBoxType.other)
                        // // this.ui.bg.addChild(this.tmpClickBox.line);
                        // this.ui.globalToLocal(new Laya.Point(this.tmpClickBox.line.x,this.tmpClickBox.line.y));
                        this.tmpClickBox.drawLine(this.tmpClickBox.x, this.tmpClickBox.y, p.x, p.y);
                }
            }
        }
        if (this.isMove)
            return;
        this.ui.stage.on(Laya.Event.MOUSE_UP, this, this.__mouseUp);
    };
    GameWin.prototype.__mouseUp = function (e) {
        var p = new Laya.Point(e.stageX, e.stageY);
        for (var i = 0; i < this.vBoxs.length; i++) {
            this.vBoxs[i].checkThough = false;
            if (this.tmpClickBox == null)
                continue;
            if (this.vBoxs[i].pTouchRect.CheckTouch(p.x, p.y)) {
                if (this.tmpClickBox.id == this.vBoxs[i].id) {
                    this.tmpClickBox.isClick = true;
                    this.tmpClickBox.isBinding = false; //绑定后的点击
                    // this.tmpClickBox = null;
                    console.log("点击的是自己");
                }
                else if (this.tmpClickBox.boxType == this.vBoxs[i].boxType) {
                    console.log("同类");
                }
                else {
                    //id4两次射击 临时
                    if (this.tmpClickBox.id == 4 && this.tmpClickBox.isBinding) { //临时
                        var ePos = new Laya.Point(this.vBoxs[i].x + this.vBoxs[i].boxImg.width / 2, this.vBoxs[i].y + this.vBoxs[i].boxImg.height / 2);
                        this.tmpClickBox.drawLine2(this.tmpClickBox.x, this.tmpClickBox.y, ePos.x, ePos.y);
                        this.ui.stage.off(Laya.Event.MOUSE_MOVE, this, this.__mouseMove);
                        console.log("已连接id:" + this.tmpClickBox.id + "  被连接id:" + this.vBoxs[i].id);
                        GameModel.ins.gameRegistReset();
                        this.tmpClickBox.isBinding2 = true;
                        this.tmpClickBox.targetBox2 = this.vBoxs[i];
                        this.tmpClickBox = null;
                        this.isUpReadArea = true;
                    }
                    else {
                        var ePos = new Laya.Point(this.vBoxs[i].x + this.vBoxs[i].boxImg.width / 2, this.vBoxs[i].y + this.vBoxs[i].boxImg.height / 2);
                        this.tmpClickBox.drawLine(this.tmpClickBox.x, this.tmpClickBox.y, ePos.x, ePos.y);
                        this.ui.stage.off(Laya.Event.MOUSE_MOVE, this, this.__mouseMove);
                        console.log("已连接id:" + this.tmpClickBox.id + "  被连接id:" + this.vBoxs[i].id);
                        GameModel.ins.gameRegistReset();
                        this.tmpClickBox.isBinding = true;
                        this.tmpClickBox.targetBox = this.vBoxs[i];
                        this.tmpClickBox = null;
                        this.isUpReadArea = true;
                    }
                }
            }
            else {
                this.isUpReadArea = false; //抬起没有到可监控范围
            }
        }
        if (this.isUpReadArea == false) {
            if (this.tmpClickBox)
                if (this.tmpClickBox.isBinding == false) {
                    this.tmpClickBox.lineImg.visible = false;
                    this.tmpClickBox.isClick = false;
                    this.tmpClickBox = null;
                }
        }
        this.tmpClickBox = null;
        this.ui.stage.off(Laya.Event.MOUSE_UP, this, this.__mouseUp);
    };
    /**开始第一关 */
    GameWin.prototype.StartaLevel = function () {
        var box1 = new FBox(1);
        box1.init(1, fBoxType.mine);
        box1.pos(272, 607);
        box1.setTouchRect(272, 607, box1.boxImg.width, box1.boxImg.height);
        this.vBoxs.push(box1);
        // UIManager.ins.addTop(box1);
        LayerManager.ins.addChild(box1, LayerName.ui_effect);
        var box2 = new FBox(2); //id 2 用来执行下一关
        box2.init(2, fBoxType.defult);
        box2.pos(272, 270);
        box2.setTouchRect(272, 270, box2.boxImg.width, box2.boxImg.height);
        this.vBoxs.push(box2);
        // UIManager.ins.addTop(box2);
        LayerManager.ins.addChild(box2, LayerName.ui_effect);
    };
    /**进入下一关 */
    GameWin.prototype.NextLevel = function () {
        this.startTips(1);
        LayerManager.ins.addChild(this.ui.spr, LayerName.main);
        console.error("进入下一关");
        for (var i = 0; i < this.vBoxs.length; i++) {
            this.vBoxs[i].disappear();
            // this.vBoxs[i].line.removeSelf();
            // this.vBoxs[i].removeSelf();
        }
        this.vBoxs.splice(0);
        //上l
        var box1 = new FBox(3);
        box1.pos(272, 260);
        box1.init(3, fBoxType.other);
        box1.setLineNum(2);
        box1.setTouchRect(272, 260, box1.boxImg.width, box1.boxImg.height);
        this.vBoxs.push(box1);
        LayerManager.ins.addChild(box1, LayerName.ui_effect);
        //下
        var box2 = new FBox(4);
        box2.pos(272, 647);
        box2.init(4, fBoxType.mine);
        box2.setLineNum(2);
        box2.setTouchRect(272, 647, box2.boxImg.width, box2.boxImg.height);
        this.vBoxs.push(box2);
        LayerManager.ins.addChild(box2, LayerName.ui_effect);
        //左
        var box3 = new FBox(5);
        box3.pos(56, 455);
        box3.init(5, fBoxType.defult);
        box3.setTouchRect(72, 420, box3.boxImg.width, box3.boxImg.height);
        this.vBoxs.push(box3);
        LayerManager.ins.addChild(box3, LayerName.ui_effect);
        //右
        var box4 = new FBox(6);
        box4.pos(485, 455);
        box4.init(6, fBoxType.defult);
        box4.setTouchRect(485, 455, box4.boxImg.width, box4.boxImg.height);
        this.vBoxs.push(box4);
        LayerManager.ins.addChild(box4, LayerName.ui_effect);
    };
    /**监听重置 */
    GameWin.prototype.REGISTER_RESET = function () {
        this.ui.stage.off(Laya.Event.MOUSE_DOWN, this, this.__mouseDown);
        this.ui.stage.on(Laya.Event.MOUSE_DOWN, this, this.__mouseDown);
    };
    /**寻路循环 */
    GameWin.prototype.onLoop = function () {
        if (this.vlines.length) {
            if (this.enemyIsDie)
                return;
            if (this.isStart) {
                if (this.lineIndex < this.vlines.length) {
                    this.nextPoint = new Laya.Point(this.vlines[this.lineIndex].x, this.vlines[this.lineIndex].y);
                }
            }
        }
    };
    /**
     * 返回每一帧的偏差值
     * @param deltaX  目标点与本身x的偏差
     * @param deltaY  目标点与本身y的偏差
     * @param speed   移动速度
     * @return 下一帧本身应该在的point
     */
    GameWin.prototype.getFrameTransition = function (deltaX, deltaY, speed) {
        var x;
        var y;
        var num = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        x = (speed / num) * deltaX;
        y = (speed / num) * deltaY;
        return new Laya.Point(x, y);
    };
    //鼠标按下场景
    GameWin.prototype.MOUSE_DOWN = function (e) {
        // }
        var p = new Laya.Point(e.stageX, e.stageY);
        this.ui.globalToLocal(p);
        this.ui.stage.on(Laya.Event.MOUSE_MOVE, this, this.MOUSE_MOVE);
        this.ui.stage.on(Laya.Event.MOUSE_UP, this, this.MOUSE_UP);
    };
    //鼠标按下移动场景
    GameWin.prototype.MOUSE_MOVE = function (e) {
        var p = new Laya.Point(e.stageX, e.stageY);
        this.ui.globalToLocal(p);
    };
    //鼠标弹起场景
    GameWin.prototype.MOUSE_UP = function (e) {
        var p = new Laya.Point(e.stageX, e.stageY);
        this.ui.globalToLocal(p);
        // this.v_Points.splice(0);
        // this.sp_line.graphics.clear();
    };
    //创建场景背景图
    GameWin.prototype.createBackground = function () {
        // SceneManager.ins.setBackground(CustomBase64.bg_game, 0, 0, Define.DeviceW, Define.DeviceH);
    };
    /**
     * 动力驱动
     */
    GameWin.prototype.update = function () {
        this.ui.db_move.x -= 0.5 * this.rOl;
        if (this.ui.db_move.x <= -296) {
            this.rOl = -1;
        }
        if (this.ui.db_move.x >= -3) {
            this.rOl = 1;
        }
        // this.onLoop();
        this.ui.img_guang.rotation += 0.6;
        if (this.vBoxs.length) {
            for (var i = 0; i < this.vBoxs.length; i++) {
                this.vBoxs[i].update();
            }
        }
        if (this.isEnd)
            return;
    };
    /**
     * 更新收益
     * @param event
     */
    GameWin.prototype.updateScore = function (event) {
        var gold = event.data;
    };
    /**
     * 展示页面的抖动效果
     * @param times 时间
     * @param delay 延迟时间
     * @param fun 触发事件
     */
    GameWin.prototype.playAnimaByTimes = function (guide, times, delay, fun) {
        var _this = this;
        if (delay === void 0) { delay = 1000; }
        fun();
        Laya.Tween.to(guide, {}, delay, null, Laya.Handler.create(guide, function () {
            times--;
            if (times <= 0) {
                return;
            }
            _this.playAnimaByTimes(guide, times, delay, fun);
        }));
    };
    GameWin.prototype.levelUp = function (num) {
        this.levelIndex += num;
        EventManager.ins.event(CustomDefine.EVENT_UPDATE_SCORE, this.levelIndex);
    };
    GameWin.prototype.gameNext = function (event) {
        this.clear();
        GameModel.ins.gameNext();
    };
    GameWin.prototype.gameOver = function (event) {
        var _this = this;
        Laya.timer.clear(this, this.update);
        this.ui.stage.off(Laya.Event.CLICK, this, this.stageClick);
        this.ui.stage.off(Laya.Event.MOUSE_DOWN, this, this.MOUSE_DOWN);
        Laya.timer.once(3000, this, function () {
            // UIManager.ins.openWindow(CustomWindow.gameDownload);
            // PlatformManager.ins.actionCallBack(PlatformAction.GameEnd);
            _this.startGameAgin(null);
        });
    };
    GameWin.prototype.gameEnd = function () {
        if (this.vBoxs.length) {
            for (var i = 0; i < this.vBoxs.length; i++) {
                this.vBoxs[i].disappear();
            }
        }
        // UIManager.ins.closeWindow(CustomWindow.game);
        UIManager.ins.openWindow(CustomWindow.gameDownload);
    };
    //点击场景
    GameWin.prototype.stageClick = function (e) {
        if (!this.isOpen) {
            return;
        }
        // this.isStart = true;
    };
    /**点击相关 */
    GameWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnDownload":
                // this.isDownload = true;
                // //2019-05-01 跳到下载页面，并未下载，直接返回，这时还能继续游戏
                // Laya.timer.once(2000, this, () => {
                //     this.isDownload = false;
                // })
                HttpManager.ins.link(Define.DOWNLOAD_URL);
                //HttpManager.ins.link(CustomDefine.downloadUrl);
                break;
            case "btnBuy":
                break;
            default:
                break;
        }
    };
    GameWin.prototype.startGameAgin = function (event) {
        Laya.timer.frameLoop(1, this, this.update);
        this.ui.stage.on(Laya.Event.CLICK, this, this.stageClick);
        this.ui.stage.on(Laya.Event.MOUSE_DOWN, this, this.MOUSE_DOWN);
    };
    GameWin.prototype.SYS_FOCUS = function (e) {
        console.log("this.isDownload=false;");
    };
    GameWin.prototype.clear = function () {
    };
    GameWin.prototype.close = function () {
        Laya.timer.clearAll(this);
        this.ui.off(Laya.Event.CLICK, this, this.stageClick);
        this.levelIndex = 1;
        this.isDownload = false;
        this.clear();
    };
    return GameWin;
}(BaseWindow));
//# sourceMappingURL=GameWin.js.map