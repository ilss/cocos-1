/*
 * @Author: Liang Liang
 * @Date: 2018-05-21 15:09:39
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-05-31 15:10:04
 * @Description: 
 */

MAIN_EFFECTS_ACTION.MainLayer = cc.Layer.extend({
    _opactions: {
        _default_action_time: 4,
        _add_linghting_interval: 1,
        _linghting_width: 2,
        _linghting_color: cc.color(0, 0, 0)
    },
    _winSize: null,
    _global_class: null,
    _color_action: null,
    _webgl: true,
    _target: null,
    _streak: null,
    _item_index: 0,
    _dt: 0,
    _team_array: [],
    _team_change_index: 0,
    _linghting_path_left_array: [
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 788), cc.p(454, 788), cc.p(567, 676), cc.p(581, 676), cc.p(598, 693), cc.p(617, 693)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_point, cc.p(0, 780), cc.p(448, 780), cc.p(563, 665), cc.p(594, 665)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 772), cc.p(443, 772), cc.p(567, 647), cc.p(616, 647), cc.p(633, 666)]
        ],
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 731), cc.p(174, 731), cc.p(324, 591), cc.p(361, 591), cc.p(377, 607), cc.p(451, 607), cc.p(468, 589)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_point, cc.p(0, 730), cc.p(169, 730), cc.p(317, 582), cc.p(366, 582), cc.p(380, 598), cc.p(417, 598), cc.p(440, 574), cc.p(464, 574)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 719), cc.p(164, 719), cc.p(312, 569), cc.p(366, 569), cc.p(385, 584), cc.p(408, 584), cc.p(447, 545)]
        ],
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 576), cc.p(199, 576), cc.p(275, 500), cc.p(318, 500)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_point, cc.p(0, 566), cc.p(197, 566), cc.p(270, 492), cc.p(290, 492), cc.p(305, 476), cc.p(335, 476)]
        ],
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 436), cc.p(339, 436), cc.p(368, 465), cc.p(381, 465)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 420), cc.p(340, 423), cc.p(352, 412), cc.p(391, 412)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 413), cc.p(338, 413), cc.p(368, 387), cc.p(382, 387)]
        ],
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_point, cc.p(0, 286), cc.p(197, 286), cc.p(270, 360), cc.p(290, 360), cc.p(305, 375), cc.p(335, 375)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 278), cc.p(199, 278), cc.p(275, 352), cc.p(318, 352)]
        ],
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 128), cc.p(164, 128), cc.p(312, 276), cc.p(366, 276), cc.p(385, 263), cc.p(408, 263), cc.p(448, 303)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_point, cc.p(0, 117), cc.p(169, 117), cc.p(317, 265), cc.p(366, 265), cc.p(380, 250), cc.p(417, 250), cc.p(440, 273), cc.p(462, 273)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 106), cc.p(174, 106), cc.p(324, 256), cc.p(361, 256), cc.p(377, 240), cc.p(451, 240), cc.p(467, 256)]
        ],
        [
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 80), cc.p(443, 80), cc.p(567, 205), cc.p(616, 205), cc.p(633, 187)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_point, cc.p(0, 72), cc.p(448, 72), cc.p(563, 187), cc.p(595, 187)],
            [MAIN_EFFECTS_ACTION.res.bg_linghting_annulus, cc.p(0, 65), cc.p(456, 65), cc.p(567, 177), cc.p(581, 177), cc.p(598, 159), cc.p(618, 159)]
        ],
    ],
    _linghting_path_right_array: null,
    _pos_start_array: [
        cc.p(250, 770),
        cc.p(174, 598),
        cc.p(92, 424),
        cc.p(174, 252),
        cc.p(250, 78),
        cc.p(1048, 78),
        cc.p(1128, 252),
        cc.p(1214, 424),
        cc.p(1128, 598),
        cc.p(1048, 770)
    ],
    _pos_end_array: [
        cc.p(827, 538),
        cc.p(828, 470),
        cc.p(794, 421),
        cc.p(776, 599),
        cc.p(767, 548),
        cc.p(763, 463),
        cc.p(723, 572),
        cc.p(717, 481),
        cc.p(694, 444),
        cc.p(677, 487),
        cc.p(645, 631),
        cc.p(619, 566),
        cc.p(596, 495),
        cc.p(602, 419),
        cc.p(555, 543),
        cc.p(534, 495),
        cc.p(494, 548),
        cc.p(474, 478),
        cc.p(488, 430)
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
        this.addTree();
        // this.initTeam(_json);

        // var _bg_color = new cc.LayerColor(cc.color(0, 0, 0), this._winSize.width, this._winSize.height);
        // this.addChild(_bg_color);
        //入场特效
        // setInterval(this.teamEntrance.bind(this), 200);
    },
    addBg: function () {
        var _this = this,
            _bg = new cc.Sprite(MAIN_EFFECTS_ACTION.res.game_bg_light_bottom);
        this.addChild(_bg, 0);
        _bg.x = this._winSize.width / 2;
        _bg.y = this._winSize.height / 2 - 20;
        _bg.runAction(cc.sequence(cc.fadeOut(1), cc.delayTime(3), cc.fadeIn(4)).repeatForever());

        _bg = new cc.Sprite(MAIN_EFFECTS_ACTION.res.game_bg_light);
        this.addChild(_bg, 1);
        _bg.x = this._winSize.width / 2;
        _bg.y = this._winSize.height / 2 - 20;
        _bg.opacity = 80;
        // _bg.runAction(cc.sequence(cc.fadeIn(2), cc.fadeOut(2)).repeatForever());

        //流光效果  START
        //左侧路径坐标数组翻转生成右侧
        this._linghting_path_right_array = [];
        for (var _i = 0, _len_i = this._linghting_path_left_array.length; _i < _len_i; _i++) {
            var _new_array_i = [],
                _array_i = this._linghting_path_left_array[_i];
            for (var _j = 0, _len_j = _array_i.length; _j < _len_j; _j++) {
                var _new_array_j = [],
                    _array_j = _array_i[_j];
                _new_array_j.push(_array_j[0]);
                for (var _k = 1, _len_k = _array_j.length; _k < _len_k; _k++) {
                    var _element = _array_j[_k];
                    var _new_pos = cc.p(1286 - _element.x, _element.y);
                    _new_array_j.push(_new_pos);
                }
                _new_array_i.push(_new_array_j);
            }
            this._linghting_path_right_array.push(_new_array_i);
        }

        // cc.log(this._linghting_path_left_array);
        function spriteMovePath (sp, path_array, speed) {
            var _icon = null,
                _start_pos = sp.getPosition(),
                _end_pos = null,
                _action_array = [],
                _action_time = 0,
                _action_time_all = 0,
                _action = null;
            for (var _i = 1, _len = path_array.length; _i < _len; _i++) {
                _end_pos = path_array[_i];
                _action_time = GLOBAL_FUNC_SIMPLEEDU["distanceToActionTime"](_start_pos, _end_pos, speed);
                _action = cc.moveTo(_action_time, _end_pos);
                _action_time_all += _action_time;
                _action_array.push(_action);
                _start_pos = _end_pos;
            }
            var _color_action = cc.sequence(
                cc.tintTo(1, 0, 58, 86),
                cc.tintTo(1, 62, 225, 225)
            ).repeatForever();

            sp.runAction(cc.sequence(_action_array));
            sp.runAction(_color_action);

            _icon = new cc.Sprite(path_array[0]);
            _icon.setPosition(path_array[_len - 1]);
            _icon.opacity = 0;
            _this.addChild(_icon, 2);
            _icon.runAction(
                cc.sequence(
                    cc.delayTime(_action_time_all),
                    cc.fadeIn(.2),
                    cc.delayTime(.5),
                    cc.fadeOut(.2),
                    cc.delayTime(1),
                    cc.callFunc(
                        function (target) {
                            target.removeFromParent();
                            target = null;
                            sp.removeFromParent();
                            sp = null;
                        }
                    )
                )
            );
        }

        function bglinghting () {
            var _path_array = _this._linghting_path_left_array[MAIN_EFFECTS_ACTION.randomNum(0, _this._linghting_path_left_array.length - 1)],
                _path = _path_array[MAIN_EFFECTS_ACTION.randomNum(0, _path_array.length - 1)],
                _streak = new cc.MotionStreak(1, 0.1, _this._opactions._linghting_width, _this._opactions._linghting_color, MAIN_EFFECTS_ACTION.res.s_streak);
            //去掉数组第一个图标元素
            _streak.setPosition(_path[1]);
            _this.addChild(_streak, 2);
            spriteMovePath(_streak, _path, 100);

            _path_array = _this._linghting_path_right_array[MAIN_EFFECTS_ACTION.randomNum(0, _this._linghting_path_right_array.length - 1)];
            _path = _path_array[MAIN_EFFECTS_ACTION.randomNum(0, _path_array.length - 1)];
            _streak = new cc.MotionStreak(1.5, 0.1, _this._opactions._linghting_width, _this._opactions._linghting_color, MAIN_EFFECTS_ACTION.res.s_streak);
            _streak.setPosition(_path[1]);
            _this.addChild(_streak, 2);
            spriteMovePath(_streak, _path, 100);
        }

        this.schedule(bglinghting, this._opactions._add_linghting_interval, Infinity, 2);
        //流光效果  END

        // var _path_array = [cc.p(340, 423), cc.p(352, 412), cc.p(389, 412)],
        //     _streak = new cc.MotionStreak(2, .5, 1, cc.color(5, 240, 250), MAIN_EFFECTS_ACTION.res.s_streak);
        // _streak.x = 0;
        // _streak.y = 420;
        // this.addChild(_streak, 2);
        // GLOBAL_FUNC_SIMPLEEDU["spriteMovePath"](_streak, _path_array, 300);
        // this._global_class.spriteMovePath(_emitter, _path_array, 200);
    },
    addTree: function () {
        var _tree = new cc.Sprite(MAIN_EFFECTS_ACTION.res.game_tree);
        _tree.x = this._winSize.width / 2;
        _tree.y = this._winSize.height / 2;
        _tree.opacity = 0;
        _tree.runAction(cc.fadeIn(1));
        this.addChild(_tree);
    },
    initTeam: function (data_array) {

        var _len = 10- data_array.length;
        //更新 换队index
        this._team_change_index = data_array.length;
        for (var i=0; i<_len;i++) {
            data_array.push({ group_id: 'aaa', group_name: '默认空位', group_icon: '' });
        }

        var _team = null;
        for (i = 0, _len = data_array.length; i < _len; i++) {
            _team = new Team_class(data_array[i]);
            _team.setPosition(this._pos_start_array[i]);
            this.addChild(_team, 5);
            this._team_array.push(_team);
        }
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
        _pos_margin = null;
        _pos_sence_top = null;
    },
    teamEntrance: function () {
        if (this._item_index === this._pos_start_array.length) {
            return;
        }
        var _temp_height = this._winSize.height / 2;
        var _pos = this._pos_start_array[this._item_index],
            _team = new cc.Sprite(),
            _size = _team.getContentSize(),
            _action = cc.spawn(cc.delayTime(.5), cc.fadeIn(.5), cc.scaleTo(.5, 1, 1));
        this.loadUrlImage('res/img/team_bg.png', _team);
        _team.x = _pos.x;
        _team.y = _pos.y < _temp_height ? _pos.y - _size.height / 2 : _pos.y + _size.height / 2 + 8;

        _team.opacity = 0;
        _team.setScale(0);
        this.addChild(_team, 2);
        _team.runAction(_action);
        this.entranceAction(_team.getPosition());
        this._item_index++;
    },
    entranceAction: function (_pos) {
        var _emitter = new cc.ParticleSystem(MAIN_EFFECTS_ACTION.res.particle_fade_in);
        _emitter.setScale(.5);
        _emitter.x = _pos.x;
        _emitter.y = _pos.y - 30;
        _emitter.autoRemoveOnFinish = true;
        this.addChild(_emitter, 3);
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
        _pos_x_distance = _pos_x_distance > 80 ? _pos_x_distance : 20 * MAIN_EFFECTS_ACTION.randomNum(2, 6);
        _pos_y_distance = parseInt(Math.abs((_pos_start.y - _pos_end.y) / _temp__distance_num), 10);

        //处理高度相同的点相互攻击
        _pos_array.push(_pos_start);

        var _temp_alternate = 1,    //控制转折   1时x不变  -1时y不变
            _temp_pos_x = 0,
            _temp_pos_y = 0;

        for (; i < _inflection_num; i += 1) {
            _temp_diverge = 10 * MAIN_EFFECTS_ACTION.randomNum(0, 5);
            if (_temp_alternate === 1) {
                _temp_pos_x = i === 0 ? _pos_start.x : _pos_array[i].x;
                if (_pos_y_distance < 40) {
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
    teamAttackTree: function (team_data) {
        var _this = this,
            _team = this._team_array[GLOBAL_FUNC_SIMPLEEDU.findObjFromArray(team_data, 'group_id', this._team_array, '_team_id')];
        // cc.log(team_data);
        if(_team){
            this.attackingAction(_team.getPosition());
        }else{
            this.changeTeam(team_data);
            setTimeout(function () {
                _this.teamAttackTree(team_data)
            },1000);
        }
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
                action_time = this._opactions._default_action_time;
            }
        }

        // _action_pos_end = cc.pAdd(_action_pos_end, cc.p(-8, -2));

        //区分处理IE，用比较弱的粒子。
        var particles_img = this._webgl ? MAIN_EFFECTS_ACTION.res.particles_attack : MAIN_EFFECTS_ACTION.res.particles_attack_ie;

        var _this = this,
            _emitter = new cc.ParticleSystem(particles_img),
            _path_array = this.createPath(_action_pos_start, _action_pos_end),
            _a3 = cc.cardinalSplineTo(action_time, _path_array, .9);

        if (this._webgl) {
            var _streak = new cc.MotionStreak(.7, .5, 2, cc.color(5, 240, 250), MAIN_EFFECTS_ACTION.res.s_streak);
            _streak.setPosition(_action_pos_start);
            this.addChild(_streak, 2);

            _streak.runAction(
                cc.sequence(_a3.clone(), cc.callFunc(function (target) {
                    target.removeFromParent();
                    target = null;
                }))
            );
        }

        _emitter.autoRemoveOnFinish = true;
        _emitter.setPosition(_action_pos_start);
        this.addChild(_emitter, 5);

        _emitter.runAction(
            cc.sequence(_a3, cc.callFunc(function () {
                _this.playHitEffect(_action_pos_end);
            }), cc.delayTime(.3), cc.callFunc(function (target) {
                target.removeFromParent();
                target = null;
            }))
        );
        _emitter = null;
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
        _emitter.autoRemoveOnFinish = true;
        this.addChild(_emitter, 6);
        _emitter = null;
    },
    changeTeam: function (obj) {
        this._team_array[this._team_change_index].changeTeam(obj);
        this._team_change_index = this._team_change_index < 9 ? this._team_change_index + 1 : 0;
    }
});

MAIN_EFFECTS_ACTION.HelloWorldScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        this.addChild(new MAIN_EFFECTS_ACTION.MainLayer());
    }
});