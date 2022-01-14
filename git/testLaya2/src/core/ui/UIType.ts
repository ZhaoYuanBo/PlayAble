namespace game.ui{
    /*
    * name;
    */
    export class UIType{
        /**窗体名字 */
        public name:string;
        /**窗体路径 */
        public path:any;
        constructor(v:string,v2:Laya.View|any){
            this.name=v;
            this.path=v2;
        }
    }
}