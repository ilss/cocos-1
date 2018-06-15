# 夺旗界面特效

```
预览方法：
讲publish下html5 目录里的文件放入webserver下运行，外部目录的为源码。
```
---
> Team 攻击 Tree
> 
> MAIN_EFFECTS_ACTION.FLAG_TEAMATTACKTREE(team_data)
```
* @param {array} team_data  格式
{
    'group_id': 1, // 团队id
    'group_name': '赵信团队', // 团队名称
    'group_icon': '/img/xx.jpg' // 团队头像
}
```
---
> 更换队伍:
> 
> MAIN_EFFECTS_ACTION.FLAG_CHANGE_TEAM(obj)
```
* @param {object} obj 
{
    'group_id': 1, // 团队id
    'group_name': '赵信团队', // 团队名称
    'group_icon': '/img/xx.jpg' // 团队头像
}
```