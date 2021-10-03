import GameScene from './scenes/game.js';
import MainMenu from './scenes/main-menu.js';

document.addEventListener('DOMContentLoaded', () => {
    var config = {
        type: Phaser.WEBGL,
        width: 1280,
        height: 720,
        backgroundColor: '#000000',
        parent: 'phaser',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 1200 },
                debug: false
            }
        },
        scene: [MainMenu, GameScene]
    };
    
    setTimeout(() => {
        var game = new Phaser.Game(config);
        setTimeout(() => {
            document.querySelector('canvas').focus();
        });
    }, 1000);
});