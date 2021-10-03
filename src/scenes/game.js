import Constants from '../constants.js';
import ScrollableView from '../gameobjects/scrollableView.js';
// import OrderScene from '../scenes/order.js';

export default class Game extends Phaser.Scene {
    constructor () {
        super('game');
    }

    preload () {
        this.load.image('board', 'src/assets/img/board.png');
        this.load.image('cauldron', 'src/assets/img/cauldron.png');
        this.load.image('tab-selected', 'src/assets/img/tab-selected.png');
        this.load.image('tab-unselected', 'src/assets/img/tab-unselected.png');
        this.load.image('tab-panel', 'src/assets/img/tab-panel.png');
        this.load.image('button', 'src/assets/img/button.png');
        this.load.image('full-button', 'src/assets/img/full-button.png');
        this.load.image('big-button', 'src/assets/img/big-button.png');
        this.load.image('stick', 'src/assets/img/stick.png');
        this.load.image('coal', 'src/assets/img/coal.png');
        this.load.image('coal-hot', 'src/assets/img/coal-hot.png');
        this.load.image('bubble-particle', 'src/assets/img/bubble-particle.png');
        this.load.image('smoke-particle', 'src/assets/img/smoke-particle.png');
        this.load.image('mini-game-box', 'src/assets/img/mini-game-box.png');
        this.load.image('mini-game-player', 'src/assets/img/mini-game-player.png');
        this.load.image('mini-game-bottle', 'src/assets/img/mini-game-bottle.png');
        this.load.image('mini-game-bomb', 'src/assets/img/mini-game-bomb.png');
        this.load.image('progress-bar', 'src/assets/img/progress-bar.png');
        this.load.image('page', 'src/assets/img/page.png');
        this.load.image('tutorial-overlay', 'src/assets/img/tutorial-overlay.png');
        
        this.load.atlas('ingredients', 'src/assets/img/ingredients.png', Constants.Ingredients);
        this.load.spritesheet({
            key: 'blow',
            url: 'src/assets/img/blower.png',
            frameConfig: { frameWidth: 184, frameHeight: 84, endFrame: 2 }
        });
        this.load.script('webfont', 'webfont.js');

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });   

        this.load.audio('game-music', [
            'src/assets/music/game-music.mp3'
        ]);

        this.load.audio('click', [
            'src/assets/music/click.wav'
        ]);

        this.load.audio('sell', [
            'src/assets/music/sell.wav'
        ]);

        this.load.audio('pickup', [
            'src/assets/music/pickup.wav'
        ]);

        this.load.audio('explode', [
            'src/assets/music/explode.wav'
        ]);

        this.load.audio('item-plop', [
            'src/assets/music/item-plop.wav'
        ]);

        this.load.audio('success', [
            'src/assets/music/success.wav'
        ]);
    }

    create () {
        this.isDraggingItem = false;
        this.draggingItem = null;
        this.currentRecipe = [];
        this.availableItems = Constants.Items.slice(0, 4);
        this.orders = [
            {
                orderNo: 17,
                title: 'Lightning potion',
                message: ['Greetings mortal! Zeus here!', '', 'Even gods need a potion or', 'two.', '', 'Give me your best lightning', 'potion'],
                itemId: 21
            },
            {
                orderNo: 16,
                title: 'Potion of poison',
                message: ['Greetingssssss!!', '', 'My fangssss are depleted.', '', 'Give me your most powerful', 'potion of poison!'],
                itemId: 20
            },
            {
                orderNo: 15,
                title: 'Srength potion',
                message: ['Good day!', '', 'I got greedy and took too', 'much loot from the dungeon.', '', 'I need a strength potion to', 'carry this to the village.'],
                itemId: 19
            },
            {
                orderNo: 14,
                title: 'Freezing potion',
                message: ['Greetings from the north!', '', 'I need something more', 'powerful for that fire golem!', '', 'Give me a freezing potion!'],
                itemId: 18
            },
            {
                orderNo: 13,
                title: 'Fire potion',
                message: ['Greetings Alchemist!', '', 'All my cattle are destroyed', 'by those damn demon rats!', '', 'I\'ll burn em down!', 'Give me a fire potion.'],
                itemId: 17
            },
            {
                orderNo: 12,
                title: 'Health potion',
                message: ['Greetings Alchemist!', '', 'Got a busy day of', 'dungeoneering ahead of me!', '', 'Can you sell me a health', 'potion!'],
                itemId: 16
            },
            {
                orderNo: 11,
                title: 'Poisonous tonic',
                message: ['Hi there!', '', 'Those damn flesh eating slugs', 'are eating all the mandrakes.', '', 'Do ya have some poisonous', 'tonic.'],
                itemId: 15
            },
            {
                orderNo: 10,
                title: 'Thawing spirit',
                message: ['Greetings alchemist!', '', 'My pet phoenix is frozen.', '', 'Give me some thawing spirit.'],
                itemId: 14
            },
            {
                orderNo: 9,
                title: 'Stinging juice',
                message: ['Hi!', '', 'I need some stinging juice', 'for my giant scorpion', '', 'How much?'],
                itemId: 13
            },
            {
                orderNo: 8,
                title: 'Electric essence',
                message: ['Hello!', '', 'My electric mouse ;) needs', 'some electric essence to be', 'saved. Joy is not available!'],
                itemId: 12
            },
            {
                orderNo: 7,
                title: 'Burning oil',
                message: ['Listen vermin!', '', 'An idiot from the north keeps', 'intruding into my dungeon.', '', 'Need some burning oil to', 'replinish.'],
                itemId: 11
            },
            {
                orderNo: 6,
                title: 'Dusty water',
                message: ['Assalam u alaikum!', '', 'I need a sandstorm to get the', 'intruders out of my town', '', 'Please give me some', 'dusty water'],
                itemId: 10
            },
            {
                orderNo: 5,
                title: 'Frosty water',
                message: ['Greetings from the north!', '', 'That fire golem in the dungeon', 'burnt me too many times!!', '', 'Give me some frosty water.'],
                itemId: 9
            },
            {
                orderNo: 4,
                title: 'Gritty paste',
                message: ['Ahoy matey!', '', 'Mi ship\'s leakin like', 'an old cauldron.', '', 'Can ya spare mi some', 'gritty paste?'],
                itemId: 8
            },
            {
                orderNo: 3,
                title: 'Some energy tonic',
                message: ['Good morning alchemist!', '', 'All my stamina is depleted', 'from dungeon crawling.', '', 'Can i buy some energy tonic', 'from you?'],
                itemId: 7
            },
            {
                orderNo: 2,
                title: 'Do you have ember paste?',
                message: ['Good morning alchemist!', '', 'My dragon is not breathing', 'fire anymore.', '', 'I need some ember paste', 'to feed him.'],
                itemId: 6
            },
            {
                orderNo: 1,
                title: 'Need some acidic water',
                message: ['My child has made his clothes', 'really dirty,', '', 'I need some acidic water to', 'clean it.'],
                itemId: 5
            },
        ];

        WebFont.load({
            custom: {
                families: [ 'Pixellari' ]
            },
            active: () => {
                this.board = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 + 24, 'board');
                this.cauldron = this.physics.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT - 151, 'cauldron');
                this.cauldron.setImmovable(true);
                this.cauldron.body.allowGravity = false;
                this.cauldron.setDepth(99);
                this.cauldronCollider = this.add.rectangle(640, 580, 120, 32, 0xffffff);
                this.physics.add.existing(this.cauldronCollider, false);
                this.cauldronCollider.body.setImmovable(true);
                this.cauldronCollider.alpha = 0;
                this.cauldronCollider.body.allowGravity = false;

                this.gameMusic = this.sound.add('game-music');
                this.clickSound = this.sound.add('click');
                this.sellSound = this.sound.add('sell');
                this.explodeSound = this.sound.add('explode');
                this.successSound = this.sound.add('success');
                this.itemPlopSound = this.sound.add('item-plop');
                this.pickupSound = this.sound.add('pickup');
                
                this.gameMusic.play ({
                    volume: 0.8,
                    loop: true
                });

                this.stick = this.add.sprite(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT - 200, 'stick').setInteractive();
            
                this.anims.create({
                    key: 'blowAnimation',
                    frames: this.anims.generateFrameNumbers('blow', { start: 0, end: 2, first: 0 }),
                    frameRate: 6,
                    yoyo: true,
                    repeat: 0
                });

                this.anims.create({
                    key: 'idleAnimation',
                    frames: this.anims.generateFrameNumbers('blow', { start: 0, end: 0, first: 0 }),
                    frameRate: 6,
                    repeat: -1
                });
            
                this.blower = this.add.sprite(Constants.VIEWPORT.WIDTH / 2 - 180, Constants.VIEWPORT.HEIGHT - 121, 'blow')
                this.blower.play('idleAnimation');

                this.input.setDraggable(this.stick);

                this.input.on('drag', (pointer, gameObject, dragX) => {
                    gameObject.x = dragX < 600 ? 600 : (dragX > 680 ? 680 : dragX);
                    if (this.miniGameInProgress) {
                        this.miniGamePlayer.x = gameObject.x;
                    }
                });

                this.coal = this.add.sprite(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT - 88, 'coal');

                this.particles = this.add.particles('bubble-particle');
                this.smoke = this.add.particles('smoke-particle');

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
                    frequency: 200,
                    // maxParticles: 10,
                    x: Constants.VIEWPORT.WIDTH / 2,
                    y: Constants.VIEWPORT.HEIGHT - 150
                });

                this.panel = this.add.image(Constants.VIEWPORT.WIDTH - 176, Constants.VIEWPORT.HEIGHT - 262, 'tab-panel');

                this.tab1 = this.createTabButton (Constants.VIEWPORT.WIDTH - 252, 212, 'Ingredients', () => {
                    this.clickSound.play();
                    this.tab1.bg.setTexture('tab-selected');
                    this.tab2.bg.setTexture('tab-unselected');
                    this.iScrollable.show();
                    this.pScrollable.hide();
                }, true);
                this.tab2 = this.createTabButton (Constants.VIEWPORT.WIDTH - 252 + 124, 212, 'Potions', () => {
                    this.clickSound.play();
                    this.tab1.bg.setTexture('tab-unselected');
                    this.tab2.bg.setTexture('tab-selected');
                    this.iScrollable.hide();
                    this.pScrollable.show();
                });     

                this.boardBounds = new Phaser.Geom.Rectangle(330, 24, 620, 616);

                this.recipeLabel = this.add.text(40, 40, 'Recipe:', {fontSize: 20, fontFamily: 'Pixellari', color: '#000'})
                this.ordersLabel = this.add.text(40, 180, 'Orders:', {fontSize: 20, fontFamily: 'Pixellari', color: '#000'})
                this.recipiesGroup = this.add.group();

                this.brewButton = this.createButton(Constants.VIEWPORT.WIDTH / 2 - 200, Constants.VIEWPORT.HEIGHT - 200, 'Brew', () => {
                    this.clickSound.play();
                    this.brew();
                });

                this.brewButton.container.alpha = 0.2;

                // this.add.graphics()
                //     .lineStyle(5, 0x00ffff, 0.5)
                //     .strokeRectShape(this.boardBounds)
                //     .strokeRectShape(this.boardBounds);

                this.iScrollable = new ScrollableView(this, {
                    x: Constants.VIEWPORT.WIDTH - 176, 
                    y: Constants.VIEWPORT.HEIGHT - 262,
                    width: 272,
                    height: 460,
                    items: Constants.Items.slice(0, 4),
                    onCellDown: (index, pointer) => {
                        const item = this.iScrollable.items [index];
                        if (this.successScreen || this.failureScreen) return;

                        this.clickSound.play();

                        const body = this.physics.add.sprite(pointer.x, pointer.y, 'ingredients', item.id);
                        body.body.moves = false;
                        body.setBounce(0.2, 0.2);
                        body.setCollideWorldBounds(true);
                        body.body.setBoundsRectangle(this.boardBounds);
                        body.setDepth(0);

                        body.setInteractive();

                        body.on('pointerdown', () => {
                            if (!this.isDraggingItem) {
                                body.body.moves = false;
                                this.draggingItem = body;
                                this.isDraggingItem = true;
                            }
                        });
        

                        this.physics.add.overlap(this.cauldronCollider, body, (collider, bodyItem) => {
                            bodyItem.destroy();
                            this.itemPlopSound.play();
                            this.addToRecipe(item);
                            console.log (item.id + ' added', this.currentRecipe)
                        }, null, this);

                        this.physics.add.collider(this.cauldronCollider, body);

                        this.draggingItem = body;
                        this.isDraggingItem = true;
                    }
                });

                this.pScrollable = new ScrollableView(this, {
                    x: Constants.VIEWPORT.WIDTH - 176, 
                    y: Constants.VIEWPORT.HEIGHT - 262,
                    width: 272,
                    height: 460,
                    items: [],
                    onCellDown: (index, pointer) => {
                        const item = this.pScrollable.items [index];
                    }
                });

                this.pScrollable.hide();

                this.input.on('pointermove', (pointer) => {
                    if (this.isDraggingItem) {
                        this.draggingItem.setPosition(pointer.x, pointer.y);
                    }
                }, this);

                this.input.on('pointerup', () => {
                    if (this.isDraggingItem) {
                        this.draggingItem.body.moves = true;
                        this.isDraggingItem = false;
                        this.draggingItem = null;
                    }
                }, this);

                // this.startMiniGame();
                // this.showBrewSuccess({name: 'Healing potion', id: 0});
                // this.showBrewFailure();
                this.btn = this.createButton(Constants.VIEWPORT.WIDTH - 100, 60, 'Show tutorial', () => {
                    this.clickSound.play();
                    if (!this.isShowingTutorial) {
                        this.showTutorial();
                    }
                });
                this.showTutorial ();
                this.createOrder ();
            }
        });

    }

    update () {
        if (this.currentRecipe.length > 1) {
            this.brewButton.container.alpha = 1;
        }

        if (this.successScreen || this.failureScreen) {
            this.brewButton.container.alpha = 0.2;
        }
    }

    createTabButton (x, y, text, onPointerDown, selected) {
        var bg = this.add.sprite(0, 0, selected ? 'tab-selected' : 'tab-unselected');
        var text = this.add.text(0, 0, text, {align: 'center', color: '#000', fontSize: 14, fontFamily: 'Pixellari'});
        text.setOrigin(0.5);
        var container = this.add.container(x, y, [bg, text]);

        container.setInteractive(new Phaser.Geom.Rectangle(-60, -20, 120, 40), Phaser.Geom.Rectangle.Contains);

        container.on('pointerdown', () => {
            onPointerDown();
        });

        return  {
            container,
            bg,
            text
        };
    }

    createButton (x, y, text, onPointerDown, buttonTexture) {
        var bg = this.add.sprite(0, 0, buttonTexture || 'button');
        var text = this.add.text(0, 0, text, {align: 'center', color: '#000', fontSize: 14, fontFamily: 'Pixellari'});
        text.setOrigin(0.5);
        var container = this.add.container(x, y, [bg, text]);

        container.setInteractive(new Phaser.Geom.Rectangle(-48, -20, 96, 40), Phaser.Geom.Rectangle.Contains);

        container.on('pointerover', () => {
            if (container.alpha === 1) {
                container.setScale(1.1);
            }
        });

        container.on('pointerout', () => {
            container.setScale(1);
        });

        container.on('pointerdown', () => {
            if (container.alpha === 1) {
                container.setScale(1);
                onPointerDown();
            }
        });

        container.on('pointerup', () => {
            container.setScale(1.1);
        });

        return  {
            container,
            bg,
            text
        };
    }

    createBigButton (x, y, title, text, onPointerDown) {
        var bg = this.add.sprite(0, 0, 'big-button');
        var title = this.add.text(-100, -16, title, {align: 'left', color: '#000', fontSize: 12, fontFamily: 'Pixellari'});
        var message = this.add.text(-100, 4, text, {align: 'left', color: '#000', fontSize: 16, fontFamily: 'Pixellari'});
        
        var container = this.add.container(x, y, [bg, title, message]);

        container.setInteractive(new Phaser.Geom.Rectangle(-124, -32, 248,64), Phaser.Geom.Rectangle.Contains);

        container.on('pointerover', () => {
            if (container.alpha === 1) {
                container.setScale(1.1);
            }
        });

        container.on('pointerout', () => {
            container.setScale(1);
        });

        container.on('pointerdown', () => {
            if (container.alpha === 1) {
                container.setScale(1);
                onPointerDown();
            }
        });

        container.on('pointerup', () => {
            container.setScale(1.1);
        });

        return  {
            container,
            bg,
            title,
            message
        };
    }

    addToRecipe (item) {
        this.currentRecipe.push (item);
        this.recipiesGroup.add(this.add.sprite(0, 0, 'ingredients', item.id));

        Phaser.Actions.GridAlign(this.recipiesGroup.getChildren(), {
            width: 3,
            height: 3,
            cellWidth: 76,
            cellHeight: 76,
            x: 80,
            y: 120
        });
    }

    clearRecipe() {
        this.currentRecipe = [];
        for(let item of _.clone(this.recipiesGroup.getChildren())) {
            item.destroy();
        }
    }

    checkIfRecipe() {
        const ids = this.currentRecipe.map(item => item.id);

        for(const item of Constants.Recipes) {
            if (ids.length === item.recipe.length && _.difference(item.recipe, ids).length === 0) {
                return item;
            }
        }

        return false;
    }

    brew() {
        if (this.brewing) return;
        this.brewing = true;
        this.blower.playAfterRepeat('blowAnimation');
        this.bubblesEmitter.frequency = 5
        setTimeout(() => {
            this.coal.setTexture('coal-hot');
            if(!!this.checkIfRecipe()) {
                this.startMiniGame();
            } else {
                this.cameras.main.shake(500, 0.005);
                this.showBrewFailure();
                this.smokeEmitter = this.smoke.createEmitter({
                    alpha: { start: 0.5, end: 0 },
                    scale: { start: 1, end: 2 },
                    tint: { start: 0xff945e, end: 0xff945e },
                    speed: 20,
                    accelerationY: -50,
                    accelerationY: -50,
                    angle: { min: -150, max: -20 },
                    rotate: { min: -180, max: 180 },
                    lifespan: { min: 3000, max: 3200 },
                    // blendMode: 'SOFT',
                    frequency: 10,
                    // maxParticles: 10,
                    x: Constants.VIEWPORT.WIDTH / 2,
                    y: Constants.VIEWPORT.HEIGHT - 150
                });
            }
        }, 1000);
    }

    startMiniGame () {
        this.miniGameInProgress = true;
        this.progress = 0;
        this.maxProgress = 100;
        this.miniGameBoard = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 - 50, 'mini-game-box');
        this.miniGamePlayer = this.physics.add.sprite(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 + 34, 'mini-game-player');
        this.miniGamePlayer.body.allowGravity = false;
        const boardStartY = Constants.VIEWPORT.HEIGHT / 2 - 120
        this.miniGameProgress = this.add.image(Constants.VIEWPORT.WIDTH / 2, 120, 'progress-bar');

        this.miniGameCollider = this.add.rectangle(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 + 44, 128, 4, 0xffffff);
        this.physics.add.existing(this.miniGameCollider, false);
        this.miniGameCollider.body.setImmovable(true);
        this.miniGameCollider.alpha = 0;
        this.miniGameCollider.body.allowGravity = false;

        clearInterval(this.miniGameInterval);
        this.miniGameGroup = this.add.group();
        this.setProgress();
        
        this.miniGameInterval = setInterval(() => {
            const randomX = Math.floor(Math.random() * 80) - 40
            const bottle = this.physics.add.sprite(Constants.VIEWPORT.WIDTH / 2 + randomX, boardStartY, 'mini-game-bottle');
            bottle.body.allowGravity = false;
            const recipe = this.checkIfRecipe()
            bottle.setVelocity(0, ((recipe.itemId * 8 * 2) + 60));
            // bottle.setVelocity(0, ((21 * 8 * 2) + 60));
            bottle.setCollideWorldBounds(true);

            this.miniGameGroup.add(bottle);
            // bottle.body.setBoundsRectangle(new Phaser.Geom.Rectangle(Constants.VIEWPORT.WIDTH / 2 - 64, Constants.VIEWPORT.HEIGHT / 2 - 150, 128, 192));

            this.physics.add.overlap(this.miniGameCollider, bottle, (collider, bodyItem) => {
                bodyItem.destroy();
                clearInterval(this.miniGameInterval);
                this.endMiniGame();
                this.cameras.main.shake(500, 0.005);
                this.showBrewFailure();
                this.smokeEmitter = this.smoke.createEmitter({
                    alpha: { start: 0.5, end: 0 },
                    scale: { start: 1, end: 2 },
                    tint: { start: 0xff945e, end: 0xff945e },
                    speed: 20,
                    accelerationY: -50,
                    accelerationY: -50,
                    angle: { min: -150, max: -20 },
                    rotate: { min: -180, max: 180 },
                    lifespan: { min: 3000, max: 3200 },
                    // blendMode: 'SOFT',
                    frequency: 10,
                    // maxParticles: 10,
                    x: Constants.VIEWPORT.WIDTH / 2,
                    y: Constants.VIEWPORT.HEIGHT - 150
                });
            }, null, this);

            this.physics.add.overlap(this.miniGamePlayer, bottle, (collider, bodyItem) => {
                bodyItem.destroy();
                this.progress += 10;
                this.pickupSound.play();
                if (this.progress >= 100) {
                    this.progress = 100;
                    this.setProgress();
                    clearInterval(this.miniGameInterval);
                    this.endMiniGame();
                    this.smokeEmitter = this.smoke.createEmitter({
                        alpha: { start: 1, end: 0.5 },
                        scale: { start: 1, end: 2 },
                        // tint: { start: 0xff945e, end: 0xff945e },
                        speed: 20,
                        accelerationY: -50,
                        accelerationY: -50,
                        angle: { min: -150, max: -20 },
                        rotate: { min: -180, max: 180 },
                        lifespan: { min: 3000, max: 3200 },
                        blendMode: 'ADD',
                        frequency: 10,
                        // maxParticles: 10,
                        x: Constants.VIEWPORT.WIDTH / 2,
                        y: Constants.VIEWPORT.HEIGHT - 150
                    });
                    const brewedItem = _.find(Constants.Items, item => item.id === this.checkIfRecipe().itemId);
                    if (!this.itemAvailable(brewedItem.id)) {
                        this.availableItems.push (brewedItem);
                        if (brewedItem.type === Constants.ItemType.INGREDIENT) {
                            this.iScrollable.addItem(brewedItem);
                        } else {
                            this.pScrollable.addItem(brewedItem);
                        }
                    }
                    this.showBrewSuccess(brewedItem);
                }

                this.setProgress();
                
            }, null, this);

            // this.add.graphics()
            //     .lineStyle(5, 0x00ffff, 0.5)
            //     .strokeRectShape(bottle.body.customBoundsRectangle);
        }, 1000);
    }

    setProgress () {
        const totalPixels = 64 * 4 - 8;
        const percent = this.progress / 100;
        const progressWidth = percent * totalPixels;

        const rect = new Phaser.Geom.Rectangle(Constants.VIEWPORT.WIDTH / 2 - 124, 120 - 8, progressWidth, 16) 
        if (this.progressInner) {
            this.progressInner.destroy ();
        }

        this.progressInner = this.add.graphics()
            .fillStyle(0xea323c)
            .fillRectShape(rect);
    }

    endMiniGame () {
        this.miniGameInProgress = false;
        this.progress = 0;
        this.miniGameBoard.destroy();
        this.miniGamePlayer.destroy();
        this.miniGameCollider.destroy();
        this.miniGameProgress.destroy();
        if (this.progressInner)
            this.progressInner.destroy();

        for(let item of this.miniGameGroup.getChildren()) {
            item.destroy();
        }
        

        clearInterval(this.miniGameInterval);
    }

    showBrewSuccess(item) {
        this.successSound.play();
        this.successScreen = true;
        this.title = this.add.text(Constants.VIEWPORT.WIDTH / 2, 80, 'Success!', {align: 'center', color: '#000', fontSize: 40, fontFamily: 'Pixellari'});
        this.title.setOrigin(0.5);

        this.msg = this.add.text(Constants.VIEWPORT.WIDTH / 2, 120, `Brewed a ${item.name}`, {align: 'center', color: '#000', fontSize: 20, fontFamily: 'Pixellari'});
        this.msg.setOrigin(0.5);

        this.potiionImg = this.add.sprite(Constants.VIEWPORT.WIDTH / 2, 180, 'ingredients', '' + item.id);

        this.btn = this.createButton(Constants.VIEWPORT.WIDTH / 2, 240, 'Brew another', () => {
            this.clickSound.play();
            this.title.destroy();
            this.msg.destroy();
            this.btn.container.destroy();
            this.potiionImg.destroy();
            this.successScreen = false;
            this.smokeEmitter.stop ();
            this.coal.setTexture('coal');
            this.clearRecipe();
            this.bubblesEmitter.frequency = 200
            this.brewing = false;
        });
    }

    showBrewFailure() {
        this.explodeSound.play();
        this.failureScreen = true;
        this.title = this.add.text(Constants.VIEWPORT.WIDTH / 2, 80, 'Failure!', {align: 'center', color: '#000', fontSize: 40, fontFamily: 'Pixellari'});
        this.title.setOrigin(0.5);

        this.msg = this.add.text(Constants.VIEWPORT.WIDTH / 2, 120, `Unstable concoction`, {align: 'center', color: '#000', fontSize: 20, fontFamily: 'Pixellari'});
        this.msg.setOrigin(0.5);

        this.btn = this.createButton(Constants.VIEWPORT.WIDTH / 2, 200, 'Try again', () => {
            this.clickSound.play();
            this.title.destroy();
            this.msg.destroy();
            this.btn.container.destroy();
            this.failureScreen = false;
            this.smokeEmitter.stop ();
            this.coal.setTexture('coal');
            this.clearRecipe();
            this.bubblesEmitter.frequency = 200
            this.brewing = false;
        });
    }

    createOrder () {
        this.currentOrder = this.orders.pop ();

        if (!this.currentOrder) {
            this.showEnd();
        }
        
        this.currentOrderButton = this.createBigButton(168, 250, `Order #${this.currentOrder.orderNo}`, this.currentOrder.title, () => {
            this.clickSound.play();
            this.showOrder();
        })
    }

    itemAvailable (id) {
        return !!_.find(this.availableItems, { id });
    }

    showOrder() {
        if (this.showingOrder) return;
        this.showingOrder = true;
        this.orderBg = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 - 160, 'page');

        this.orderNum = this.add.text(490, 100, `Order #${this.currentOrder.orderNo}`, {fontSize: 20, fontFamily: 'Pixellari', color: '#000'})
        this.orderMessage = this.add.text(490, 140, this.currentOrder.message, {fontSize: 24, fontFamily: 'Pixellari', color: '#000'})

        this.cancelBtn = this.createButton(Constants.VIEWPORT.WIDTH / 2 - 80, Constants.VIEWPORT.HEIGHT / 2, 'Cancel', () => {
            this.clickSound.play();
            this.orderBg.destroy();
            this.orderNum.destroy();
            this.orderMessage.destroy();
            this.cancelBtn.container.destroy();
            if (this.sellBtn) {
                this.sellBtn.container.destroy();
            }
            this.showingOrder = false;
        });

        if (this.itemAvailable(this.currentOrder.itemId)) {
            this.sellBtn = this.createButton(Constants.VIEWPORT.WIDTH / 2 + 80, Constants.VIEWPORT.HEIGHT / 2, 'Sell', () => {
                this.sellSound.play();
                this.orderBg.destroy();
                this.orderNum.destroy();
                this.orderMessage.destroy();
                this.cancelBtn.container.destroy();
                if (this.sellBtn) {
                    this.sellBtn.container.destroy();
                }
                this.currentOrderButton.container.destroy();
                this.createOrder();
                this.showingOrder = false;
            }, 'full-button');
        }
    }

    showTutorial () {
        this.isShowingTutorial = true;
        const overlay = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2, 'tutorial-overlay');

        const text1 = this.add.text(690, 240, ['Drag and drop the ingredients', 'into the cauldron'], {align: 'center', fontFamily: 'Pixellari'})
        const text2 = this.add.text(370, 370, ['Click brew button to', 'start brewing'], {align: 'center', fontFamily: 'Pixellari'})
        const text3 = this.add.text(720, 500, ['Once brewing starts,', 'drag and move the stick', 'and collect 10 potions to finish'], {align: 'center', fontFamily: 'Pixellari'})
        const text4 = this.add.text(42, 400, ['Orders come here. Each order will', 'ask for an item to be brewed'], {align: 'center', fontFamily: 'Pixellari'})
        const text5 = this.add.text(400, 86, ['Items in the current recipe', 'is displayed here.'], {align: 'left', fontFamily: 'Pixellari'})

        const closeBtn = this.createButton(Constants.VIEWPORT.WIDTH - 180, Constants.VIEWPORT.HEIGHT - 80, 'Close tutorial', () => {
            this.isShowingTutorial = false;
            this.clickSound.play();
            overlay.destroy();
            text1.destroy();
            text2.destroy();
            text3.destroy();
            text4.destroy();
            text5.destroy();
            closeBtn.container.destroy();
        }, 'full-button');
    }

    showEnd() {
        this.endBg = this.add.image(Constants.VIEWPORT.WIDTH / 2, Constants.VIEWPORT.HEIGHT / 2 - 160, 'page');

        this.endTitle = this.add.text(550, 90, 'Congratulations!!', {fontSize: 24, fontFamily: 'Pixellari', color: '#000'})
        this.endMessage = this.add.text(480, 140, ['You have found all the recipes', 'in the game.', '', 'Thanks for playing.', '', '-------- Ameen Ahmed'], {fontSize: 24, fontFamily: 'Pixellari', color: '#000'})

        this.endBtn = this.createButton(Constants.VIEWPORT.WIDTH / 2 + 80, Constants.VIEWPORT.HEIGHT / 2, 'Refresh', () => {
            window.location.reload();
        }, 'full-button');
    }
}