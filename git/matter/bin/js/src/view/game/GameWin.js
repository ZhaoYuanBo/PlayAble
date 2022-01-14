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
var Stage = Laya.Stage;
var Render = Laya.Render;
var Composites = Matter.Composites;
var Bodies = Matter.Bodies;
var World = Matter.World;
/*
* 游戏界面
*/
var GameWin = /** @class */ (function (_super) {
    __extends(GameWin, _super);
    function GameWin() {
        var _this = _super.call(this, GameUI) || this;
        _this.Matter = Browser.window.Matter;
        _this.LayaRender = Browser.window.LayaRender;
        return _this;
    }
    GameWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
        //SceneManager.ins.setBackground(Define.CDN+"/atlas/not/bg_game.jpg");    
    };
    GameWin.prototype.open = function () {
        this.setup();
    };
    GameWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnAlien":
                break;
            default:
                break;
        }
    };
    GameWin.prototype.close = function () {
    };
    GameWin.prototype.setup = function () {
        this.initMatter();
        this.initWorld();
        this.initWord2();
        Laya.stage.on("resize", this, this.onResize);
    };
    GameWin.prototype.initMatter = function () {
        var gameWorld = new Sprite();
        Laya.stage.addChild(gameWorld);
        // 初始化物理引擎 enableSleeping: true睡眠模式
        this.engine = Matter.Engine.create({ enableSleeping: true });
        Matter.Engine.run(this.engine);
        var render = this.LayaRender.create({ engine: this.engine, width: 800, height: 600, options: { background: 'res/physics/img/background.png', wireframes: false } });
        this.LayaRender.run(render);
        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, { constraint: { angularStiffness: 0.1, stiffness: 2 }, element: Render.canvas });
        Matter.World.add(this.engine.world, this.mouseConstraint);
        render.mouse = this.mouseConstraint.mouse;
    };
    GameWin.prototype.initWorld = function () {
        //地面
        var ground = Matter.Bodies.rectangle(395, 600, 815, 50, { isStatic: true, render: { visible: false } }), rockOptions = { density: 0.004, render: { sprite: { texture: 'res/physics/img/rock.png', xOffset: 23.5, yOffset: 23.5 } } }, rock = Matter.Bodies.polygon(170, 450, 8, 20, rockOptions), anchor = { x: 170, y: 450 }, elastic = Matter.Constraint.create({ pointA: anchor, bodyB: rock, stiffness: 0.05, render: { lineWidth: 5, strokeStyle: '#dfa417' } });
        //障碍物
        var pyramid = Matter.Composites.pyramid(0, 300, 5, 10, 0, 0, function (x, y, column) {
            var texture = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
            return Matter.Bodies.rectangle(x, y, 25, 40, { render: { sprite: { texture: texture, xOffset: 20.5, yOffset: 28 } } });
        });
        //地面2
        var ground2 = Matter.Bodies.rectangle(610, 250, 200, 20, { isStatic: true, render: { fillStyle: '#edc51e', strokeStyle: '#b5a91c' } });
        //障碍物2
        var pyramid2 = Matter.Composites.pyramid(550, 0, 5, 10, 0, 0, function (x, y, column) {
            var texture = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
            return Matter.Bodies.rectangle(x, y, 25, 40, { render: { sprite: { texture: texture, xOffset: 20.5, yOffset: 28 } } });
        });
        World.add(this.engine.world, [this.mouseConstraint, ground, pyramid, ground2, pyramid2, rock, elastic]);
        Matter.Events.on(this.engine, 'afterUpdate', function () {
            if (this.mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
                rock = Matter.Bodies.polygon(170, 450, 7, 20, rockOptions);
                Matter.World.add(this.engine.world, rock);
                elastic.bodyB = rock;
            }
        }.bind(this));
    };
    GameWin.prototype.initWord2 = function () {
        /**添加鼠标控制
         * Matter.MouseConstraint.create(engine, options)
         * 第一个参数是引擎 engine，第二个参数是一个json对象，用于设置属性，
         */
        var mouseConstraint = Matter.MouseConstraint.create(this.engine, {});
        /**创建刚体
         * Bodies.rectangle = function(x, y, width, height, options)
         * x,y 分别表示矩形中心点的坐标，坐标的原点(0,0)在 Canvas(画布)的左上角
         * width,height 分别表示矩形的宽和高
         * options：描述矩形的参数，是一个 json 对象
         * @type {body}
         */
        var boxA = Bodies.rectangle(250, 0, 80, 80); //绘制矩形。
        var circle = Bodies.circle(300, 50, 25); //绘制圆。（300,50）表示圆心坐标点，25 表示半径
        var polygon = Bodies.polygon(350, 100, 5, 25); //绘制多边形。(350,100)表示多边形中心点，5表示多边形边数，25表示半径
        var trapezoid = Bodies.trapezoid(500, 100, 50, 80, 1); //绘制梯形。(500,100)表示梯形中心坐标，50表示宽，80表示高，1表示斜坡率(slope)
        //创建矩形作为陆地,isStatic=true 表示物体静止
        var ground = Bodies.rectangle(400, 570, 800, 60, { isStatic: true });
        //将所有物体添加到世界中
        World.add(this.engine.world, [boxA, circle, polygon, trapezoid, mouseConstraint, ground]);
    };
    GameWin.prototype.onResize = function () {
        // 设置鼠标的坐标缩放
        // Laya.stage.clientScaleX代表舞台缩放
        // Laya.stage._canvasTransform代表画布缩放
        Matter.Mouse.setScale(this.mouseConstraint.mouse, { x: 1 / (Laya.stage.clientScaleX * Laya.stage._canvasTransform.a), y: 1 / (Laya.stage.clientScaleY * Laya.stage._canvasTransform.d) });
    };
    return GameWin;
}(BaseWindow));
