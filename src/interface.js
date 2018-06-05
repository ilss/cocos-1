(function (window) {
    window["MAIN_EFFECTS_ACTION"] = {
        _EFFECTS_MAIN_LAYER: null,
        /**
         * @func 
         * @desc 返回minNum 到 maxNum 之间的随机数，包括minNum 和 maxNum.
         * @param {number} minNum 
         * @param {number} maxNum 
         * @returns 
         */
        randomNum: function (minNum, maxNum) {
            if (typeof minNum !== 'number' || typeof minNum !== 'number') {
                throw new Error('argument has to be Number')
            }
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * minNum + 1, 10);
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                default:
                    return 0;
            }
        },
    }
    /**
     * @func
     * @desc  初始化10只队伍
     * @param {array} data_array  格式[{id: '0001', name: '战队 A', url: 'res/img/team_bg.png'},{id: '0002', name: '战队 B', url: 'res/img/team_bg.png'}]
     * @returns 
     */
    function initTeam (data_array) {
        if (data_array instanceof Array) {
            MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.changeTeam(obj);
        } else {
            throw new Error('changeTeam 参数必须为数组');
        }
    }
    /**
        * @func 
        * @desc 向舞台添加攻击特效
        * @param {object} _pos_start     起点坐标格式 cc.p(x,y)
        * @param {object} _pos_end       终点点坐标格式 cc.p(x,y)
        * @param {number} action_time    特效持续时间
        */
    /** @expose */
    function attackingAction (_pos_action_start, _pos_action_end, _action_time) {
        if (MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER === null) {
            return;
        }
        MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.attackingAction(_pos_action_start, _pos_action_end, _action_time);
    }
    /**
     * @func
     * @desc  换队
     * @param {object} obj  格式{id: '0001', name: '战队 A', url: 'res/img/team_bg.png'}
     * @returns 
     */
    function changeTeam (obj) {
        if (MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER === null) {
            return;
        }
        if (typeof obj !== 'object') {
            throw new Error("changeTeam 参数 格式必须{id: '0001', name: '战队 A', url: 'res/img/team_bg.png'}")
            return;
        }
        MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.changeTeam(obj);
    }

    window["FLAG_INITTEAM"] = initTeam;
    window["FLAG_ATTCAKING_ACTION"] = attackingAction;
    window["FLAG_CHANGE_TEAM"] = changeTeam;
}(window));