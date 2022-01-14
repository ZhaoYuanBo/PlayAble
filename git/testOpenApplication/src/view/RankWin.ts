/*
* name;
*/
class RankWin extends ui.RankUI{
    constructor(){
        super();
        this.list.renderHandler = Laya.Handler.create(this,this.renderItem,null,false);
        this.onAdd();
    }

    private onAdd() {
        this.off(Laya.Event.ADDED, this, this.onAdd);
        this.on(Laya.Event.REMOVED, this, this.onRemove);
        EventManager.ins.on(EventKey.GET_RANK,this,this.GET_RANK);
        
    }
    private onRemove() {
        this.off(Laya.Event.REMOVED, this, this.onRemove);
        this.on(Laya.Event.ADDED, this, this.onAdd);
        EventManager.ins.off(EventKey.GET_RANK,this,this.GET_RANK);
    }


    private GET_RANK(ek:EventKey):void{
        this.list.dataSource = GameModel.ins.arrUserData;
    }

    private renderItem(cell:Laya.Box,index:number):void{
			var data:IUserGameData = cell.dataSource;
			var item:ui.RankItemUI = cell as ui.RankItemUI;
			item.txtRank.text = (1+index)+"";
			item.txtName.text = data.nickname.substr(0,6);
			item.txtScore.text = data.KVDataList[0].value;
			item.imgHead.skin = data.avatarUrl;
			// if(Global.isGame1){
			// 	item.imgBg.width=663;
			// }else if(Global.isGame2){
			// 	item.imgBg.width=551;
			// }else if(Global.isGame3){
			// 	item.imgBg.width=579;
			// 	item.txtNum.color= "#ffff00";
			// 	item.txtName.color= "#ffffff";
			// 	item.txtScore.color= "#ffffff";
			// }else{
			// 	item.imgBg.width=663;
			// }
		}
}