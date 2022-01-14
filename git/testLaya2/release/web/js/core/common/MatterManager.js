var game;
(function (game) {
    var common;
    (function (common) {
        /*
        *2019-05-05 andy
        Matter 2D物理引擎管理类
        */
        var MatterManager = /** @class */ (function () {
            function MatterManager() {
                this.Matter = Laya.Browser.window.Matter;
                this.LayaRender = Laya.Browser.window.LayaRender;
                if (MatterManager._ins != null)
                    throw new Error("MatterManager is single!");
            }
            Object.defineProperty(MatterManager, "ins", {
                get: function () {
                    if (!this._ins)
                        MatterManager._ins = new MatterManager();
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MatterManager.prototype, "mouseConstraint", {
                /**
                 * 获得Matter.MouseConstraint
                 */
                get: function () {
                    return this._mouseConstraint;
                },
                enumerable: true,
                configurable: true
            });
            MatterManager.prototype.init = function () {
                // 初始化物理引擎 enableSleeping: true睡眠模式
                this.engine = Matter.Engine.create({ enableSleeping: true });
                Matter.Engine.run(this.engine);
                //采用Laya渲染
                this.gameWorld = new Sprite();
                Laya.stage.addChild(this.gameWorld);
                this.render = this.LayaRender.create({ engine: this.engine, container: this.gameWorld.stage, width: game.Define.DeviceW, height: game.Define.DeviceH, options: { background: 'res/physics/img/background.png', wireframes: false } });
                this.LayaRender.run(this.render);
                //鼠标控制
                this.initMouse();
            };
            MatterManager.prototype.initMouse = function () {
                this._mouseConstraint = Matter.MouseConstraint.create(this.engine, { constraint: { id: 0, render: this.render } });
                this.addWord(this._mouseConstraint);
                this.render.mouse = this._mouseConstraint.mouse;
                // if (!this.mouseConstraint) {
                //     if (this.engine && this.engine.render && this.engine.render.canvas) {
                //         this.mouseConstraint = Matter.MouseConstraint.create(this.engine.render.canvas);
                //     } else if (options && options.element) {
                //         mouse = Mouse.create(options.element);
                //     } else {
                //         mouse = Mouse.create();
                //         Common.warn('MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected');
                //     }
                // }
            };
            /**
             * 添加到世界
             * @param arr
             */
            MatterManager.prototype.addWord = function (body) {
                if (!this.engine) {
                    console.error("Matter engine 未初始化！");
                    return;
                }
                Matter.World.add(this.engine.world, body);
            };
            /**
             * 引擎注册事件
             * @param eventName
             * @param callBack
             */
            MatterManager.prototype.regEvent = function (eventName, callBack) {
                Matter.Events.on(this.engine, eventName, callBack);
            };
            /**
             * 场景尺寸发生改变
             */
            MatterManager.prototype.onResize = function () {
                if (!this.engine) {
                    return;
                }
                // 设置鼠标的坐标缩放
                // Laya.stage.clientScaleX代表舞台缩放
                // Laya.stage._canvasTransform代表画布缩放
                Matter.Mouse.setScale(this._mouseConstraint.mouse, { x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d) });
            };
            return MatterManager;
        }());
        common.MatterManager = MatterManager;
    })(common = game.common || (game.common = {}));
})(game || (game = {}));
//# sourceMappingURL=MatterManager.js.map