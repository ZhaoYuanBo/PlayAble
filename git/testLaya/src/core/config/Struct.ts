namespace game.config{
    
    /**技能配置 */
    export class Cfg_Skill{
        /**技能ID*/
        public skillId:number;
        /**技能名字*/
        public skillName:string;
        /**生物皮肤*/
        public skin:string;
        /**动作类型*/
        public actionType:number;
        /**技能类型 */
        public skillType:number;
        /**攻击值 */
        public atk:number=0;
        /**攻击距离 */
        public atkDistance:number=100;
        /**攻击CD */
        public atkCD:number=0;
        /**攻击特效ID */
        public atkEft:number;
        /**攻击X */
        public atkX:number=0;
        /**攻击Y */
        public atkY:number=0;
        /**发射特效ID 子弹,弓箭 */
        public atkingEft:number=0;
        /**发射X */
        public atkingX:number=0;
        /**发射Y */
        public atkingY:number=0;
        /**发射运行速度 默认100,越小越快*/
        public atkingSpeed:number=100;
        /**发射数量 默认1*/
        public atkingCount:number=1;
        /**发射角度 */
        public atkingRotation:number=0;
        /**受击特效ID */
        public atkedEft:number;
        /**受击效果延时,有攻击特效时，此值可为0*/
        public atkedDelay:number;
        constructor(){}
    }
    /*
    * 动作表
    */
    export class Cfg_Action{
        constructor(){

        }
        public id:number;
        /**动作皮肤 */
        public skin:string;
        /**动作类型 */
        public actionType:ActionType;
        /**动作方向 */
        public actionDirect:ActionDirect;
        /**帧数 */
        public frameCount:number;
        /**帧频 */
        public frameRate:number;
        /**宽度 */
        public width:number;
        /**高度 */
        public height:number;
        /**中心偏移X */
        public offX:number;
        /**中心偏移Y */
        public offY:number;
    }
    /*
    * 序列帧特效表
    */
    export class Cfg_Frame{
        constructor(){

        }
        public id:number;
        /**皮肤 */
        public skin:string;
        /**帧数 */
        public count:number;
        /**帧频 */
        public rate:number;
        /**宽度 */
        public width:number;
        /**高度 */
        public height:number;
        /**描述*/
        public desc:string;
    }
    /*
    * 道具
    */
    export class Cfg_Item{
        constructor(){

        }
        /**物品ID */
        public id:number;
        /**物品名字 */
        public name:string;
        /**物品类型 */
        public type:number;
        /**物品品质 */
        public color:number;
        /**物品Icon */
        public icon:string;
    }
    /*
    * 等级经验表
    */
    export class Cfg_Level{
        constructor(){

        }
        public id:number;
        /**等级 */
        public lvl:number;
        /**经验 */
        public exp:number;
        /**名字 */
        public name:string;
        /**皮肤 */
        public skin:string;
        /**生命 */
        public hp:number;
        /**魔法 */
        public mp:number;
        /**攻击*/
        public atk:number;
        /**攻击 暴击伤害*/
        public cri:number;
        /**攻击 暴击率，以10000为上限*/
        public criRate:number;
        /**攻击距离*/
        public atkDistance:number;
        /**移动速度*/
        public moveSpeed:number;
    }
    /*
    * 怪物表
    */
    export class Cfg_Monster{
        constructor(){

        }
        public id:number;
        /**等级 */
        public type:number;
        /**名字 */
        public name:string;
        /**皮肤 */
        public skin:string;
        /**生命 */
        public hp:number;
        /**攻击*/
        public atk:number;
        /**物理攻击延时，只针对第一次攻击*/
        public atkDelay:number;
        /**受击半径*/
        public atkedRadis:number;
        /**受击特效X*/
        public atkedX:number;
        /**受击特效Y*/
        public atkedY:number;
        /**移动速度*/
        public moveSpeed:number;
        /**金币 */
        public coin:number;
    }
    /*
    * Npc表
    */
    export class Cfg_Npc{
        constructor(){

        }
        public id:number;
        /**等级 */
        public type:number;
        /**名字 */
        public name:string;
        /**皮肤 */
        public skin:string;
        /**移动速度*/
        public moveSpeed:number;
        /**金币 */
        public coin:number;
    }
}

