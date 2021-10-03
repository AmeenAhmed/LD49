import GameScene from './game.js';
import Constants from "../constants.js";

export default class Orders extends Phaser.Scene {
    constructor (config) {
        super(config);
    }

    preload () {
        this.load.image('main-menu-bg', 'src/assets/img/main-menu-bg.png');
        this.load.image('main-menu-msg', 'src/assets/img/main-menu-msg.png');
        this.load.image('cauldron', 'src/assets/img/cauldron.png');
        this.load.image('coal-hot', 'src/assets/img/coal-hot.png');
        this.load.image('bubble-particle', 'src/assets/img/bubble-particle.png');

        this.load.audio('menu-music', [
            'src/assets/music/menu-music.mp3'
        ]);
    }

    create (data) {
        this.page = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 + 24, 'main-menu-bg');

        this.cauldron = this.physics.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT - 151, 'cauldron');
        this.cauldron.setImmovable(true);
        this.cauldron.body.allowGravity = false;
        this.cauldron.setDepth(99);

        this.menuMusic = this.sound.add('menu-music');
        this.menuMusic.play ({
            volume: 0.5,
            loop: true
        });

        this.msg = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 + 24, 'main-menu-msg');

        this.tweens.add({
            targets: this.msg,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 1000,
            ease: 'EaseInOut',
            yoyo: true,
            repeat: -1
        });

        this.coal = this.add.sprite(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT - 88, 'coal-hot');

        this.particles = this.add.particles('bubble-particle');

        this.bubblesEmitter = this.particles.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 1, end: 1 },
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 20,
            accelerationY: -50,
            accelerationY: -50,
            angle: { min: -150, max: -20 },
            // rotate: { min: -180, max: 180 },
            lifespan: { min: 1800, max: 1800 },
            blendMode: 'ADD',
            frequency: 5,
            // maxParticles: 10,
            x: Constants.VIEWPORT.WIDTH / 2,
            y: Constants.VIEWPORT.HEIGHT - 150
        });

        this.input.on('pointerdown', () => {
            this.menuMusic.stop ();
            this.scene.start('game');
        })
    }

}