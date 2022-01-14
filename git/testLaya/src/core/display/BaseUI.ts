namespace game.display{
    /*
    2019-02-27 andy
    * UI基类 窗体
    */
    export class BaseUI extends BaseDisplay{
        /**缓存初始坐标 */
        private dicInitPosition:Dictionary<Laya.Point>;
        constructor(){
            super();
            this.dicInitPosition=new Dictionary<Laya.Point>();
        }
        public onAdd():void{
            super.onAdd();
            this.open();
        }
        public onRemove(){
            super.onRemove();
            this.close();
        }
        public open():void{
            
        } 
        public close():void{
            
        }
        public detory():void{

        } 
        /**UI是否显示 */
        public isOpen():boolean{
            return this!=null && this.parent!=null;
        } 
        /**横屏时布局设置 */
        public scaleH():void{

        }
        /**竖屏时布局设置 */
        public scaleV():void{
            
        }
        /**
         * 记录初始坐标
         */
        public recordInitPosition(ui:Laya.Sprite):void{
            if(ui instanceof Laya.View){
                this.recordViewPosition(ui);
            }else{
                this.dicInitPosition.add(ui.name,new Laya.Point(ui.x,ui.y));
            }
        }
        private recordViewPosition(sp:Laya.Sprite):void{
            for(let child of sp._childs){
                if(child.name!=""){
                    this.dicInitPosition.add(child.name,new Laya.Point(child.x,child.y));
                }
                if(child instanceof Laya.Sprite){
                    this.recordViewPosition(child);
                }
            }
        }
        /**
         * 得到显示对象初始位置
         * @param name 显示对象
         */
        public getInitPosition(name:string):Laya.Point{
            var point:Laya.Point = this.dicInitPosition.get(name);
            if(!point){
                point=new Laya.Point();
                //this.dicInitPosition.add(name,point);
            }
            return point;
        }
        /**
         * 得到两个显示对象的初始位置偏差X
         * @param sp1 显示对象1
         * @param sp2 显示对象2
         */
        public getInitPositionOffX(sp1:Laya.Sprite,sp2:Laya.Sprite):number{
            if(!sp1 || !sp2){
                return 0;
            }
            let p1:Laya.Point=this.getInitPosition(sp1.name);
            let p2:Laya.Point=this.getInitPosition(sp2.name);
            return p2.x-p1.x;
        }
        /**
         * 得到两个显示对象的初始位置偏差Y
         * @param sp1 显示对象1
         * @param sp2 显示对象2
         */
        public getInitPositionOffY(sp1:Laya.Sprite,sp2:Laya.Sprite):number{
            if(!sp1 || !sp2){
                return 0;
            }
            let p1:Laya.Point=this.getInitPosition(sp1.name);
            let p2:Laya.Point=this.getInitPosition(sp2.name);
            return p2.y-p1.y;
        }
        /**
         * 还原初始位置
         * @param sp 显示对象
         */
        public resetInitPosition(sp:Laya.Sprite):void{
            var point:Laya.Point = this.dicInitPosition.get(sp.name);
            if(point){
                sp.x=point.x;
                sp.y=point.y;
            }
        }
        /**
         * 根据两个初始的位置偏差X,设置现在的位置X
         * @param sp1 参考对象1
         * @param sp2 得到对象2
         */
        public setPositionByOffX(sp1:Laya.Sprite,sp2:Laya.Sprite):void{
            if(!sp1 || !sp2){
                return;
            }
            let offX:number=this.getInitPositionOffX(sp1,sp2);
            sp2.x=sp1.x+offX;
        }
        /**
         * 根据两个初始的位置偏差Y,设置现在的位置Y
         * @param sp1 参考对象1
         * @param sp2 得到对象2
         */
        public setPositionByOffY(sp1:Laya.Sprite,sp2:Laya.Sprite):void{
            if(!sp1 || !sp2){
                return;
            }
            let offY:number=this.getInitPositionOffY(sp1,sp2);
            sp2.y=sp1.y+offY;
        } 
    }
}
