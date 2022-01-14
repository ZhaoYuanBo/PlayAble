/*
* 2019-03-05 andy
游戏数据
*/
class GameModel{
    public score:number=0;
    public arrUserData:IUserGameData[] = null;

    private static _ins:GameModel;
    public static get ins():GameModel{
		if(!this._ins)
			GameModel._ins=new GameModel();
		return this._ins;
	}
    constructor(){
        if(GameModel._ins != null)
			throw new Error("GameModel is single!");
    }

    public setUser(v:any):void{
        if(v){
            this.score=v[0].value;
        }
        
	}

    public setList(list:IUserGameData[]):void{
        this.arrUserData=[];
        list.forEach(element => {
            if(element.KVDataList.length < 1){
                element.KVDataList = [{key:CloudKey.score,value:0}];
            }
            this.arrUserData.push(element);
        });
        this.arrUserData.sort(this.compareFn);
        console.log("rankList,len="+this.arrUserData.length);
        EventManager.ins.event(EventKey.GET_RANK);
	}

    private compareFn(a: IUserGameData,b: IUserGameData):number{
        if(Number(a.KVDataList[0].value) > Number(b.KVDataList[0].value)){
            return -1;
        } else if(Number(a.KVDataList[0].value) < Number(b.KVDataList[0].value)){
            return 1;
        } else {
            return 0;
        }
    }
}
