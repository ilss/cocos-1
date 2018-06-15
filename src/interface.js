(function (window) {
    window["GLOBAL_FUNC_SIMPLEEDU"] = {
        /**
         * @desc    判断对象自身是否包含某些属性
         * @param {object} obj
         * @param {array} arg_array
         * @returns
         */
        objHasSomeProperty: function (obj, arg_array) {
            if (obj !== undefined && obj instanceof Object) {
                for (var _i = 0, _len = arg_array.length; _i < _len; _i++) {
                    if (!obj.hasOwnProperty(arg_array[_i])) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        },
        /**
         * @desc    从对象数组里找到某个key值相等的对象
         * @param {object} obj   目标对象
         * @param {string} obj_key  目标对象的key
         * @param {array} array    对象数组
         * @param {string} array_key    数组里对象对应的key
         * @returns 存在的对象下标  不存在返回-1
         */
        findObjFromArray: function (obj, obj_key, array, array_key) {
            return array.findIndex(function (item) {
                return item[array_key] === obj[obj_key];
            });
        },
        /**
         * @desc    计算两点角度
         * @param {object} pos1     cc.p(x,y)
         * @param {object} pos2     cc.p(x,y)
         * @returns     两点的角度
         */
        getRotate: function (pos1, pos2) {
            var o = pos1.x - pos2.x,
                a = pos1.y - pos2.y,
                _at = Math.atan(o / a) * 180 / Math.PI;
            if (a < 0) {
                if (o < 0)
                    _at = 180 + Math.abs(_at);
                else
                    _at = 180 - Math.abs(_at);
            }
            _at -= 90;
            return Math.round(_at);
        },
        distanceToActionTime: function (pos1, pos2, move_speed) {
            return cc.pDistance(pos1, pos2) / move_speed;
        },
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        distanceToActionTime: function (start_pos, end_pos, speed) {
            _distance = cc.pDistance(start_pos, end_pos);
            return _distance / speed;
        }
    }



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
                throw new Error('argument has to be Number');
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
     * @param {array} data_array  格式[{id: '0001', name: '战队 A', url: 'res/img/team_bg.png'},{id: '0002', name: '战队 B', icon: 'res/img/team_bg.png'}]
     * @returns 
     */
    function initTeam (data_array) {
        if (data_array instanceof Array) {
            MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.changeTeam(obj);
        } else {
            throw new Error('changeTeam 参数必须为数组');
        }
    }
    function teamAttackTree (team_data) {
        if (GLOBAL_FUNC_SIMPLEEDU.objHasSomeProperty(team_data, ['group_id'])) {
            MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.teamAttackTree(team_data);
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
            throw new Error("MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER is null");
        }
        MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.attackingAction(_pos_action_start, _pos_action_end, _action_time);
    }
    /**
     * @func
     * @desc  换队
     * @param {object} obj  
     * @returns 
     */
    function changeTeam (obj) {
        if (MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER === null) {
            throw new Error("MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER is null");
        }
        if (typeof obj !== 'object') {
            throw new Error("changeTeam 参数 格式必须{group_id: '0001', group_name: '战队 A', group_icon: 'res/img/team_bg.png'}");
        }
        MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER.changeTeam(obj);
    }

    MAIN_EFFECTS_ACTION.FLAG_TEAMATTACKTREE = teamAttackTree;
    MAIN_EFFECTS_ACTION.FLAG_CHANGE_TEAM = changeTeam;
}(window));