
declare module game.ui {
    import View = Laya.View;
    /**
     * UI基类
     * @private 2019-03-20
     * @author andy
     */
    class BaseUI {
        constructor();
        public open():void; 
        public close():void;
        public detory():void; 
    }
    /**
     * 窗体基类
     * @private
     * @author andy
     */
    class BaseWindow extends BaseUI {
        public uiType:UIType;
        public view:Laya.Scene;

        constructor(viewCls:any);
        /**执行一次 */
        protected init():void;
        /**窗体是否打开 */
        public isOpen():boolean;
        /**窗体打开 */
        public open():void;
        /**横屏时布局设置 */
        public scaleH():void;
        /**竖屏时布局设置 */
        public scaleV():void;
        /**窗体点击事件 */
        public viewClick(sp:Laya.Sprite):void;
    }
    /**
     * 窗体类型
     * @private
     * @author andy
     */
    class UIType {
        /**窗体名字 */
        public name:string;
        /**窗体路径 */
        public path:any;
        constructor(v:string,v2:View|any);
    }
    
    /**
     * 窗体管理类
     * @private
     * @author andy
     */
    class UIManager {
        public static readonly ins:UIManager;
        constructor();
        /**初始化UIManager */
        public init(): void;
        /**获得窗体 */
        public getWindow(uiType:UIType):any;
        /**打开窗体 */
        public openWindow(uiType:UIType):BaseWindow;
        /**关闭窗体 */
        public closeWindow(uiType:UIType):void;

        /**删除UI */
        public removeChild(child: Laya.View):Laya.Node;
        /**删除某层UI */
        public removeLayerAllChild(layerNum:LayerName):void;
        /**
         * 增加序列帧动画
         * @param frame 
         */
        public addFrameAnimation(frame:BaseFrame,layer?:LayerName):BaseFrame;
        /**
         * 删除序列帧动画
         * @param frame 
         */
        public removeFrameAnimation(frame:BaseFrame):void;
    }
    /*
    *2019-06-19 andy 
        屏幕缩放 UI适配
    */
    class UIScaleManager{
        public static readonly ins:UIScaleManager;
        constructor();
        /**
         * UI屏幕缩放适配初始化
         */
        public init():void;
        /**
         * 注册横竖屏时事件
         * @param name 窗体名字
         * @param scaleH 缩放UI横屏回调
         * @param scaleV 缩放UI竖屏回调
         */
        public regUI(name:string,scaleH:Function,scaleV:Function):void;
        /**
         * 可以手动调用
         */
        public autoScale():void;
    }
	/**
	 * 序列帧动画
	 */
	export class BaseFrame extends Laya.Animation{
		/**帧动画名字 */
		public frameName:string;
		/**序列动画帧数 */
		public frameCount:number;
		/**是否循环播放 */
		public isLoop:boolean;
        /**是否加载后在动播放 */
		public isAutoPlay:boolean;
        /**添加到那层 */
		public layer:LayerName;
        /**图集名字 */
		public atlasName:string;
		/**皮肤资源是否加载 */
		public isLoad:boolean;

		/**
		 * 
		 * @param frameName 
		 * @param frameCount 
		 * @param isLoop 
		 * @param isAutoPlay 
		 * @param layer 
         * @param atlasName
		 * @param callBack 
		 */
		constructor(frameName:string,frameCount:number,isLoop?:boolean,isAutoPlay?:boolean,layer?:LayerName,atlasName?:string,callBack?:Laya.Handler);
		/**
		 * 需在子类设置
		 */
		public init():void;
		/**
		 * 加载动画图集
		 */
		public setAtlas():void;
		/**
		 * 播放序列帧动画
		 */
		public playFrame():void;
		/**
		 * 停止序列帧动画
		 */
		public stopFrame():void;
		
		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;
        /**
		 * 动画播放完回调函数
		 * @param ev 
		 */
		protected onStop(ev: Laya.Event):void;
	}
}
declare module game.scene{
    /*
    * 2019-04-07 andy
        层级管理
    */
    class LayerManager{
        public static readonly ins:LayerManager;
        constructor();

        public init(): void;

        /**
         * 添加显示对象
         * @param child 
         * @param layerNum 
         */
        public addChild(child: Laya.View|any,layerNum?:LayerName):any;
        /**
         * 删除显示对象
         * @param child 
         * @param layerNum 
         */
        public removeChild(child: Laya.View,layerNum?:LayerName):Laya.Node;
        /**
         * 删除某层的全部对象
         * @param layerNum
         */
        public removeLayerAllChild(layerNum:LayerName):void;
        /**
         * 添加显示对象
         * @param child 
         * @param layerNum 
         */
        public getLayer(layerNum?:LayerName):Laya.Sprite;
    }
    /**游戏层级名字 */
    enum LayerName{
        root,
        scene,
        scene_map,
        scene_king,
        main,
        window,
        top
    }
    /*
    * 2019-04-16 andy
        场景管理
    */
    export class SceneManager{

