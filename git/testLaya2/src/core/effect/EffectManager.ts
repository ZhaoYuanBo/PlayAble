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
        public getEffect(en:EffectName,arrSprite:Array<Sprite>,arrNumber:Array<number>=null,arrString:Array<string>=null,isScene:boolean=true):BaseEffect{
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
                default:
                    console.error("EffectName not exist!");
                break;
            }
            if(be)
                be.setData(arrSprite,arrNumber,arrString);
            return be;
        }

        public addEffect(be:BaseEffect,isScene:boolean):void{
            if(isScene){
                this.topScene.addChild(be);
            }else{
                this.topWindow.addChild(be);
            }
        }
    }

    export enum EffectName{
        /**[] [linepadding] [line1,line2,bosshead,y,word,y,w,h,size,color,stroke,strokecolor]*/
        boss_warning,
        /**[] [] [skin...]*/
        guide_click,
        /**[] [oneSendTime,minx,max,miny,maxy,oneShowTime,needRotation] [skin...]*/
        Fountain,
        /**[parentContainer][x,y,changeTime] [skin...]*/
        change_img
    }
}
