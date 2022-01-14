/*
2019-05-13 andy
* 左右传输
*/
class Mothers extends Laya.Sprite{
    public boys:Boys;
    /**农民 */
    public arrMother:Array<Mother>;


    /**篮子里边水果的价值 */
    public moneyCount:number=0;
    
    constructor(boys:Boys){
        super();
        this.boys=boys;
        this.x=200;
        this.y=700;
        this.arrMother=[];
 
        LayerManager.ins.addChild(this,LayerName.scene_map);
        this.init();
    }
    public init():void{
        this.createKing();
        
    }

    //创建生物
    private createKing():void{
        let mother:Mother=new Mother(this);
        mother.init();
        this.arrMother.push(mother);
    }
    /**
     * 检测农田是否有产出，有产出派出一个boy去收集
     */
    private autoCheck():void{
        if(GameModel.ins.boy_gold>0){
            //this.arrMother[0].setActionType(ActionType.Left);
        }
    }
    
    /**
     * 
     */
    public update():void{
        for(let boy of this.arrMother){
            boy.update();
        }
        this.autoCheck();
    }
    /**
     * 得到可以装载的数量
     * @param loadCount 妈妈装载限额
     */
    public getLoadGold(loadCount:number):number{
        return this.boys.getGold(loadCount);
    } 
      
    
}