        public static readonly ins:SceneManager;
        constructor();

        public init(): void;

        /**
         * 设置地图背景
         * @param url 图片路径
         * @param x  
         * @param y 
         * @param w  
         * @param h 
         */
        public setBackground(url:Base64Type,x?:number,y?:number,w?:number,h?:number):void;

        /**
         * 删除场景所有地图
         */
        public clearMapAll():void;
    }

    /**
     * 横屏时空白区域填充模式
     */
    export enum ScreenFillType{
        /**不填充 */
        default,
        /**只有logo和下载按钮 */
        simple,
        /**logo，下载，两边各增加一个装饰图 */
        nice1,
        /**logo，下载，两边全面填充 */
        nice2
    }
    /*
    * 2019-05-24 andy
        3D场景管理
    */
    export class Scene3DManager{
        public static readonly ins:Scene3DManager;
        constructor();
        /**
         * 初始化3D场景
         * @param scene 摄像机名字设置为Unity默认名字： Main Camera
         */
        public init(scene?:Laya.Scene3D):void;
        /**获得3D场景 */
        public readonly scene3D:Laya.Scene3D;
        /**获得摄像机 */
        public readonly camera:Laya.Camera;
        /**获得灯光 */
        public readonly light:Laya.DirectionLight;
        /**
         * 绘制射线
         * @param from 起点
         * @param to   终点
         */
        public drawRayLine(from:Laya.Vector3,to:Laya.Vector3):void;
    } 
} 

declare module game.common {
    /*
    * 2019-03-20 andy
    事件分发器
    */
    class EventManager extends Laya.EventDispatcher{
        /**单列模式 */
        public static readonly ins:EventManager;
        constructor();
        public init():void;

        event(type:string,data?:any):boolean;
    }
    /*
    * 2019-03-20 andy
    事件
    */
    class NoticeEvent{
        public data:any;
        public type:string;
        constructor(type:string,data?:any);
        /**平台初始化完成 */
        public static PLATFORM_INIT_OVER:string;
        /**平台登录成功 */
        public static PLATFORM_LOGIN_SUCCESS:string;
        /**平台登录失败 */
        public static PLATFORM_LOGIN_FAIL:string;
        /**资源加载完成 */
        public static GAME_RES_LOAD_FINISH:string;
        /**http请求进度 */
        public static HTTP_PROGRESS:string;
        /**获得焦点事件 */
        public static SYS_FOCUS:string;
        /**失去焦点事件 */
        public static SYS_BLUR:string;
        /**竖屏事件 */
        public static SYS_SCREEN_VERTICAL:string;
        /**横屏事件 */
        public static SYS_SCREEN_HORIZONTAL:string;
        /**竖屏事件,引擎已经执行完毕 */
        public static SYS_SCREEN_VERTICAL_ONSIZE:string;
        /**横屏事件,引擎已经执行完毕 */
        public static SYS_SCREEN_HORIZONTAL_ONSIZE:string;

        /**图片转文字 */
        public static AI_IMAGE_TO_WORD:string;
        //子域
        /**尺寸发生变化 */
        public static ZY_RESIZE:string;
        /**登录成功 */
        public static ZY_LOGIN:string;
        /**显示排行 */
        public static ZY_RANK:string;
        /**上报分数 */
        public static ZY_SCORE:string;
    } 
   
    /*
    * 2019-02-28 andy
    资源管理器
    */
    class ResManager{
        /**单列模式 */
        public static readonly ins:ResManager;
        constructor();
        /**预加载资源 */
        public preload(arrUrl:any,callBack:Laya.Handler,progress:Laya.Handler):void;
        public init(callBack:Laya.Handler,progress:Laya.Handler):void;
    }

    /*
    * 2019-02-28 andy
    声音管理器
    */
    class SoundManager{
        /**声音是否播放 默认是true*/
        public isOn:boolean;
        /**是否震动 默认是true*/
        public isShake:boolean;
        /**单列模式 */
        public static readonly ins:SoundManager;
        constructor();
        /**预加载声音 */
        public preload(arrUrl:any,callBack:Laya.Handler,progress:Laya.Handler):void;
        /**初始化声音 */
        public init(callBack:Laya.Handler):void;      
        /**设置声音开关 */
        public setOn(v:boolean):void;

        /**播放背景声音 */
        public playMusic(bt:Base64Type):void;
        /**播放声音 */
        public playSound(bt:Base64Type):void;
        /**终止声音 */
        public stopSound(soundName:string):void;
    }

