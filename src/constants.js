

const frames = [];

for(let i=0; i<21; i++) {
    frames.push({
        filename: '' + (i + 1),
        frame: {
            x: i * 64,
            y: Math.floor(i / 16) * 64,
            w: 64,
            h: 64
        },
        spriteSourceSize: {
            x: 0,
            y: 0,
            w: 64,
            h: 64
        },
        sourceSize: {
            w: 64,
            h: 64
        },
        pivot: {
            x: 0.5,
            y: 0.5
        }
    });
}

const ItemType =  {
    INGREDIENT: 'INGREDIENT',
    POTION: 'POTION'
};

export default {
    VIEWPORT: {
        WIDTH: 1280,
        HEIGHT: 720
    },
    
    Ingredients: {
        frames
    },

    ItemType,

    Items: [
        {
            id: 1,
            name: 'Fire lily',
            type: ItemType.INGREDIENT
        },
        {
            id: 2,
            name: 'Aqua bloom',
            type: ItemType.INGREDIENT
        },
        {
            id: 3,
            name: 'Terra root',
            type: ItemType.INGREDIENT
        },
        {
            id: 4,
            name: 'Ether leaves',
            type: ItemType.INGREDIENT
        },
        {
            id: 5,
            name: 'Acidic water',
            type: ItemType.INGREDIENT
        },
        {
            id: 6,
            name: 'Ember paste',
            type: ItemType.INGREDIENT
        },
        {
            id: 7,
            name: 'Energy tonic',
            type: ItemType.INGREDIENT
        },
        {
            id: 8,
            name: 'Gritty paste',
            type: ItemType.INGREDIENT
        },
        {
            id: 9,
            name: 'Frosty water',
            type: ItemType.INGREDIENT
        },
        {
            id: 10,
            name: 'Dusty water',
            type: ItemType.INGREDIENT
        },
        {
            id: 11,
            name: 'Burning oil',
            type: ItemType.INGREDIENT
        },
        {
            id: 12,
            name: 'Electric essence',
            type: ItemType.INGREDIENT
        },
        {
            id: 13,
            name: 'Stinging juice',
            type: ItemType.INGREDIENT
        },
        {
            id: 14,
            name: 'Thawing spirit',
            type: ItemType.INGREDIENT
        },
        {
            id: 15,
            name: 'Posinous tonic',
            type: ItemType.INGREDIENT
        },
        {
            id: 16,
            name: 'Health potion',
            type: ItemType.POTION
        },
        {
            id: 17,
            name: 'Fire potion',
            type: ItemType.POTION
        },
        {
            id: 18,
            name: 'Freezing potion',
            type: ItemType.POTION
        },
        {
            id: 19,
            name: 'Strength potion',
            type: ItemType.POTION
        },
        {
            id: 20,
            name: 'Potion of poison',
            type: ItemType.POTION
        },
        {
            id: 21,
            name: 'Lightning potion',
            type: ItemType.POTION
        },
    ],

    Recipes: [
        {
            recipe: [1, 2],
            itemId: 5
        },
        {
            recipe: [1, 3],
            itemId: 6
        },
        {
            recipe: [1, 4],
            itemId: 7
        },
        {
            recipe: [2, 3],
            itemId: 8
        },
        {
            recipe: [2, 4],
            itemId: 9
        },
        {
            recipe: [3, 4],
            itemId: 10
        },
        {
            recipe: [1, 5],
            itemId: 11
        },
        {
            recipe: [1, 7],
            itemId: 12
        },
        {
            recipe: [1, 9],
            itemId: 13
        },
        {
            recipe: [2, 11],
            itemId: 14
        },
        {
            recipe: [4, 5],
            itemId: 15
        },
        {
            recipe: [2, 7],
            itemId: 16
        },
        {
            recipe: [6, 11],
            itemId: 17
        },
        {
            recipe: [4, 9],
            itemId: 18
        },
        {
            recipe: [3, 8],
            itemId: 19
        },
        {
            recipe: [5, 15],
            itemId: 20
        },
        {
            recipe: [7, 12],
            itemId: 21
        },
    ]
}