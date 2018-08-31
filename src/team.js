var Team_class = cc.Node.extend( {
    _team_id: null,
    _team_name: null,
    _team_icon: null,
    _opactions: {
        _fade_time: .5
    },
    _sp: null,
    ctor: function ( obj ) {
        this._super();
        if ( typeof obj !== 'object' ) {
            throw new Error( 'ERROR:  Team_class 参数必须是obj ！！！' );
        }
        this._team_id = obj.group_id || '6666';
        this._team_name = obj.group_name || '战队';
        this._team_icon = obj.group_icon;
        this.initTeam();
    },
    initTeam: function () {
        this._sp = new cc.Sprite();
        this._sp.opacity = 0;
        this._sp.setCascadeOpacityEnabled( true );
        this.addChild( this._sp, 1 );
        var _mask = new cc.Sprite( MAIN_EFFECTS_ACTION.res.team_bg );
        this._sp.addChild( _mask, 9 );
    
        if ( this._team_icon.length>1 ) {
            this.loadUrlImage( this._team_icon, this._sp );
        }
 
        if ( this._team_name !== '默认空位' ) {
            var _txt = new cc.LabelTTF( this._team_name, 10 );
            _txt.setFontFillColor( cc.color( 7, 230, 230 ) );
            // _txt.width = 30;
            // _txt._rect.height = 20 ;
            _txt.x = 0;
            _txt.y = 55;
            this._sp.addChild( _txt, 1 );
            this._sp.runAction( cc.fadeIn( this._opactions._fade_time ) );
            // cc.log( this._sp )
        } else {
            this._sp.runAction( cc.sequence( cc.fadeIn( 1 ), cc.delayTime( 1 ), cc.fadeOut( 2 ) ).repeatForever() );
        }
    },
    loadUrlImage: function ( faceurl, node ) {
        // && (/^https?:\/\/\.+(.png|.gif|.jpe?g)$/g).test(url)
        // if (typeof faceurl === 'string' && (/(.png|.gif|.jpe?g)$/gi).test(faceurl)) {
        cc.loader.loadImg( faceurl, { isCrossOrigin: false }, function ( err, img ) {
            if ( err ) {
                cc.log( "图片加载失败 " + err );
            }
            else {
                var _sp = new cc.Sprite( img ),
                    _size = _sp.getContentSize();
                _sp.setScale( 37 / _size.width, 37 / _size.height );
                _sp.x = 0;
                _sp.y = 0;
                node.addChild( _sp );
            }
        } );
        // } else {
        //     cc.log("图片url错误 " + faceurl);
        // }
    },
    changeTeam: function ( obj ,htmlHidden) {
        this._team_id = obj.group_id || '6666';
        this._team_name = obj.group_name || '战队';
        this._team_icon = obj.group_icon || '';
        var _this = this;
        // cc.log('-----------'+htmlHidden);
        if(htmlHidden){
            _this._sp.removeFromParent();
            _this._sp = null;
            _this.initTeam();
        }else{
            this._sp.runAction( cc.sequence( cc.fadeOut( this._opactions._fade_time ), cc.callFunc(
                function () {
                    _this._sp.removeFromParent();
                    _this._sp = null;
                    _this.initTeam();
                }
            ) ) );
        }
    }
} )