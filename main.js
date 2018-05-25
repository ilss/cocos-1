/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debugging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
(function (window) {
    window.MAIN_EFFECTS_ACTION = {
        _EFFECTS_MAIN_LAYER: null,
        /**
         * @func 
         * @desc 向舞台添加攻击特效
         * @param {object} _pos_start     起点坐标格式 cc.p(x,y)
         * @param {object} _pos_end       终点点坐标格式 cc.p(x,y)
         * @param {number} action_time    特效持续时间
         */
        addEffects: function (_pos_action_start, _pos_action_end, _action_time) {
            if (this._EFFECTS_MAIN_LAYER === null) {
                return false;
            }
            this._EFFECTS_MAIN_LAYER.attackingAction(_pos_action_start, _pos_action_end, _action_time);
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
}(window));

cc.game.onStart = function () {
    var sys = cc.sys;
    // if (!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
    //     document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    // cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);
    cc.view.enableRetina(false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile &&
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize(1072, 866, cc.ResolutionPolicy.UNKNOWN);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(MAIN_EFFECTS_ACTION.g_resources, function () {
        document.getElementById('gameCanvas').style.display = 'inline';
        cc.director.runScene(new MAIN_EFFECTS_ACTION.HelloWorldScene());
    }, this);
};

cc.game.run();