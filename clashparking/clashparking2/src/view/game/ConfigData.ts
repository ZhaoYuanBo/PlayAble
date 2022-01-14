/*
* 配置管理工具;
*/
class ConfigData {

    private static _ins: ConfigData;
    public static get ins(): ConfigData {
        if (!this._ins) {
            ConfigData._ins = new ConfigData();
        }
        return this._ins;
    }
    constructor() {

    }
    public gunCfg: any = {
        "101": {
            id: 101,
            skin: "king/gun1.png",
            upGod: 5,
            buyGod: 20,
            sound: "",
            times: 2,
            shotX: 425,
            shotY: 56,
        },
        "102": {
            id: 102,
            skin: "king/gun2.png",
            upGod: 15,
            buyGod: 40,
            sound: "",
            times: 4,
            shotX: 500,
            shotY: 64,
        },
        "103": {
            id: 103,
            skin: "king/gun3.png",
            upGod: 45,
            buyGod: 60,
            sound: "",
            times: 6,
            shotX: 500,
            shotY: 87,
        },
        "104": {
            id: 104,
            skin: "king/gun4.png",
            upGod: 135,
            buyGod: 80,
            sound: "",
            times: 8,
            shotX: 505,
            shotY: 130,
        },
        "105": {
            id: 105,
            skin: "king/gun5.png",
            upGod: 405,
            buyGod: 100,
            sound: "",
            times: 10,
            shotX: 454,
            shotY: 78,
        },
        "106": {
            id: 106,
            skin: "king/gun6.png",
            upGod: 30,
            buyGod: 120,
            sound: "",
            times: 10
        },
        "107": {
            id: 107,
            skin: "king/gun7.png",
            upGod: 35,
            buyGod: 140,
            sound: "",
            times: 10
        },
        "108": {
            id: 108,
            skin: "king/gun8.png",
            upGod: 40,
            buyGod: 160,
            sound: "",
            times: 10
        }
    }
}