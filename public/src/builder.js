define(['phaser'], function(Phaser) {
    'use strict';

    function Builder() {}

    Builder.prototype = {
        constructor: Builder,
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
            this.currentSpeed = 0;

            game.physics.enable(this.player, Phaser.Physics.ARCADE);
            game.camera.follow(this.player);

            this.cursors = game.input.keyboard.createCursorKeys();
            this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },
        update: function() {
            //  Reset the player, then check for movement keys
            /*
            this.player.body.velocity.setTo(0, 0);

            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -200;
            } else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 200;
            }
            */


            if (this.cursors.left.isDown) {
                this.player.angle -= 4;
            } else if (this.cursors.right.isDown) {
                this.player.angle += 4;
            }

            if (this.cursors.up.isDown) {
                //  The speed we'll travel at
                this.currentSpeed = 200;
            } else {
                this.currentSpeed = 0;
            }

            this.game.physics.arcade.velocityFromAngle(this.player.angle - 90, this.currentSpeed, this.player.body.velocity);

        }

    };

    return Builder;
});
