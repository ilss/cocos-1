/*
 * @Author: Liang Liang
 * @Date: 2018-05-23 11:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-05-23 11:10:04
 * @Description: 
 */


var MAINEFFECTSACTION = {
    _EFFECTS_MAIN_LAYER: null,
    addEffects: function (time) {
        // console.log(cc.Director);
        if (this._EFFECTS_MAIN_LAYER === null) {
            return false;
        }
        var _temp_start_array_len = this._EFFECTS_MAIN_LAYER._pos_start_array.length - 1;
        this._EFFECTS_MAIN_LAYER.attackingAction(this._EFFECTS_MAIN_LAYER.randomNum(0, _temp_start_array_len), time);
    }
}

var MotionStreakTest1 = cc.Layer.extend({
    _winSize: null,
    _color_action: null,
    _target: null,
    _streak: null,
    _streak_id: 0,
    _streak_array: [],
    _dt: 0,
    _pos_start_pointer: 0,
    _pos_start_array: [],
    _pos_end_array: [
        cc.p(488, 490),
        cc.p(430, 476),
        cc.p(660, 476),
        cc.p(664, 562),
        cc.p(546, 489),
        cc.p(764, 531),
        cc.p(732, 423)
    ],
    onEnter: function () {
        this._super();

        MAINEFFECTSACTION._EFFECTS_MAIN_LAYER = this;
        this._winSize = cc.director.getWinSize();

        this._color_action = cc.sequence(
            cc.tintTo(.52, 1, 100, 100),
            cc.tintTo(.2, 255, 255, 255)
        ).repeatForever();

        // const obj = cc.sys.capabilities
        // for (const key in obj) {
        //     if (obj.hasOwnProperty(key)) {
        //         cc.log(obj[key])
        //     }
        // }
        this.addBg();
        this.createStartPos(5, 215);

        var _this = this,
            _temp_start_array_len = this._pos_start_array.length - 1;

        var _listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,                       // 在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            onTouchBegan: function (touch, event) {
                // var target = event.getCurrentTarget()
                // var locationInNode = target.convertToNodeSpace(touch.getLocation())
                _this.attackingAction(_this.randomNum(0, _temp_start_array_len));
                // var s = target.getContentSize()
                // var rect = cc.rect(0, 0, s.width, s.height)
                return false;
            },
            onTouchMoved: function (touch, event) {
                return false;
            },
            onTouchEnded: function (touch, event) {
                return false;
            }
        });
        cc.eventManager.addListener(_listener, this);

        this.scheduleUpdate();
    },
    addBg: function () {
        var bg = new cc.Sprite(res.game_bg);
        this.addChild(bg, 0);
        bg.x = this._winSize.width / 2;
        bg.y = this._winSize.height / 2;

        bg = new cc.Sprite(res.game_bg_mask);
        this.addChild(bg, 99);
        bg.x = this._winSize.width / 2;
        bg.y = this._winSize.height / 2;
    },
    /**
     * 生成发射点坐标
     * @num         点的数量
     * @distance    两点距离
     */
    createStartPos: function (num, distance) {
        var _pos_margin = (this._winSize.width - distance * (num - 1)) / 2,
            _pos_sence_top = this._winSize.height - 100;

        for (var i = 0; i < num; i += 1) {
            var _temp_pos = cc.p(_pos_margin + distance * i, _pos_sence_top);
            this._pos_start_array.push(_temp_pos);
        }
        for (i = 0; i < num; i += 1) {
            var _temp_pos = cc.p(_pos_margin + distance * i, 100);
            this._pos_start_array.push(_temp_pos);
        }
    },
    /**
     * @func
     * @desc    创建特效移动路径
     * @param {cc.p} _pos_start 
     * @param {cc.p} _pos_end 
     * @returns {array} 特效移动路径上的点
     */
    createPath: function (_pos_start, _pos_end) {
        var i = 0,
            _pos_array = [],
            _direction_x = 1,
            _direction_y = 1,
            _temp_pos = null,
            _pos_x_distance = 0,
            _pos_y_distance = 0,
            // _inflection_num = this.randomNum(2, 4),
            _inflection_num = 4;

        _pos_start = _pos_start || 0;
        _pos_end = _pos_end || 0;
        _pos_start.x > _pos_end.x ? _direction_x = 1 : _direction_x = -1;
        _pos_start.y > _pos_end.y ? _direction_y = -1 : _direction_y = 1;

        _pos_x_distance = parseInt(Math.abs((_pos_start.x - _pos_end.x) / _inflection_num), 10);
        _pos_x_distance = _pos_x_distance > 80 ? _pos_x_distance : 80;
        _pos_y_distance = parseInt(Math.abs((_pos_start.y - _pos_end.y) / _inflection_num), 10);

        _pos_array.push(_pos_start);

        var _temp_alternate = 1,    //控制转折   1时x不变  -1时y不变
            _temp_pos_x = 0,
            _temp_pos_y = 0,
            _temp_diverge = 10 * this.randomNum(0, 4);

        for (; i < _inflection_num; i += 1) {
            if (_temp_alternate === 1) {
                _temp_pos_x = i === 0 ? _pos_start.x : _pos_array[i].x;
                _temp_pos_y = _pos_start.y + _pos_y_distance * (i + 1) * _direction_y + _temp_diverge * _direction_y;
            } else {
                if (i === _inflection_num - 1) {
                    _temp_pos_x = _pos_end.x;
                    _temp_pos_y = i === 0 ? _pos_start.y : _pos_array[i].y;
                } else {
                    _temp_pos_x = _pos_start.x + _pos_x_distance * (i + 1) * _direction_x * _temp_alternate + _temp_diverge;
                    _temp_pos_y = i === 0 ? _pos_start.y : _pos_array[i].y;
                }
            }
            _temp_pos = cc.p(_temp_pos_x, _temp_pos_y);
            _pos_array.push(_temp_pos);
            _temp_alternate === 1 ? _temp_alternate = -1 : _temp_alternate = 1;
        }

        _pos_array.push(_pos_end);
        return _pos_array;
    },
    /**
     * @func 
     * @desc 向舞台添加攻击特效
     * @param {number} index       起始点索引 
     * @param {number} action_time    特效持续时间
     */
    attackingAction: function (index, action_time) {
        cc.log('attacking...');


        if (typeof index !== 'number' || index < 0 || index > this._pos_start_array.length) {
            throw new Error('Invalid argument - ' + index);
            return false;
        }
        action_time = action_time || 3;
        if (typeof action_time !== 'number') {
            throw new Error('Invalid argument - ' + action_time);
            return false;
        }

        var _start_pos = this._pos_start_array[index],
            _streak = new cc.MotionStreak(.7, .5, 2, cc.color(255, 255, 255), res.s_streak);

        _streak.id = this._streak_id;
        _streak.del = false;
        _streak.setPosition(_start_pos);
        this.addChild(_streak, 2);
        this._streak_array.push(_streak);

        var _emitter = new cc.ParticleSystem(res.s_particles1);
        // this._emitter.setScale(.5) 
        _emitter.setPosition(_start_pos);
        _emitter.streak = _streak;
        this.addChild(_emitter, 2);

        var _temp_num = this.randomNum(0, this._pos_end_array.length - 1);
        var _path_array = this.createPath(_start_pos, cc.pAdd(this._pos_end_array[_temp_num], cc.p(-61, -2)));

        var _a3 = cc.cardinalSplineTo(action_time, _path_array, .9);

        _emitter.runAction(cc.sequence(_a3, cc.delayTime(.3), cc.callFunc(function (target) {
            target.removeFromParent();
            target.streak.del = true;
        })))

        _streak._target = _emitter;

        _streak.runAction(this._color_action.clone());

        this._streak_id += 1;
        if (this._pos_start_pointer === this._pos_start_array.length - 1) {
            this._pos_start_pointer = 0;
        } else {
            this._pos_start_pointer += 1;
        }
    },
    /**
     * @func 
     * @desc 返回minNum 到 maxNum 之间的随机数，包括minNum 和 maxNum.
     * @param {number} minNum 
     * @param {number} maxNum 
     * @returns 
     */
    randomNum: function (minNum, maxNum) {
        if (typeof minNum !== 'number' || typeof minNum !== 'number') {
            throw new Error('arguments has to be number')
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

    update: function (dt) {
        for (var _index = 0, _len = this._streak_array.length; _index < _len; _index += 1) {
            if (this._streak_array[_index].del) {
                continue;
            }
            var _streak = this._streak_array[_index];
            if (_streak.target) {
                _streak.removeFromParent();
                this._streak_array[_index] = null;
            } else {
                var _emitter = _streak._target;
                var pos = _emitter.convertToWorldSpace(cc.p(_emitter.width / 2, 0));
                _streak.x = pos.x;
                _streak.y = pos.y;
            }
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    _main_layer: null,
    onEnter: function () {
        this._super();
        _main_layer = new MotionStreakTest1();
        this.addChild(_main_layer);
    }
});