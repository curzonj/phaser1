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
        render: function() {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteCoords(this.player, 32, 200);
        },
        preload: function() {
            this.game.load.image('bullet', '/images/bullet.png');
            this.game.load.image('ship', '/images/shmup-ship.png');
            this.game.load.image('starfield', '/images/starfield.jpg');

        },
        create: function() {
            var game = this.game;


            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.world.setBounds(0, 0, 2000, 2000);
            this.starfield = game.add.tileSprite(0, 0, 3000, 3000, 'starfield');

            this.player = game.add.sprite(1000, 1000, 'ship');
            game.physics.enable(this.player, Phaser.Physics.ARCADE);

            this.player.anchor.setTo(0.5, 0.5);
            this.player.body.maxVelocity.setTo(400, 400);
            this.player.body.collideWorldBounds = true;
            this.player.bringToTop();

            this.currentSpeed = 0;

            game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
            game.camera.focusOn(this.player);

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
                        bullet.angle - 90, 600, bullet.body.velocity);
                }
            }
        },
        update: function() {
            var xdist = this.player.body.x - this.game.world.bounds.x;
            var ydist = this.player.body.y - this.game.world.bounds.y;

            if (xdist < 500 || ydist < 500 || xdist > 1500 || ydist > 1500) {
                var newx = Math.round(this.player.body.x - 1000);
                var newy = Math.round(this.player.body.y - 1000);
                var image = this.starfield.texture;

                this.game.world.setBounds(newx, newy, 2000, 2000);

                this.starfield.reset(
                    (newx - image.width - (newx % image.width)), (newy - image.height - (newy % image.height))
                );

            }

            if (this.fireButton.isDown) {
                this.fireBullet();
            }

            if (this.cursors.left.isDown) {
                this.player.angle -= 4;
            } else if (this.cursors.right.isDown) {
                this.player.angle += 4;
            }

            if (this.cursors.up.isDown) {
                this.currentSpeed += 15;
            } else {
                this.currentSpeed -= 15;
            }

            if (this.currentSpeed > 300) {
                this.currentSpeed = 300;
            } else if (this.currentSpeed < 0) {
                this.currentSpeed = 0;
            }

            this.game.physics.arcade.velocityFromAngle(this.player.angle - 90, this.currentSpeed, this.player.body.velocity);

        }

    };

    return Builder;
});