    /*
    * 2019-03-03 andy
    提示信息管理
    */
    class TipManager{
        /**单列模式 */
        public static readonly ins:TipManager;
        constructor();
        /**
         * 图片提示
         * @param url 图片展示
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH 默认Y轴上下滑动距离50，Y轴滑动值
         */
        public showImg(url:string,x?:number,y?:number,offH?:number):void;
        /**
         * 文字提示
         * @param url 图片展示
         * @param x 默认为0，X轴居中显示
         * @param y 默认为0，Y轴居中显示
         * @param offH Y轴浮动距离，默认为-50
         * @param fontSize 字体大小，默认为40
         * @param fontColor 字体颜色，默认为黑色
         */
        public showWord(msg:string,x?:number,y?:number,offH?:number,fontSize?:number,fontColor?:string):void;
    }
    /*
    * 2019-03-05 andy
    微信开放数据管理
    */
    class OpenManager{
        public isDrawOpenView:boolean;
        public static readonly ins:OpenManager;
        constructor();

        public init(): void;
        public postMsg(cmd:string,data?:any):void;
        public resizeStage():void;
        public initOpenView():void;
        public changeOpenParent(parent:Laya.Sprite,x?:number,y?:number):void;
        public updateOpenView():void;
        public drawOpenView():void;

        public setLogin():void;
        public setShareTicket():void;
        public updateScore():void;
        public showRankView(type?:string):void;
        public showOverView():void;
        public showBeOverView():void;

        public noticeUILoaded(data:any):void;
    }
    /*
    2019-04-01 andy 
    * 触摸管理器
    监听NoticeEvent.TOUCH_DIRECTOR,返回{dir:SwipeDirection,startP:Laya.Point,endP:Laya.Point}
    */
    class TouchManager{
        constructor();
        public static readonly ins:TouchManager;

        public init(): void;
        /**
         * 设置触摸是否有效
         * @param v 
         */
        public setTouch(v:boolean):void;
    }
    /*
    * 滑动方向;
    */
    enum SwipeDirection{
        Non,
        Left,
        Right,
        Up,
        Down
    }
    /*
    *2019-04-28 andy 
    公用工具方法
    */
    export class TweenManager{
        public static readonly ins:TweenManager;
        constructor();
        /**
         * 注册twwen
         * @param tt 
         */
        public regTween(tt:TweenTarget):void;
        /**
         * 播放动画 
         * @param loop 
         * @param name 
         */
        public play(loop: boolean, name: string): void;
        /**
         * 停止动画
         * @param name 
         * @param isHide 是否隐藏,默认为true
         */
        public stop(name: string,isHide?:boolean):void;
        /**
         * 创建属性集合
         * @param tpt TweenPropType 类型
         * @param param 可在枚举 TweenPropType查看
         */
        public creatProp(tpt:TweenPropType,param?:Array<number>):Array<TweenProp>;
        /**
         * 重置动画属性
         * @param name 缓动名字，唯一标识
         * @param tpt  属性类型
         * @param param  参数
         * @param delayTime 延时时间 
         */
        public resetProp(name: string,tpt:TweenPropType,param?:Array<number>,delayTime?:number);
    }
    
    export class TweenTarget{
        public id:string;
        public target:any;
        public arrProp:Array<TweenProp>;
        public delayTime:number;

        constructor(id:string,target:Laya.Sprite,arrProp:Array<TweenProp>,delayTime:number);
        
        /**
         * 播放动画
         * @param isLoop 默认为true
         */
        public play(isLoop?:boolean):void;
        /**
         * 停止动画
         * @param isHide 默认为true
         */
        public stop(isHide?:boolean):void;
        /**
         * 停止所有动画
         */
        public clearAll():void;
        /**
         * 重置缓动属性
         * @param arrProp 
         * @param delayTime 
         */
        public resetProp(arrProp:Array<any>,delayTime?:number):void;
    }
    /*
    * 2019-04-29 andy
    Tween缓动属性类型
    */
    export class TweenProp{
        /**持续时间 */
        public duration:number;
        /** x*/
        public x:number;
        /** y */
        public y:number;
        /** alpha 默认是1*/
        public alpha:number;
        /** rotation 默认是0*/
        public rotation:number;

        constructor(duration:number,x?:number,y?:number,alpha?:number,rotation?:number);
    }
    /*
    * 2019-05-07 andy
    Tween缓动属性集合类型
    */
    enum TweenPropType{
        /**不倒翁晃动 1.角度*/
        PING_PANG,
        /**乒乓球上下晃动 1.Y 2.Y偏差 3.时间 默认200*/
        PING_PANG_1,
        /**乒乓球左右晃动 1.X 2.X偏差*/
        PING_PANG_2,
        /**横向滑动 1.持续时间 2.起始X 3.终点X*/
        GUIDE_SLID_1,
        /**竖向滑动 1.持续时间 2.起始Y 3.终点Y*/
        GUIDE_SLID_2,
        /**点击效果 1.Y偏差*/
        GUIDE_CLICK
    }
    
}

