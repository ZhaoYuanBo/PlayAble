/*
* 2019-03-01 andy
游戏数据
*/
class UserModel{   
	/**用户昵称 */
    public nickName:string="";
	/**用户头像 */
    public headImg:string="";
	/**用户性别 */
    public sex:number=0;
	/**用户省份 */
    public province:string="";
	/**用户城市 */
    public city:string="";
	/**用户国家 */
    public country:string="";
    /**游戏最高分数 */
    public scoreMax:number=0;
	/**等级 */
    public lvl:number=1;

	constructor(){
		
	}
    public init():void{
        this.scoreMax= LocalData.ins.getData(LocalKey.SCORE_MAX);
    }
}
/*
* 2019-03-01 andy
游戏自己数据
*/
class UserSelfModel extends UserModel{ 
	/**小刀ID */
	public knifeId:number=101;
    private static _ins:UserSelfModel;
    public static get ins():UserSelfModel{
		if(!this._ins)
			UserSelfModel._ins=new UserSelfModel();
		return this._ins;
	}
	constructor(){
		super();
		if(UserSelfModel._ins != null)
			throw new Error("UserSelfModel is single!");
	}
    public init():void{
        this.scoreMax= LocalData.ins.getData(LocalKey.SCORE_MAX);
		this.lvl= LocalData.ins.getData(LocalKey.LEVEL);
		if(!this.lvl){
			this.lvl=1;
		}
		this.knifeId= LocalData.ins.getData(LocalKey.KNIFE_ID);
		if(!this.knifeId){
			this.knifeId=303;
		}
    }

	public setKnife(v:number):void{
		this.knifeId= v;
		LocalData.ins.setData(LocalKey.KNIFE_ID,v);
	}
	public setLevel(v:number):void{
		this.lvl= v;
		LocalData.ins.setData(LocalKey.LEVEL,v);
	}
}
