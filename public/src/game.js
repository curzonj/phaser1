define(['phaser'], function(Phaser) {
    'use strict';

    function Game() {}

    Game.prototype = {
        constructor: Game,
        start: function() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
                preload: this.preload,
                create: this.create,
                update: this.update
            });
        },

        preload: function() {
            this.game.load.image('ship', '/images/shmup-ship.png');
            this.game.load.image('starfield', '/images/starfield.jpg');

        },
        create: function() {
            var game = this.game;

            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.add.tileSprite(0, 0, 800, 600, 'starfield');

            this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
            this.player.anchor.setTo(0.5, 0.5);

            game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.cursors = game.input.keyboard.createCursorKeys();
        },
        update: function() {
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -200;
            } else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 200;
            }

        }

    };

    return Game;
});