declare module game.king{
    /**
	 * 人物基类
	 */
	export class BaseKing extends Laya.Animation{
		/**皮肤数据 */
		public skinData:SkinData;

		/**当前动画类型 */
		public curAticonType:ActionType;
		/**当前状态 */
		public curAticonState:ActionState;
        /**当前运动速度 */
		public speed:number;
        /**皮肤资源是否加载 */
		public isLoad:boolean;

		constructor();
		/**
		 * 需在子类设置
		 */
		public init():void;
        /**
		 * 设置皮肤
		 * @param skinData 皮肤数据
		 * @param isAdd    是否显示,默认是true
		 */
		public setSkin(skinData:SkinData,isAdd?:boolean):void;

		/**
		 * 设置动作类型
		 * @param at 动作类型
         * @param isLoop 是否循环
		 */
		public setActionType(at:ActionType,isLoop?:boolean):void;
		/**
		 * 设置动作状态
		 * @param as 动作状态
		 */
		public setActionState(as:ActionState):void;
        /**
		 * 注册这个动作完成后，下个动作该做啥动作
		 * @param at 
		 * @param atNext 
		 */
		public regAtcionTypeNext(at:ActionType,atNext:ActionType):void;
        /**
		 * update
		 */
		public update():void;
        /**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;
	}
    /**
	 * 动作数据
	 */
	export class Action{
		/**动作类型 */
		public actionType:ActionType;
		/**动作帧数 */
		public frameCount:number;
		/**
		 * 
		 * @param actionType 动作类型
		 * @param frameCount 动作帧数
		 */
		constructor(actionType:ActionType,frameCount:number)
	}
	/**
	 * 皮肤数据
	 */
	export class SkinData{
		/**图集名字 */
		public atlasName:string;
		/**角色类型 */
		public kingType:string;
		/**图集动画行数 */
		public cutRow:number;
		/**图集动画列数 */
		public cutCol:number;
		/**图集动画零散集合，默认走行列切割，如果提供此值，优先处理 */
		public arrAction:Array<Action>;
		constructor(atlasName:string,kingType:string,arrAction:Array<Action>,cutRow?:number,cutCol?:number);
	}
     /*
    * 2019-04-07 andy
        人物管理
    */
    class KingManager{
        public static readonly ins:KingManager;
        constructor();
        public init(): void;

        public addKing(king:BaseBone):BaseBone;

        public removeKing(king:BaseBone):void;
        
    }
	/**
	 * 2019-04-21 andy
	 * 骨骼基类
	 */
	export class BaseBone extends Laya.Skeleton{
		/**角色类型 【图集名字】 */
		public kingType:string;
		/**图集动画对应动作类型 */
		protected arrActionType:Array<ActionType>;

		/**当前动画类型 */
		public curAticonType:ActionType;
		/**当前状态 */
		public curAticonState:ActionState;
		/**当前运动速度 */
		public speed:number;
		/**皮肤资源是否加载 */
		public isLoad:boolean;

		constructor(objId:number,type:string,sk:Laya.Skeleton);
        /**
		 * 唯一标识ID
		 */
		public readonly objId:number;
		/**
		 * 需在子类设置
		 */
		public init():void;
        /**
		 * 按顺序播放动作类型
		 */
		public playRand():void;
		/**
		 * 设置动作类型
		 * @param at 动作类型
		 */
		public setActionType(at:ActionType):void;
		/**
		 * 设置动作状态
		 * @param as 动作状态
		 */
		public setActionState(as:ActionState):void;
		/**
		 * update
		 */
		public update():void;

		/**
		 * label事件 this.addLabel('AniPic1', 1);
		 * @param ev 
		 */
		protected onLabel(ev: Laya.Event):void;

		protected onRemoved(e:Event):void;
	}

    /*
    * 2019-04-07 andy
        骨骼动画管理
    */
    export class BoneManager{
        public static readonly ins:BoneManager;
        constructor();

        public init(): void;

        public addBone(boneType:BoneType):number;
        /**
         * 根据唯一标识ID获得骨骼对象
         * @param objId 唯一标识ID
         */
        public getBone(objId:number):BaseBone;
        public removeBone(king:BaseBone):void;
        /**
         * 移除所有骨骼动画
         */
        public removeBoneAll():void;
    }

