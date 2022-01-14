export default class EventManager extends Laya.EventDispatcher {
    private static _instance: EventManager;

    constructor() {
        super();
    }

    public static get Ins(): EventManager {
        if (!this._instance) this._instance = new EventManager();
        return this._instance;
    }

    static EVENT_SHOW_NATIVE = "EVENT_SHOW_NATIVE"

}