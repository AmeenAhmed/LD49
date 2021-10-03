import Constants from '../constants.js';

export default class ScrollableView {
    constructor (scene, {x, y, width, height, onCellDown, items}) {

        this.items = items;

        const COLOR_PRIMARY = 0x4e342e;
        const COLOR_LIGHT = 0x7b5e57;
        const COLOR_DARK = 0x260e04;

        this.x = x;
        this.y = y;

        this.gridTable = scene.rexUI.add.gridTable({
            x,
            y,
            width,
            height,

            scrollMode: 0,

            // background: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                // cellWidth: (scrollMode === 0) ? undefined : 60,
                cellHeight: 100,

                columns: 2,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: scene.rexUI.add.roundRectangle(0, 0, 10, 5, 5, COLOR_DARK),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 8, COLOR_LIGHT),
            },
          
            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },
            
            space: {
                left: 5,
                right: 5,
                top: 25,
                bottom: 25,

                table: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                // if (cellContainer === null) {
                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: 1,
                        // background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                        icon: scene.add.sprite(width / 2, height / 2, 'ingredients', item.id),
                        text: scene.add.text(0, 0, item.name, {fontSize: 14, fontFamily: 'Pixellari', color: '#000'}),

                        space: {
                            icon: 10,
                            left: 15,
                            top: 0,
                        }
                    });
                //     console.log(cell.index + ': create new cell-container');
                // } else {
                //     console.log(cell.index + ': reuse cell-container');
                // }

                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                // cellContainer.getElement('text').setText(item.id); // Set text of text object
                // cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                // cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                return cellContainer;
            },
            items: this.items
        }).layout();

        this.gridTable
            .on('cell.down', function (cellContainer, cellIndex, pointer) {
                onCellDown(cellIndex, pointer)
                console.log ('pointer-down ' + cellIndex + ': ' + cellContainer.text + '\n');
            }, this)
            .on('cell.over', function (cellContainer, cellIndex, pointer) {
                cellContainer.getElement('icon').setScale(1.2)
            }, this)
            .on('cell.out', function (cellContainer, cellIndex, pointer) {
                cellContainer.getElement('icon').setScale(1)
            }, this)
    }

    addItem(index) {
        this.items.push (index);
        this.gridTable
            .setItems(this.items)
            .scrollToBottom()
    }

    hide() {
        this.gridTable.setPosition(3000, 3000)
        this.gridTable.layout();
        // this.gridTable.hide();
    }

    show() {
        this.gridTable.setPosition(this.x, this.y)
        this.gridTable.layout();
        // this.gridTable.show();
    }
}