    /*
    * 骨骼类型
    */
    export class BoneType{
        /**骨骼名字 */
        public name:string;
        /**骨骼路径 */
        public path:string;
        /**模板创建示例类型 0.模板缓存，内存小，不能换装 1. 动画缓存，内存大，能换装*/
        public cacheType:number;
        constructor(v:string,v2:string,v3:number);
    }


    /*
    * 动作类型;
       0.Wait 1.Left 2.Right 3.Up 4.Down
    */
    enum ActionType{
        /**0 待机 */
		Wait,
		/**1 左移 */
        Left,
		/**2 右移 */
        Right,
		/**3 上移 */
        Up,
		/**4 下移 */
        Down,
		/**5 左上移 */
		Left_up,
		/**6 左下移 */
		Left_down,
		/**7 右上移 */
        Right_up,
		/**8 右下移 */
        Right_down,
		/**9 跳跃 */
		JUMP,
		/**10 翻滚 */
		ROLL,
		/**11 攻击 */
		ATTACK,
		/**12 被攻击 */
		ATTACKED,
		/**13 死亡 */
		DEAD
    }
     /*
    * 动作状态;
    */
    enum ActionState{
        /**待机状态 */
        NONE,
		/**移动状态 */
        MOVE,
		/**跳跃状态 */
		JUMP,
        /**翻滚状态 */
		ROLL,
		/**攻击状态 */
        ATTACK,
		/**死亡状态 */
        DEAD
    }
}

declare module game.util {
    /*
    *2019-03-11 
    公用工具方法
    */
    class PubUtil{
        constructor();
        /** 
         * 2019-03-20 得到今天的年月日
        */
        public static GetTodayDateStr():string;
    }
    /*
    * 数学工具类
    */
    class MathUtil{
        constructor();
        /**
         * 随机产生一个范围的值 
         * @param min 最小值
         * @param max 最大值
         */
        public static randomRange(min:number,max:number):number;
        /**
         * 判断两个矩形是否有重叠区域
         * @param rect1 矩形1
         * @param rect2 矩形2
         */
        public static isOverlap(rect1, rect2):boolean;
        /**
         * 角度转成弧度
         * @param angle 角度
         */
        public static angleToRadian(angle:number):number;
        /**
         * 弧度转成角度
         * @param radian 弧度
         */
        public static radianToAngle(radian:number):number;
        /**
         * 把一般角度转换成0-360度
         * @param angle 角度 
         */
        public static changeAngle360(angle:number):number;
        /**
         * 创建贝塞尔曲线
         * @param anchorpoints 点
         * @param pointsAmount 
         */
        public static CreateBezierPoints(anchorpoints, pointsAmount):Array<any>;
    }
	export class Dictionary<T>{
		public readonly container:Object;

		public readonly length:number;

		constructor();
		
		/**
		 * 添加元素 
		 * @param key
		 * @param value
		 * 
		 */		
		public add(key:any, value:T):T;
		public forEach(func:Function):void;

		public forIn(func:Function):void;

		public valueOf():T[];

		/**
		 * 根据键值获取对象 
		 * @param key
		 * @return 
		 * 
		 */		
		public get(key:any):T;
		
		/**
		 * 重新设置 
		 * @param key
		 * @param value
		 * 
		 */		
		public reset(key:any, value:T):void;
		
		/**
		 * 是否包含键 
		 * @param key
		 * @return 
		 * 
		 */		
		public hasKey(key:any):boolean;
		
		/**
		 * 移除键 
		 * @param key
		 * 
		 */		
		public remove(key:any):T;
		
		/**
		 *清除操作 
		 * 
		 */		
		public clear():void;
	}
}

declare module game{
   /*
    * 2019-02-28 andy 
    全局游戏常量定义
    */
    class Define{
        constructor();
        /**是否测试模式 */
        public static isDebug:boolean;
        /**设备宽度 */
        public static DeviceW:number;
        /**设备高度 */
        public static DeviceH:number;
        /**游戏资源根目录 */
        public static CDN:string;
        /**服务端HTTP */
        public static serverHttp:string;
        /**服务端websocket地址 */
        public static serverIP:string;
        /**服务端websocket端口 */
        public static serverPort:string;
        /**网关HTTP地址 */
        public static serverConfigUrl:string;
        /**是否竖屏游戏 */
        public static isVertitalGame:boolean;
        /**是否竖屏状态 */
        public static isVertitalState:boolean;
        /**横竖屏转换时，是否等比缩放,默认是false，若为true需要自己处理逻辑 */
        public static isSameScale:boolean;
        /**横竖屏转换时，背景图是否等比缩放,默认是true，若为false一般背景图不会上下左右移动，固定背景 */
        public static isSameBackgroundScale:boolean;
        /**竖屏游戏-横屏时填充模式 或者 横屏游戏-竖屏时填充模式*/
        public static screenFillType:ScreenFillType;
        
