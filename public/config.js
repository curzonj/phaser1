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

    require(['src/builder'], function(Builder) {
        var builder = new Builder();
        builder.start();
    });
})();
