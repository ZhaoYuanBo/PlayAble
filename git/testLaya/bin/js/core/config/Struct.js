var game;
(function (game) {
    var config;
    (function (config) {
        /**技能配置 */
        var Cfg_Skill = /** @class */ (function () {
            function Cfg_Skill() {
                /**攻击值 */
                this.atk = 0;
                /**攻击距离 */
                this.atkDistance = 100;
                /**攻击CD */
                this.atkCD = 0;
                /**攻击X */
                this.atkX = 0;
                /**攻击Y */
                this.atkY = 0;
                /**发射特效ID 子弹,弓箭 */
                this.atkingEft = 0;
                /**发射X */
                this.atkingX = 0;
                /**发射Y */
                this.atkingY = 0;
                /**发射运行速度 默认100,越小越快*/
                this.atkingSpeed = 100;
                /**发射数量 默认1*/
                this.atkingCount = 1;
                /**发射角度 */
                this.atkingRotation = 0;
            }
            return Cfg_Skill;
        }());
        config.Cfg_Skill = Cfg_Skill;
        /*
        * 动作表
        */
        var Cfg_Action = /** @class */ (function () {
            function Cfg_Action() {
            }
            return Cfg_Action;
        }());
        config.Cfg_Action = Cfg_Action;
        /*
        * 序列帧特效表
        */
        var Cfg_Frame = /** @class */ (function () {
            function Cfg_Frame() {
            }
            return Cfg_Frame;
        }());
        config.Cfg_Frame = Cfg_Frame;
        /*
        * 道具
        */
        var Cfg_Item = /** @class */ (function () {
            function Cfg_Item() {
            }
            return Cfg_Item;
        }());
        config.Cfg_Item = Cfg_Item;
        /*
        * 等级经验表
        */
        var Cfg_Level = /** @class */ (function () {
            function Cfg_Level() {
            }
            return Cfg_Level;
        }());
        config.Cfg_Level = Cfg_Level;
        /*
        * 怪物表
        */
        var Cfg_Monster = /** @class */ (function () {
            function Cfg_Monster() {
            }
            return Cfg_Monster;
        }());
        config.Cfg_Monster = Cfg_Monster;
        /*
        * Npc表
        */
        var Cfg_Npc = /** @class */ (function () {
            function Cfg_Npc() {
            }
            return Cfg_Npc;
        }());
        config.Cfg_Npc = Cfg_Npc;
    })(config = game.config || (game.config = {}));
})(game || (game = {}));
