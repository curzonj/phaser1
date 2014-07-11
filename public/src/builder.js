define(['phaser'], function(Phaser) {
    'use strict';

    function Builder() {}

    Builder.prototype = {
        constructor: Builder,
        start: function() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, '', this);
            /*preload: this.preload.bind(this),
                create: this.create.bind(this),
                update: this.update.bind(this)
            });*/
        },

        preload: function() {
            this.game.load.image('bullet', '/images/bullet.png');
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

            //  Our bullet group
            var bullets = this.bullets = this.game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(30, 'bullet');
            bullets.setAll('anchor.x', 0.5);
            bullets.setAll('anchor.y', 1);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('checkWorldBounds', true);

            this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.bulletTime = 0;
        },
        fireBullet: function() {
            //  To avoid them being allowed to fire too fast we set a time limit
            if (this.game.time.now > this.bulletTime) {
                //  Grab the first bullet we can from the pool
                var bullet = this.bullets.getFirstExists(false);

                if (bullet) {
                    //  And fire it
                    bullet.reset(this.player.x, this.player.y + 8);
                    bullet.angle = this.player.angle;
                    this.bulletTime = this.game.time.now + 200;

                    this.game.physics.arcade.velocityFromAngle(
                        bullet.angle - 90, 300, bullet.body.velocity);
                }
            }
        },
        update: function() {
            if (this.fireButton.isDown) {
                this.fireBullet();
            }

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
