var Team_class = cc.Node.extend({
    _sp: null,
    ctor: function (url) {
        this._super();
        var _mask = new cc.Sprite(MAIN_EFFECTS_ACTION.res.team_bg);
        this.addChild(_mask, 9);
        this._sp = new cc.Sprite();
        this.addChild(this._sp, 1);
        this.loadUrlImage(url, this._sp);
    },
    loadUrlImage: function (faceurl, node) {
        // && (/^https?:\/\/\w+/g).test(url)
        if (typeof faceurl === 'string') {
            cc.loader.loadImg(faceurl, { isCrossOrigin: false }, function (err, img) {
                var sprite = new cc.Sprite(faceurl);
                sprite.x = 0;
                sprite.y = 0;
                // sprite.scale = 1.5;
                node.addChild(sprite);
                // Ltc.addSpriteChild(this, res.LaunchFaceBg_png, this.width / 2, this.height / 2);
            });

            // cc.loader.loadImg(url, { isCrossOrigin: true }, function (err, img) {
            //     if (err) {
            //         cc.log("图片加载失败 " + err);
            //     }
            //     else {
            //         // cc.log("ok");
            //         var texture;
            //         if (cc.sys.isNative) {
            //             texture = img;
            //         }
            //         else {
            //             var texture2d = new cc.Texture2D();
            //             texture2d.initWithElement(img);
            //             texture2d.handleLoadedTexture();
            //             texture = texture2d;
            //         }
            //         node.setTexture(texture);
            //     }
            // });
        }
    },
})