        /**游戏ID */
        public static gameId:number;
        /**游戏版本号 */
        public static gameVersion:string;
        /**语言类型 */
        public static langId:LangType;
        /**是否单机游戏 */
        public static isLocal:boolean;

        /**微信APPID */
        public static appId:string; 

	    /**点击按钮时的声音 */
        public static SOUND_BTN:string;
        /**点击按钮时的声音 */
        public static SOUND_MAIN:Base64Type;

        /**下载地址 */
        public static DOWNLOAD_URL:string;
        /**游戏背景颜色 */
        public static BACKGROUND_COLOR:string;
    }

    
    /*
    * 2019-02-27 andy
    全局基类
    */
    class Global{
        constructor();
        /**UI根节点 */
        public static uiRoot:Laya.Sprite;
        /**全局平台 */
        public static platform:IPlatform;
        /**平台ID */
        public static platformId:PlatformID;
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

declare module game.platform{
    /*
    * 2019-03-20
    平台管理
    */
    class PlatformManager{
        /** 微信平台 */
        public static wxPlatform:WxPlatform;
        /** FaceBook平台 */
        public static fbPlatform:FaceBookPlatform;
        /** Applovin平台 */
        public static alPlatform:ApplovinPlatform;
        /** IronSource平台 */
        public static isPlatform:IronSourcePlatform;
        /** MTG平台 */
        public static mtgPlatform:MTGPlatform;
        /**单列模式 */
        public static readonly ins:PlatformManager;
        constructor();

        
        /**先初始化平台 
            getRandomShare:Laya.Handler;
            getAdData:Laya.Handler;
            getAdVideoData:Laya.Handler;
            isCanPlayVideo:Laya.Handler;
        */
        public init(data?:any): void;

        public static wx():any;
        public static window():any;
        public static fileSysMgr():any;
        /**
         * 平台动作，暂时只有MTG调用
         * @param pa PlatformAction
         * @param para 参数
         */
        public actionCallBack(pa:PlatformAction,para?:any):void;
    }
    enum PlatformID{
        None,
        /**微信 */
        Wx,
        /**FaceBook */
        Fb,
        /**APPLovin */
        Al,
        /**IronSource */
        Is,
        /**MTG */
        mtg
    }
    export enum LangType{
        /**中文 */
        Zh,
        /**英文 */
        En
    }
    enum PlatformAction{
        None,
        /**下载 主动*/
        DownLoad,
        /**GameEnd 主动必须*/
        GameEnd,
        /**GameReady 主动*/
        GameReady,
        /**GameStart 被动调用*/
        GameStart,
        /**GameClose 被动调用*/
        GameClose
    }

    interface IPlatform{
        /**初始化 */
        init();
        /**初始化换皮游戏*/
        initSkinGame();
        /**登录平台 */
        login();
        /**登录成功 */
        loginSuccess():void;

        /**初始化道具 */
        initItem():void;
        /**保存道具 */
        saveItem(ID:number,count:number,type:number);
        /**上报分数 */
        scoreUp(rank:number,score:number):void
        /**把数据保存到云端 */
        setUserCloudStorage(key:any,value:any):void;
        
        /**分享*/
        share(func:Function,queryKey?:string):void; 
        /**创建图片广告 */
        createBannerAd(adName:string):void;
        /**显示图片广告 */
        showBannerAd(isShow:boolean):void;
        /**销毁图片广告 */
        destroyBannerAd():void;
        /**视频广告 */
        createVideoAd(adName:string,callBack:Laya.Handler):void;
        /**更多游戏按钮 */
        addMoreGameBtn(view:Laya.View|any):void;
        /**多引擎的创建标识方法 */
        createBrandSprite(view:Laya.View|any,x:number,y:number):void;

        /**获取设备本地图片 */
        getLocalImage(type:number):void;
        /**保存图片 */
        saveImageToPhotosAlbum(url:string):void;
        /**使用设备振动 短震动15ms，长震动400ms*/
        shake(isShort:boolean,delay:number):void;   
        /**向子域发送消息 */
        postMsg(postName:string,obj:any):void;
    }

    /*
    * 平台基类
    */
    class LocalPlatform implements IPlatform{
        public window:any;
        public fileSysMgr:any;
        /**图片广告对象 */
        public bannerAd:any;
        /**视频广告对象 */
        public videoAd:any;
        /**分享成功后的回调函数 */
        public shareAppSuccess:Function;

        constructor();

        public init():void;
        public initSkinGame():void;
    
        public login():void;
        public loginSuccess():void;      
        public initItem():void;
        public saveItem(ID:number,count:number,type:number):void;
        public scoreUp(rank:number,score:number):void;

