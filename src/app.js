/*
 * @Author: Liang Liang
 * @Date: 2018-05-21 15:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-05-23 11:10:04
 * @Description: 
 */


MAIN_EFFECTS_ACTION.MotionStreakTest1 = cc.Layer.extend({
    _default_action_time: 4,
    _winSize: null,
    _color_action: null,
    _webgl: true,
    _target: null,
    _streak: null,
    _streak_id: 0,
    _streak_array: [],
    _dt: 0,
    _pos_start_pointer: 0,
    _pos_start_array: [],
    _pos_end_array: [
        cc.p(371, 474),
        cc.p(428, 490),
        cc.p(486, 490),
        cc.p(438, 580),
        cc.p(531, 615),
        cc.p(602, 475),
        cc.p(605, 560),
        cc.p(646, 540),
        cc.p(672, 420),
        cc.p(704, 530)
    ],
    onEnter: function () {
        this._super();

        MAIN_EFFECTS_ACTION._EFFECTS_MAIN_LAYER = this;
        this._winSize = cc.director.getWinSize();

        this._color_action = cc.sequence(
            cc.tintTo(.52, 19, 40, 60),
            cc.tintTo(.2, 255, 255, 255)
        ).repeatForever();

        this._webgl = 'opengl' in cc.sys.capabilities && cc._renderType === cc.game.RENDER_TYPE_WEBGL;

        this.addBg();
        this.createStartPos(5, 215);
        this.scheduleUpdate();
    },
    addBg: function () {
        var bg = new cc.Sprite(MAIN_EFFECTS_ACTION.res.game_bg);
        this.addChild(bg, 0);
        bg.x = this._winSize.width / 2;
        bg.y = this._winSize.height / 2;

        bg = new cc.Sprite(MAIN_EFFECTS_ACTION.res.game_bg_mask);
        this.addChild(bg, 99);
        bg.x = this._winSize.width / 2;
        bg.y = this._winSize.height / 2;
    },
    /**
     * 生成发射点坐标
     * @param {number} num         点的数量
     * @param {number} distance    两点距离
     */
    createStartPos: function (num, distance) {
        var _pos_margin = (this._winSize.width - distance * (num - 1)) / 2,
            _pos_sence_top = this._winSize.height - 118;

        for (var i = 0; i < num; i += 1) {
            var _temp_pos = cc.p(_pos_margin + distance * i, _pos_sence_top);
            this._pos_start_array.push(_temp_pos);
        }
        for (i = 0; i < num; i += 1) {
            var _temp_pos = cc.p(_pos_margin + distance * i, 118);
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
            _temp__distance_num = 0,
            _inflection_num = 4;

        _temp__distance_num = _inflection_num + MAIN_EFFECTS_ACTION.randomNum(0, 5);
        _pos_start = _pos_start || 0;
        _pos_end = _pos_end || 0;
        _pos_start.x > _pos_end.x ? _direction_x = 1 : _direction_x = -1;
        _pos_start.y > _pos_end.y ? _direction_y = -1 : _direction_y = 1;



        _pos_x_distance = parseInt(Math.abs((_pos_start.x - _pos_end.x) / _temp__distance_num), 10);
        // _inflection_num = Math.abs(_pos_start.x - _pos_end.x) > 120 ? _inflection_num : _inflection_num += 1;

        // cc.log('_pos_x_distance = ' + _pos_x_distance);
        // cc.log('_inflection_num = ' + _inflection_num);

        _pos_x_distance = _pos_x_distance > 80 ? _pos_x_distance : 20 * MAIN_EFFECTS_ACTION.randomNum(2, 6);
        _pos_y_distance = parseInt(Math.abs((_pos_start.y - _pos_end.y) / _temp__distance_num), 10);

        //处理高度相同的点相互攻击
        // _temp_pos_y_distance = Math.abs(_action_pos_end.y - _action_pos_start.y);
        _pos_array.push(_pos_start);

        var _temp_alternate = 1,    //控制转折   1时x不变  -1时y不变
            _temp_pos_x = 0,
            _temp_pos_y = 0;

        for (; i < _inflection_num; i += 1) {
            _temp_diverge = 10 * MAIN_EFFECTS_ACTION.randomNum(0, 5);
            if (_temp_alternate === 1) {
                _temp_pos_x = i === 0 ? _pos_start.x : _pos_array[i].x;
                if (_pos_y_distance < 40) {
                    // cc.log('高度差距太小---' + _pos_y_distance);
                    _pos_y_distance = 10 * MAIN_EFFECTS_ACTION.randomNum(0, 5);
                    _direction_y = _pos_start.y < this._winSize.height / 2 ? 1 : -1;
                    _temp_pos_y = _pos_start.y + _pos_y_distance * (i + 1) * _direction_y + _temp_diverge * _direction_y;
                } else {
                    _temp_pos_y = _pos_start.y + _pos_y_distance * (i + 1) * _direction_y + _temp_diverge * _direction_y;
                }
            } else {
                if (i === _inflection_num - 1) {
                    _temp_pos_x = _pos_end.x;
                    _temp_pos_y = i === 0 ? _pos_start.y : _pos_array[i].y;
                } else {
                    _temp_pos_x = _pos_start.x + _pos_x_distance * (i + 1) * _direction_x * _temp_alternate + _temp_diverge;
                    if (Math.abs(_temp_pos_x - _pos_end.y) < 10) {
                        _temp_pos_x -= 20;
                    }
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
     * @param {object} _pos_start     起点坐标格式 cc.p(x,y)
     * @param {object} _pos_end       终点点坐标格式 cc.p(x,y)
     * @param {number} action_time    特效持续时间
     */
    attackingAction: function (_pos_start, _pos_end, action_time) {
        var particles_img = null,
            _action_pos_start = null,
            _action_pos_end = null;
        if (typeof _pos_start === 'number' && typeof _pos_start !== 'object' && typeof _pos_end !== 'object') {
            action_time = _pos_start;
            _action_pos_start = this._pos_start_array[MAIN_EFFECTS_ACTION.randomNum(0, this._pos_start_array.length - 1)];
            _action_pos_end = this._pos_end_array[MAIN_EFFECTS_ACTION.randomNum(0, this._pos_end_array.length - 1)];
        } else {
            if (typeof _pos_start === 'object' && typeof _pos_start.x === 'number' && typeof _pos_start.y === 'number') {
                _action_pos_start = _pos_start;
            } else {
                // throw new Error('_pos_start has to be cc.p(x,y)');
                _action_pos_start = this._pos_start_array[MAIN_EFFECTS_ACTION.randomNum(0, this._pos_start_array.length - 1)];
            }

            if (typeof _pos_end === 'object' && typeof _pos_end.x === 'number' && typeof _pos_end.y === 'number') {
                _action_pos_end = _pos_end;
            } else {
                _action_pos_end = this._pos_end_array[MAIN_EFFECTS_ACTION.randomNum(0, this._pos_end_array.length - 1)];
                // throw new Error('_pos_end has to be cc.p(x,y)');
            }
            if (!action_time || typeof action_time !== 'number') {
                action_time = this._default_action_time;
            }
        }

        //区分处理IE，用比较弱的粒子。
        if (this._webgl) {
            var particles_img = MAIN_EFFECTS_ACTION.res.particles_attack
        } else {
            var particles_img = MAIN_EFFECTS_ACTION.res.particles_attack_ie
        }

        var _this = this,
            _emitter = new cc.ParticleSystem(particles_img),
            _path_array = this.createPath(_action_pos_start, _action_pos_end),
            _a3 = cc.cardinalSplineTo(action_time, _path_array, .9);

        if (this._webgl) {
            var _streak = new cc.MotionStreak(.7, .5, 2, cc.color(255, 255, 255), MAIN_EFFECTS_ACTION.res.s_streak);
            _streak.id = this._streak_id;
            _streak.del = false;
            _streak.setPosition(_action_pos_start);
            this.addChild(_streak, 2);
            this._streak_array.push(_streak);

            _emitter.streak = _streak;
            _streak._target = _emitter;
            _streak.runAction(this._color_action.clone());
        }
        _emitter.setPosition(_action_pos_start);
        this.addChild(_emitter, 5);

        _emitter.runAction(
            cc.sequence(_a3, cc.callFunc(function () {
                _this.playHitEffect(_action_pos_end);
            }), cc.delayTime(.3), cc.callFunc(function (target) {
                target.removeFromParent();
                if (this._webgl) {
                    target.streak.del = true;
                }
            }))
        );

        this._streak_id += 1;
        if (this._pos_start_pointer === this._pos_start_array.length - 1) {
            this._pos_start_pointer = 0;
        } else {
            this._pos_start_pointer += 1;
        }
    },
    /**
     * @func
     * @desc 添加击中效果
     * @param {cc.p} pos_hit
     */
    playHitEffect: function (pos_hit) {
        if (typeof pos_hit.x !== 'number' || typeof pos_hit.y !== 'number') {
            throw new Error('argument has to be cc.p(x,y)')
        }
        var _emitter = new cc.ParticleSystem(MAIN_EFFECTS_ACTION.res.particle_hit);
        _emitter.setScale(.5);
        _emitter.setPosition(pos_hit);
        this.addChild(_emitter, 6);
    },

    update: function (dt) {
        if (this._webgl) {
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
    }
});

MAIN_EFFECTS_ACTION.HelloWorldScene = cc.Scene.extend({
    _main_layer: null,
    onEnter: function () {
        this._super();
        _main_layer = new MAIN_EFFECTS_ACTION.MotionStreakTest1();
        this.addChild(_main_layer);
    }
});