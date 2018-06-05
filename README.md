cocos2d-Js 攻击特效

预览方法：
讲publish下html5 目录里的文件放入webserver下运行，外部目录的为源码。

---------------------------------------------------------------------
场景初始化10只队伍:
/**
* @func
* @desc  初始化10只队伍
* @param {array} data_array  格式[{id: '0001', name: '战队 A', url: 'res/img/team_bg.png'},{id: '0002', name: '战队 B', url: 'res/img/team_bg.png'}]
* @returns 
*/
FLAG_INITTEAM(data_array)

---------------------------------------------------------------------
攻击特效：
 /**
* @func 
* @desc 向舞台添加攻击特效，可以只传一个 持续时间 参数，也可以什么都不传完全随机。
* @param {object} _pos_start     起点坐标格式 cc.p(x,y)
* @param {object} _pos_end       终点点坐标格式 cc.p(x,y)
* @param {number} action_time    特效持续时间
*/
FLAG_ATTCAKING_ACTION(_pos_action_start, _pos_action_end, _action_time)

---------------------------------------------------------------------
更换队伍:
/**
* @func
* @desc  换队
* @param {object} obj  格式{id: '0001', name: '战队 A', url: 'res/img/team_bg.png'}
* @returns 
*/
FLAG_CHANGE_TEAM(obj)