        public share(func:Function,queryKey?:string):void;
        public createBannerAd(posKey:string);
        public showBannerAd(isShow:boolean);
        public destroyBannerAd();
        public createVideoAd(posKey:string,success:Laya.Handler);
        public addMoreGameBtn(parent:Laya.Sprite);
        public createBrandSprite(parent:Laya.Sprite,x:number,y:number);
        public postMsg(postName:string,obj:any):void;
        
        public shake(isShort:boolean,delay:number):void;
        public saveImageToPhotosAlbum(url:string):void;
        public setUserCloudStorage(key:any,value:any):void;
        public getLocalImage(type:number):void;

        /**获得焦点时，前台运行 */
        protected onShowCallBack(res:any):void;
        /**失去焦点时，后台运行 */  
        protected onHideCallBack():void;
    }
    /*
    * 2019-03-20 andy 
    微信平台
    */
    class WxPlatform extends LocalPlatform{
        public wx:any;
        constructor();

        protected onShowCallBack(res:any):void;
        protected onHideCallBack():void;

        getWxUserInfo():void;
        initSysInfo():void;
        showModal(title:string,content:string,isCancel?:boolean);
        removeUserCloudStorage(key:string):void;       
    }
    /*
    * facebook
    2018-12-08 andy
    */
    class FaceBookPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
     /*
    * Applovin
    2019-05-01 andy
    */
    class ApplovinPlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
     /*
    * IronSource
    2019-05-01 andy
    */
    class IronSourcePlatform  extends LocalPlatform{
        constructor();

        init():void;

        initGameSkin():void;

        login():void;

        loginSuccess():void;

        initItem():void;

        saveItem(ID:number,count:number,type:number):void;

        scoreUp(rank:number,score:number):void;
    }
    /*
    * MTG 国内平台 https://www.mintegral.com
    2019-05-16 andy
    */
    export class MTGPlatform  extends LocalPlatform{
        constructor();

        init():void;
        initGameSkin():void;

        login():void;

        loginSuccess():void;
        /**
         * 获取过审状态 
         */
        public getSwitchState():boolean;
        initItem():void;
        saveItem(ID:number,count:number,type:number):void;
        scoreUp(rank:number,score:number):void;
    }
}

declare module game.net{
    /*
    * 2019-04-09 andy
    网络通讯管理
    */
    export class NetManager{
        public static readonly ins:NetManager;
        constructor();

        
        /**初始化 */
        public init(): void ;

        /**
         * 发送message
         * @param data 
         * @param fn 
         */
        public send(data:any,fn:Function):void;
        /**
         * 发送emit
         * @param eventName 
         * @param args 
         */
        public emit(eventName:any,...args:any[]):void;
        /**
         * 添加网络事件观察者
         * @param eventName 
         * @param _callback 
         */
        public registerNetEvent(eventName:string, _callback:Laya.Handler):void;
        /**
         * 删除网络事件观察者
         * @param eventName 
         * @param _callback 
         */
        public unregisterNetEvent(eventName:string, _callback:Laya.Handler):void;
    }
    /**
     * socke.io系统事件
     */
    export class SocketIoEvent{
        /**连接成功 */
        public static connect:string;
        /**连接失败 */
        public static connect_error:string;
        /**连接超时 */
        public static connect_timeout:string;
        /**重新连接成功 */
        public static reconnect:string;
        /**失去连接 */
        public static disconnect:string;
        /**发生错误 */
        public static error:string;
        /**send message*/
        public static message:string;
    }
     /*
    * 2019-03-07 andy
    HTTP请求管理
    */
    class HttpManager{
        /**单列模式 */
        public static readonly ins:HttpManager;
        constructor();

        /**
         * 跳转到网页
         * @param url 跳转地址
         */
        public link(url:string):void;
        /**
         * HTTP GET 访问
         * @param url 
         * @param caller 
         * @param callback 
         */
        public get(url:string,caller:any,callback:any):HttpManager;
        /**
         * HTTP POST 访问
         * @param url 
         * @param data 
         * @param contentType 
         * @param caller 
         * @param callback 
         */
        public post(url:string,data:any,contentType:string,caller:any,callback:any):HttpManager;
    }
}
declare module game.base64{
    /*
    * 2019-04-28 andy
    BASE64图集管理器
    */
    export class Base64Manager{
        /**是否使用BASE64图片 */
        public static isUseBase64:boolean;
        public static readonly ins:Base64Manager;
        constructor();

