var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 2019-03-01 andy
游戏数据
*/
var UserModel = /** @class */ (function () {
    function UserModel() {
        /**用户昵称 */
        this.nickName = "";
        /**用户头像 */
        this.headImg = "";
        /**用户性别 */
        this.sex = 0;
        /**用户省份 */
        this.province = "";
        /**用户城市 */
        this.city = "";
        /**用户国家 */
        this.country = "";
        /**游戏最高分数 */
        this.scoreMax = 0;
        /**等级 */
        this.lvl = 1;
    }
    UserModel.prototype.init = function () {
        this.scoreMax = LocalData.ins.getData(LocalKey.SCORE_MAX);
    };
    return UserModel;
}());
/*
* 2019-03-01 andy
游戏自己数据
*/
var UserSelfModel = /** @class */ (function (_super) {
    __extends(UserSelfModel, _super);
    function UserSelfModel() {
        var _this = _super.call(this) || this;
        /**小刀ID */
        _this.knifeId = 101;
        if (UserSelfModel._ins != null)
            throw new Error("UserSelfModel is single!");
        return _this;
    }
    Object.defineProperty(UserSelfModel, "ins", {
        get: function () {
            if (!this._ins)
                UserSelfModel._ins = new UserSelfModel();
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    UserSelfModel.prototype.init = function () {
        this.scoreMax = LocalData.ins.getData(LocalKey.SCORE_MAX);
        this.lvl = LocalData.ins.getData(LocalKey.LEVEL);
        if (!this.lvl) {
            this.lvl = 1;
        }
        this.knifeId = LocalData.ins.getData(LocalKey.KNIFE_ID);
        if (!this.knifeId) {
            this.knifeId = 303;
        }
    };
    UserSelfModel.prototype.setKnife = function (v) {
        this.knifeId = v;
        LocalData.ins.setData(LocalKey.KNIFE_ID, v);
    };
    UserSelfModel.prototype.setLevel = function (v) {
        this.lvl = v;
        LocalData.ins.setData(LocalKey.LEVEL, v);
    };
    return UserSelfModel;
}(UserModel));
