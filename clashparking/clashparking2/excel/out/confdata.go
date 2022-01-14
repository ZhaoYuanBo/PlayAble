package conf
import (
	"io/ioutil"
	"encoding/json"
	"leaf/log"
)
type Cfg_Action struct {
	id		int32
	skin		string
	actionType		int32
	actionDirect		int32
	frameCount		int32
	frameRate		int32
	width		int32
	height		int32
	offX		int32
	offY		int32
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
}
var Cfg_Action_Pool struct {
	Items			[]*Cfg_Action
}
type Cfg_Frame struct {
	id		int32
	skin		string
	count		int32
	rate		int32
	width		int32
	height		int32
	desc		string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
}
var Cfg_Frame_Pool struct {
	Items			[]*Cfg_Frame
}
type Cfg_Monster struct {
	id		int32
	type		int32
	name		string
	skin		string
	hp		int32
	atk		int32
	atkedRadis		int32
	atkedX		int32
	atkedY		int32
	moveSpeed		int32
	coin		int32
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
}
var Cfg_Monster_Pool struct {
	Items			[]*Cfg_Monster
}
type Cfg_Skill struct {
	skillId		int32
	skillName		string
	skin		string
	actionType		int32
	skillType		int32
	atk		int32
	atkDistance		int32
	atkCD		int32
	atkEft		int32
	atkX		int32
	atkY		int32
	atkingEft		int32
	atkingX		int32
	atkingY		int32
	atkingSpeed		int32
	atkingCount		int32
	atkingRotation		int32
	atkedEft		int32
	atkSound		string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
}
var Cfg_Skill_Pool struct {
	Items			[]*Cfg_Skill
}
type Cfg_Level struct {
	lvl		int32
	exp		int32
	skin		string
	name		int32
	hp		int32
	mp		int32
	atk		int32
	cri		int32
	criRate		int32
	atkDistance		int32
	moveSpeed		int32
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
			string
}
var Cfg_Level_Pool struct {
	Items			[]*Cfg_Level
}
func init(){
	err:=InitCfgData()
	if err!=nil{
		log.Fatal("InitCfgData:%v",err)
	}
}
func InitCfgData() error {
	var data []byte
	var err error
	data, err = ioutil.ReadFile("conf/data/cfg_action.json" )
	if err != nil {
		return err
	}
	err = json.Unmarshal(data,&Cfg_Action_Pool)
	if err != nil {
		return err
	}
	data, err = ioutil.ReadFile("conf/data/cfg_frame.json" )
	if err != nil {
		return err
	}
	err = json.Unmarshal(data,&Cfg_Frame_Pool)
	if err != nil {
		return err
	}
	data, err = ioutil.ReadFile("conf/data/cfg_monster.json" )
	if err != nil {
		return err
	}
	err = json.Unmarshal(data,&Cfg_Monster_Pool)
	if err != nil {
		return err
	}
	data, err = ioutil.ReadFile("conf/data/cfg_skill.json" )
	if err != nil {
		return err
	}
	err = json.Unmarshal(data,&Cfg_Skill_Pool)
	if err != nil {
		return err
	}
	data, err = ioutil.ReadFile("conf/data/cfg_level.json" )
	if err != nil {
		return err
	}
	err = json.Unmarshal(data,&Cfg_Level_Pool)
	if err != nil {
		return err
	}
	return nil
}
