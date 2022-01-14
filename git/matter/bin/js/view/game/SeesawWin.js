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
* 跷跷板
*/
var SeesawWin = /** @class */ (function (_super) {
    __extends(SeesawWin, _super);
    function SeesawWin() {
        return _super.call(this, SeesawUI) || this;
    }
    SeesawWin.prototype.init = function () {
        _super.prototype.init.call(this);
        this.ui = this.view;
    };
    SeesawWin.prototype.open = function () {
        MatterManager.ins.init();
        this.initWorld();
        UIManager.ins.closeWindow(CustomWindow.main);
    };
    SeesawWin.prototype.viewClick = function (sp) {
        _super.prototype.viewClick.call(this, sp);
        var spName = sp.name;
        switch (spName) {
            case "btnBack":
                UIManager.ins.openWindow(CustomWindow.main);
                UIManager.ins.closeWindow(CustomWindow.seesaw);
                break;
            default:
                break;
        }
    };
    SeesawWin.prototype.close = function () {
    };
    SeesawWin.prototype.initWorld = function () {
        //地面
        var ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true, render: { visible: false } });
        var rectA = Bodies.rectangle(400, Define.DeviceH - 100, 40, 200, { isStatic: true, render: { fillStyle: "#f00" }, collisionFilter: { group: -1, mask: 0, category: 0 } });
        var rectB = Bodies.rectangle(400, Define.DeviceH - 180, 400, 40, { render: { fillStyle: "#00f" }, collisionFilter: { group: -1, mask: 0, category: 0 } });
        var rotate = Constraint.create({
            bodyA: rectA,
            pointA: { x: 0, y: -80 },
            bodyB: rectB,
            length: 0,
            stiffness: 0.9
        });
        var stack_rect = Composites.stack(100, 100, 4, 3, 0, 0, function (x, y) { return Bodies.rectangle(x, y, 100, 40); });
        var stack_circle = Composites.stack(600, 100, 1, 5, 2, 3, function (x, y) { return Bodies.circle(x, y, 30); });
        MatterManager.ins.addWord([ground, stack_rect, stack_circle, rectA, rectB, MatterManager.ins.mouseConstraint, rotate]);
    };
    return SeesawWin;
}(BaseWindow));