        public init():void;
        /**
         * 初始化BASE64图集
         * @param arrAtlas
         * @param callBack 
         * @param progress 
         */
        public loadAtlas(arrAtlas:Array<Base64Type>,callBack:Laya.Handler,progress?:Laya.Handler):void;
        /**
         * 初始化BASE64图集
         * @param arrAtlas
         * @param callBack 
         * @param progress 
         */
        public load(arrAtlas:Array<Base64Type>,callBack:Laya.Handler,progress?:Laya.Handler):void
        /**
         * 解析BASE64图集
         * @param base64Type 
         */
        public parseAtlas(base64Type:Base64Type):void;
        /**
         * 自动检测非图集图片
         * @param img 
         * @param base64Type 
         */
        public checkImg(img:any,base64Type:Base64Type):void;
        /**
         * 自动检测视频
         * @param video 
         * @param base64Type 
         */
        public checkVideo(video:any,base64Type:Base64Type):void;
        /**
         * 材质赋值
         * @param mat  Laya.BaseMaterial
         * @param bt   Base64Type
         * @param color  Laya.Vector4
         */
        public checkMaterial(mat:Laya.BaseMaterial,bt:Base64Type,color?:Laya.Vector4):any;
    }
    /*
    * 2019-04-28 andy
    BASE64单个图片类型
    */
    export class Base64Type{
        /** 资源ID*/
        public id:string;
        /** 资源名字 */
        public name:string;
        /**base64 json */
        public base64Json:string;
        /**base64 img */
        public base64Img:string;
        /**param string */
        public paramStr:string;
        /**param number */
        public paramNum:number;
        /**
         * 
         * @param id 
         * @param name 
         * @param base64Json 
         * @param base64Img 
         * @param paramStr 
         * @param paramNum 
         */
        constructor(id:string,name:string,base64Json?:string,base64Img?:string,paramStr?:string,paramNum?:number);
    }
}


declare module ad{
    /*
    * 2019-04-29 andy
    mraid 标准广告接入
    */
    export class mraid{
        public static open(url:string):void;
    }
}
import mraid=ad.mraid;

/**编辑代码时，简化导入，可复制main.ts*/

//全局定义
import Define = game.Define;
import Global = game.Global;
//界面
import BaseUI = game.ui.BaseUI;
import BaseWindow = game.ui.BaseWindow;
import UIManager = game.ui.UIManager;
import UIScaleManager = game.ui.UIScaleManager;
import UIType = game.ui.UIType;
import BaseFrame = game.ui.BaseFrame;
//场景
import LayerManager = game.scene.LayerManager;
import LayerName = game.scene.LayerName;
import SceneManager = game.scene.SceneManager;
import Scene3DManager = game.scene.Scene3DManager;
import ScreenFillType = game.scene.ScreenFillType;
//工具
import MathUtil = game.util.MathUtil;
import PubUtil = game.util.PubUtil;
import Dictionary=game.util.Dictionary;
//通用
import EventManager = game.common.EventManager;
import NoticeEvent = game.common.NoticeEvent;
import ResManager = game.common.ResManager;
import SoundManager = game.common.SoundManager;
import TipManager = game.common.TipManager;
import OpenManager = game.common.OpenManager;
import TouchManager = game.common.TouchManager;
import SwipeDirection = game.common.SwipeDirection;
import TweenManager = game.common.TweenManager;
import TweenTarget = game.common.TweenTarget;
import TweenProp = game.common.TweenProp;
import TweenPropType = game.common.TweenPropType;
//精灵
import BaseKing = game.king.BaseKing;
import SkinData = game.king.SkinData;
import Action = game.king.Action;
import KingManager = game.king.KingManager;
import ActionType = game.king.ActionType;
import ActionState = game.king.ActionState;
import BaseBone = game.king.BaseBone;
import BoneManager = game.king.BoneManager;
import BoneType = game.king.BoneType;
//平台
import PlatformManager = game.platform.PlatformManager;
import PlatformID = game.platform.PlatformID;
import LangType = game.platform.LangType;
import PlatformAction = game.platform.PlatformAction;
import IPlatform = game.platform.IPlatform;
import LocalPlatform = game.platform.LocalPlatform;
import WxPlatform = game.platform.WxPlatform;
//网络
//import Socket=socket.io.Socket;
import NetManager=game.net.NetManager;
import SocketIoEvent=game.net.SocketIoEvent;
import HttpManager = game.net.HttpManager;
//BASE64
import Base64Manager=game.base64.Base64Manager;
import Base64Type=game.base64.Base64Type;

//Laya核心类
import Stage = Laya.Stage;
import Render = Laya.Render;
import Sprite = Laya.Sprite;
import EventData = Laya.EventData;
import Skeleton  = Laya.Skeleton;
import Templet   = Laya.Templet;
import Browser   = Laya.Browser;
import Stat      = Laya.Stat;
import Tween     = Laya.Tween;
import WebGL     = Laya.WebGL;

