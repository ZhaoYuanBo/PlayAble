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
2019-05-05 andy
* 奋斗的小鸟
*/
var BirdWin = /** @class */ (function (_super) {
    __extends(BirdWin, _super);
    function BirdWin() {
        return _super.call(this, BirdUI) || this;
    }
    BirdWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
    };
    BirdWin.prototype.open = function () {
        this.initWorld();
        //this.initWord2();
        UIManager.ins.closeWindow(CustomWindow.main);
    };
    BirdWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnBack":
                UIManager.ins.openWindow(CustomWindow.main);
                UIManager.ins.closeWindow(CustomWindow.bird);
                break;
            default:
                break;
        }
    };
    BirdWin.prototype.close = function () {
    };
    BirdWin.prototype.initWorld = function () {
        //地面
        var wt = 200;
        var centerX = Define.DeviceW >> 1;
        var ground = Bodies.rectangle(Define.DeviceW >> 1, 600, wt, 30, { isStatic: true, render: { visible: true } }), 
        //摇杆 
        rockOptions = { density: 0.004, render: { sprite: { texture: 'res/physics/img/rock.png', xOffset: 23.5, yOffset: 23.5 } } }, rock = Bodies.polygon(170, 450, 6, 20, rockOptions), anchor = { x: 170, y: 450 }, elastic = Constraint.create({ pointA: anchor, bodyB: rock, stiffness: 0.05, render: { visible: true, lineWidth: 5, strokeStyle: '#dfa417' } });
        //障碍物
        var pyramid = Composites.pyramid(centerX - wt / 2, 300, 5, 10, 0, 0, function (x, y, column) {
            var texture = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
            return Bodies.rectangle(x, y, 25, 40, { render: { sprite: { texture: texture, xScale: 1, yScale: 1 } } });
        });
        // //地面2
        // var ground2:any = Bodies.rectangle(610, 250, 200, 20, {isStatic: true, render: {fillStyle: '#edc51e', strokeStyle: '#b5a91c'}});
        // //障碍物2
        // var pyramid2:any = Composites.pyramid(550, 0, 5, 10, 0, 0, function(x, y, column):any
        // {
        // 	var texture:any = column % 2 === 0 ? 'res/physics/img/block.png' : 'res/physics/img/block-2.png';
        // 	return Bodies.rectangle(x, y, 25, 40, {render: {sprite: {texture: texture,xScale:1,yScale:1}}});
        // });
        MatterManager.ins.addWord([ground, pyramid, rock, elastic]);
        MatterManager.ins.regEvent('afterUpdate', function () {
            if (MatterManager.ins.mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
                rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
                MatterManager.ins.addWord(rock);
                elastic.bodyB = rock;
            }
        });
    };
    BirdWin.prototype.initWord2 = function () {
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
        var ground = Bodies.rectangle(400, 30, 800, 60, { isStatic: true, render: { fillStyle: '#edc51e', strokeStyle: '#b5a91c' } });
        //将所有物体添加到世界中
        MatterManager.ins.addWord([boxA, circle, polygon, trapezoid, ground]);
    };
    return BirdWin;
}(BaseWindow));
