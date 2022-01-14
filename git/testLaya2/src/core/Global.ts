namespace game{
    import IPlatform=game.platform.IPlatform;
    import PlatformID=game.platform.PlatformID;
    /*
    * 2019-02-27 andy
    全局基类
    */
    export class Global{
        constructor(){

        }
        /**UI根节点 */
        public static uiRoot:Laya.Sprite;
        /**全局平台 */
        public static platform:IPlatform;
        /**平台ID */
        public static platformId:PlatformID = PlatformID.None;
        /**用户ID */
        public static UID:string;

        /**微信OPENID */
        public static openId:string;
        /**微信code */
        public static code:string;
        /**微信query*/
        public static query:string;
        /**微信shareTicket*/
        public static shareTicket:string;
        /**微信brand*/
        public static BRAND:string;
        /**微信model*/
        public static MODEL:string;
        /**微信system*/
        public static SYSTEM:string;
        
        
    }    
}