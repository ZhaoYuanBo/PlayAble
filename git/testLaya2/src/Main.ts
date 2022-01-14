console.log("game.core version: 2019-06-10 2.0.0");
//laya2和laya1 同步注意：Base64Manager SceneManager
//全局定义
import Define = game.Define;
import Global = game.Global;Global;
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
//平台
import PlatformManager = game.platform.PlatformManager;
import PlatformID = game.platform.PlatformID;
import LangType = game.platform.LangType;
import PlatformAction = game.platform.PlatformAction;
import IPlatform = game.platform.IPlatform;
import LocalPlatform = game.platform.LocalPlatform;
import WxPlatform = game.platform.WxPlatform;
import FaceBookPlatform = game.platform.FaceBookPlatform;
import ApplovinPlatform = game.platform.ApplovinPlatform;
import IronSourcePlatform = game.platform.IronSourcePlatform;
import MTGPlatform = game.platform.MTGPlatform;

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

