window.onload = function() {

    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        game.load.image('ship', '/images/shmup-ship.png');
        game.load.image('starfield', '/images/starfield.jpg');
    }

    var s;
    var player;
    var cursors;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        s = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        player = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
        player.anchor.setTo(0.5, 0.5);

        game.physics.enable(player, Phaser.Physics.ARCADE);

        cursors = game.input.keyboard.createCursorKeys();
    }


    function update() {
        /* if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        } */
    }

};
