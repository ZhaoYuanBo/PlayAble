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
/**
* name
*/
var game;
(function (game) {
    var skill;
    (function (skill) {
        /**
         * 人物基类
         */
        var BaseSkill = /** @class */ (function (_super) {
            __extends(BaseSkill, _super);
            function BaseSkill() {
                var _this = _super.call(this) || this;
                /**角色 速度 */
                _this.speed = 1;
                /**角色 生命 */
                _this.hp = 1;
                /**角色 魔法 */
                _this.mp = 1;
                /**角色 伤害*/
                _this.hurt = 1;
                /**角色 防御*/
                _this.defense = 1;
                _this.on(Laya.Event.ADDED, _this, _this.onAdd);
                return _this;
            }
            BaseSkill.prototype.onAdd = function (e) {
                this.off(Laya.Event.ADDED, this, this.onAdd);
                this.on(Laya.Event.REMOVED, this, this.onRemoved);
            };
            BaseSkill.prototype.onRemoved = function (e) {
                this.on(Laya.Event.ADDED, this, this.onAdd);
                this.off(Laya.Event.REMOVED, this, this.onRemoved);
            };
            /**
             * 需在子类设置
             */
            BaseSkill.prototype.init = function () {
            };
            /**
             * 设置皮肤
             * @param skinData 皮肤数据
             * @param isAdd    是否显示,默认是true
             */
            BaseSkill.prototype.setSkin = function (skinData, isAdd) {
                if (isAdd === void 0) { isAdd = true; }
            };
            return BaseSkill;
        }(Laya.Sprite));
        skill.BaseSkill = BaseSkill;
        /**
         * 动作数据
         */
        var SkillAction = /** @class */ (function () {
            /**
             *
             * @param actionType 动作类型
             * @param frameCount 动作帧数
             * @param isLoop     动作是否循环,默认是true
             */
            function SkillAction(actionType, frameCount, width, height, pivotOffX, pivotOffY, isLoop) {
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                if (pivotOffX === void 0) { pivotOffX = 0; }
                if (pivotOffY === void 0) { pivotOffY = 0; }
                if (isLoop === void 0) { isLoop = true; }
                this.actionType = actionType;
                this.frameCount = frameCount;
                this.width = width;
                this.height = height;
                this.pivotOffX = pivotOffX;
                this.pivotOffY = pivotOffY;
                this.isLoop = isLoop;
            }
            return SkillAction;
        }());
        skill.SkillAction = SkillAction;
        /**
         * 皮肤数据
         */
        var SkillSkinData = /** @class */ (function () {
            function SkillSkinData(atlasName, kingType, arrAction, cutRow, cutCol) {
                if (cutRow === void 0) { cutRow = 0; }
                if (cutCol === void 0) { cutCol = 0; }
                /**图集名字 */
                this.atlasName = "";
                /**角色类型 */
                this.kingType = "";
                /**图集动画行数 */
                this.cutRow = 1;
                /**图集动画列数 */
                this.cutCol = 1;
                this.atlasName = atlasName;
                this.kingType = kingType;
                this.cutRow = cutRow;
                this.cutCol = cutCol;
                this.arrAction = arrAction;
            }
            return SkillSkinData;
        }());
        skill.SkillSkinData = SkillSkinData;
    })(skill = game.skill || (game.skill = {}));
})(game || (game = {}));
