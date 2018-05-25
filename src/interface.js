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
                    break;
                case 2:
                    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                    break;
                default:
                    return 0;
                    break;
            }
        },
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
            return false;
        }
        MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.attackingAction(_pos_action_start, _pos_action_end, _action_time);
    }
    window["ATTCAKING_ACTION"] = attackingAction;
}(window));