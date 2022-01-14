namespace game.effect{
    /*
    * 2019-07-17 andy
        特效管理
    */
    export class EffectManager{
        /**窗体上层 */
        private topWindow:Laya.Sprite;
        /**场景上层 */
        private topScene:Laya.Sprite;

        private static _ins:EffectManager;
        public static get ins():EffectManager{
            if(!this._ins)
                EffectManager._ins=new EffectManager();
            return this._ins;
        }
        constructor(){
            if(EffectManager._ins != null)
                throw new Error("EffectManager is single!");
        }

        public init(): void {
            //特效层级 界面上
            this.topWindow=LayerManager.ins.addChild(new Laya.Sprite(),LayerName.ui_effect);
            //特效层级 场景上
            this.topScene=LayerManager.ins.addChild(new Laya.Sprite(),LayerName.scene_effect);
        }
        /**
         * 获得特效
         * @param en   EffectName
         * @param arrSprite 
         * @param arrNumber 
         * @param arrString 
         * @param isScene   是否显示在场景层，默认为true，若为false则显示在界面层上面
         */
        public getEffect(en:EffectName,effectData:BaseEffectData,isScene:boolean=true):BaseEffect{
            let be:BaseEffect=null;
            switch(en){
                case EffectName.boss_warning:
                    be=new BossWarningEft(isScene);
                   
                break;
                case EffectName.guide_click:
                    be=new GuideClickEft(isScene);
                break;
                case EffectName.Fountain:
                    be=new FountainEft(isScene);
                break;
                case EffectName.change_img:
                    be=new ChangeImageEft(isScene);
                break;
                case EffectName.out_gold:
                    be=new OutGoldEft(isScene);
                break;
                case EffectName.air_drop:
                    be=new AirDropEft(isScene);
                break;
                case EffectName.waiting:
                    be=new WaitingEft(isScene);
                break;
                case EffectName.out_star:
                    be=new OutStarEft(isScene);
                break;
                default:
                    console.error("EffectName not exist!");
                break;
            }
            if(be)
                be.setData(effectData);
            return be;
        }
        /**
         * 添加特效
         * @param be 
         * @param layer 
         */
        public addEffect(be:BaseEffect,layer:LayerName=LayerName.main):void{
            LayerManager.ins.addChild(be,layer);
        }
    }

    export enum EffectName{
        /**Boss来袭*/
        boss_warning,
        /**水纹点击*/
        guide_click,
        /**喷泉*/
        Fountain,
        /**图片切换*/
        change_img,
        /**喷出金币*/
        out_gold,
        /**空投*/
        air_drop,
        /**等待加载*/
        waiting,
        /**喷出一圈小星星*/
        out_star
    }

}
