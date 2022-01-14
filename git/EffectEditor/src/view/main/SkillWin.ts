/*
* 技能界面
2020-01-09 andy
*/
class SkillWin extends BaseWindow{
    private arrData:Array<Cfg_Skill>;
    private skill:BaseSkill;
    private dicSkill:Dictionary<BaseSkill>;
    private isBgWhite:boolean=true;

    private self:SelfKing;
    private enemy:EnemyKing;
    public ui:SkillUI;
    constructor(){
        super(SkillUI);
    }

    init():void{
        super.init();
        this.ui=this.view as SkillUI;
        this.dicSkill=new Dictionary<BaseSkill>();
        this.self=new SelfKing();
        this.self.x = Define.DeviceW>>1;
        this.self.y = 1000;
        this.enemy=new EnemyKing();
        this.enemy.x = Define.DeviceW>>1;
        this.enemy.y = 600;
        
        this.ui.addChild(this.enemy);
        this.self.atkTarget = this.enemy;
        this.self.spBody.rotation=270;

        let level:Cfg_Level = DataConfig.ins.getLevel(1);
        this.self.init();
        this.self.setData(level);
        this.ui.addChild(this.self);
    }
    open():void{
        super.open();
        this.ui.menu.selectHandler=Laya.Handler.create(this,this.selectMenu,null,false);
        this.ui.list.renderHandler = Laya.Handler.create(this,this.renderHandler,null,false);
        this.ui.list.selectHandler = Laya.Handler.create(this,this.selectHandler,null,false);
        //默认是false
        this.ui.list.selectEnable=true;
        this.selectMenu(0);

        this.ui.menu.labels="子弹,挥刀";

    }
    public close():void{
        if(this.skill){
            this.skill.stop();
        }
        super.close();
    }

    public viewClick(sp:Laya.Sprite):void{
        super.viewClick(sp);
        let spName:string=sp.name;
        switch(spName){
            case "btnClose":
               UIManager.ins.closeWindow(CustomWindow.frame);
            break;
            case "btnBgColor":
                this.isBgWhite = !this.isBgWhite;
                this.ui.spBgColor.graphics.drawRect(0,0,Define.DeviceW,Define.DeviceH,this.isBgWhite?"#ffffff":"#000000");
            break;
            default:
            break;
        }
        
    }

    private selectMenu(ne?:any):void{
        let index:number = Number(ne);
        this.arrData= SkillManager.ins.getCfgs();
        this.ui.list.array= this.arrData;
    }


    renderHandler(item:FrameUI,index:number):void{
        var data:Cfg_Skill = this.arrData[index];
        item.name= "item_"+index;
        let btn:Laya.Button = item.getChildByName("btnEffect") as Laya.Button;
        btn.label=data.skillName;
    }
    selectHandler(index:number):void{
        if(this.skill){
            this.skill.stop();
        }
        var data:Cfg_Skill = this.arrData[index];
        this.skill = this.dicSkill.get(data.skillId);
        if(!this.skill){
            let skillData:SkillData = new SkillData(data,this.self,this.self.atkTarget);
            this.skill = SkillManager.ins.getSkill(skillData);
            
            this.dicSkill.add(data.skillId,this.skill);
            
        }else{
            
        }
        this.skill.play();
        this.ui.addChild(this.skill.atkingEft);
        // TipManager.ins.showWord("选择成功！",0,0);
    }
}