var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* 2019-03-01 andy
事件分发器
*/
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        var _this = _super.call(this) || this;
        if (EventManager._ins != null)
            throw new Error("EventManager is single!");
        return _this;
    }
    Object.defineProperty(EventManager, "ins", {
        get: function () {
            if (!this._ins)
                EventManager._ins = new EventManager();
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    EventManager.prototype.event = function (type, data) {
        return _super.prototype.event.call(this, type, new EventKey(type, data));
    };
    return EventManager;
}(Laya.EventDispatcher));
/**事件 */
var EventKey = (function () {
    function EventKey(type, data) {
        this.type = type;
        this.data = data;
    }
    return EventKey;
}());
/**尺寸发生变化 */
EventKey.ZY_RESIZE = "ZY_RESIZE";
/**登录成功 */
EventKey.ZY_LOGIN = "ZY_LOGIN";
/**显示排行 */
EventKey.ZY_RANK = "ZY_RANK";
/**上报分数 */
EventKey.ZY_SCORE = "ZY_SCORE";
/** 从云端获得排行数据 */
EventKey.GET_RANK = "GET_RANK";
