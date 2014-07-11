(function() {
    'use strict';

    require.config({
        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        },
        paths: {
            phaser: 'bower_components/phaser/phaser'
        }
    });

    require(['src/game'], function(Game) {
        var game = new Game();
        game.start();
    });
})();
